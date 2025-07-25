// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

use crate::Result;
use chrono::{DateTime, Utc};
use jni::objects::JObject;
use jni::objects::JString;
use jni::objects::{JByteArray, JMap};
use jni::sys::jlong;
use jni::JNIEnv;
use opendal::{Error, ErrorKind};
use std::collections::HashMap;
use std::ops::Bound;

pub(crate) fn usize_to_jlong(n: Option<usize>) -> jlong {
    // usize is always >= 0, so we can use -1 to identify the empty value.
    n.map_or(-1, |v| v as jlong)
}

pub(crate) fn jmap_to_hashmap(
    env: &mut JNIEnv,
    params: &JObject,
) -> Result<HashMap<String, String>> {
    let map = JMap::from_env(env, params)?;
    let mut iter = map.iter(env)?;

    let mut result: HashMap<String, String> = HashMap::new();
    while let Some(e) = iter.next(env)? {
        let k = JString::from(e.0);
        let v = JString::from(e.1);
        result.insert(env.get_string(&k)?.into(), env.get_string(&v)?.into());
    }

    Ok(result)
}

pub(crate) fn hashmap_to_jmap<'a>(
    env: &mut JNIEnv<'a>,
    map: &HashMap<String, String>,
) -> Result<JObject<'a>> {
    let map_object = env.new_object("java/util/HashMap", "()V", &[])?;
    let jmap = env.get_map(&map_object)?;
    for (k, v) in map {
        let key = env.new_string(k)?;
        let value = env.new_string(v)?;
        jmap.put(env, &key, &value)?;
    }
    Ok(map_object)
}

pub(crate) fn string_to_jstring<'a>(env: &mut JNIEnv<'a>, s: Option<&str>) -> Result<JObject<'a>> {
    s.map_or_else(
        || Ok(JObject::null()),
        |v| Ok(env.new_string(v.to_string())?.into()),
    )
}

pub(crate) fn read_bool_field(env: &mut JNIEnv<'_>, obj: &JObject, field: &str) -> Result<bool> {
    Ok(env.get_field(obj, field, "Z")?.z()?)
}

pub(crate) fn read_int64_field(env: &mut JNIEnv<'_>, obj: &JObject, field: &str) -> Result<i64> {
    Ok(env.get_field(obj, field, "J")?.j()?)
}

pub(crate) fn read_int_field(env: &mut JNIEnv<'_>, obj: &JObject, field: &str) -> Result<i32> {
    Ok(env.get_field(obj, field, "I")?.i()?)
}

pub(crate) fn read_string_field(
    env: &mut JNIEnv<'_>,
    obj: &JObject,
    field: &str,
) -> Result<Option<String>> {
    let result = env.get_field(obj, field, "Ljava/lang/String;")?.l()?;
    if result.is_null() {
        Ok(None)
    } else {
        Ok(Some(jstring_to_string(env, &JString::from(result))?))
    }
}

pub(crate) fn read_map_field(
    env: &mut JNIEnv<'_>,
    obj: &JObject,
    field: &str,
) -> Result<Option<HashMap<String, String>>> {
    let result = env.get_field(obj, field, "Ljava/util/Map;")?.l()?;
    if result.is_null() {
        Ok(None)
    } else {
        Ok(Some(jmap_to_hashmap(env, &result)?))
    }
}

pub(crate) fn read_jlong_field_to_usize(
    env: &mut JNIEnv,
    options: &JObject,
    field_name: &str,
) -> Result<Option<usize>> {
    match read_int64_field(env, options, field_name)? {
        -1 => Ok(None),
        v if v > 0 => Ok(Some(v as usize)),
        v => Err(Error::new(
            ErrorKind::Unexpected,
            format!("{field_name} must be positive, instead got: {v}"),
        )
        .into()),
    }
}

pub(crate) fn read_instant_field_to_date_time(
    env: &mut JNIEnv<'_>,
    obj: &JObject,
    field: &str,
) -> Result<Option<DateTime<Utc>>> {
    let result = env.get_field(obj, field, "Ljava/time/Instant;")?.l()?;
    if result.is_null() {
        return Ok(None);
    }

    let epoch_second = env
        .call_method(&result, "getEpochSecond", "()J", &[])?
        .j()?;
    let nano = env.call_method(&result, "getNano", "()I", &[])?.i()?;
    DateTime::from_timestamp(epoch_second, nano as u32)
        .map(Some)
        .ok_or_else(|| {
            Error::new(
                ErrorKind::Unexpected,
                format!("Invalid timestamp: seconds={epoch_second}, nanos={nano}"),
            )
            .into()
        })
}

pub(crate) fn offset_length_to_range(offset: i64, length: i64) -> Result<(Bound<u64>, Bound<u64>)> {
    let offset = u64::try_from(offset)
        .map_err(|_| Error::new(ErrorKind::RangeNotSatisfied, "offset must be non-negative"))?;

    match length {
        -1 => Ok((Bound::Included(offset), Bound::Unbounded)),
        _ => match u64::try_from(length) {
            Ok(length) => match offset.checked_add(length) {
                Some(end) => Ok((Bound::Included(offset), Bound::Excluded(end))),
                None => Err(Error::new(
                    ErrorKind::RangeNotSatisfied,
                    "offset + length causes overflow",
                )
                .into()),
            },
            Err(_) => {
                Err(Error::new(ErrorKind::RangeNotSatisfied, "length must be non-negative").into())
            }
        },
    }
}

pub(crate) fn bytes_to_jbytearray<'a>(
    env: &mut JNIEnv<'a>,
    bytes: impl AsRef<[u8]>,
) -> Result<JByteArray<'a>> {
    let bytes = bytes.as_ref();
    let res = env.byte_array_from_slice(bytes)?;
    Ok(res)
}

/// # Safety
///
/// The caller must guarantee that the Object passed in is an instance
/// of `java.lang.String`, passing in anything else will lead to undefined behavior.
pub(crate) fn jstring_to_string(env: &mut JNIEnv, s: &JString) -> Result<String> {
    let res = unsafe { env.get_string_unchecked(s)? };
    Ok(res.into())
}
