# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

from uuid import uuid4
import pytest


@pytest.fixture(scope="function")
def test_scan_dir(operator):
    """Provides a temporary directory with nested files/dirs for scan tests."""
    base_dir = f"scan_dir_{str(uuid4())}/"
    files = []
    # Level 1
    for i in range(3):
        f = f"{base_dir}file_{i}_{str(uuid4())}"
        operator.write(f, b"test_content")
        files.append(f)
    # Level 2
    subdir1 = f"{base_dir}subdir1_{str(uuid4())}/"
    operator.create_dir(subdir1)
    # Note: scan usually doesn't return directory entries themselves, only files within.
    # We add it here for tracking the start_after logic correctly if needed, but it might not appear in results.
    # files.append(subdir1)
    for i in range(2):
        f = f"{subdir1}file_{i + 3}_{str(uuid4())}"
        operator.write(f, b"test_content")
        files.append(f)
    # Level 3 in subdir1
    subsubdir = f"{subdir1}subsubdir_{str(uuid4())}/"
    operator.create_dir(subsubdir)
    # files.append(subsubdir)
    f = f"{subsubdir}file_deep_{str(uuid4())}"
    operator.write(f, b"test_content")
    files.append(f)

    files.sort()  # Sort all created file paths

    yield base_dir, files

    # Cleanup
    operator.remove_all(base_dir)


@pytest.mark.need_capability(
    "list",
    "write",
    "create_dir",
    "delete",
    "list_with_start_after",
    "list_with_recursive",
)
def test_sync_scan_with_start_after(operator, test_scan_dir):
    """Tests synchronous scan starting after a specific file."""
    dir_name, files = test_scan_dir
    start_after_index = 2  # Choose an index within the files list
    start_after_path = files[start_after_index]

    entries = list(operator.scan(dir_name, start_after=start_after_path))
    # Exclude the base directory and the start_after path itself from results for comparison
    entry_paths = sorted(
        [e.path for e in entries if e.path != dir_name and e.path != start_after_path]
    )

    # Expected paths are files lexicographically after start_after_path
    expected_paths = sorted([f for f in files if f > start_after_path])

    assert entry_paths == expected_paths, (
        f"Expected {expected_paths}, but got {entry_paths}"
    )


@pytest.mark.need_capability(
    "list",
    "write",
    "create_dir",
    "delete",
    "list_with_start_after",
    "list_with_recursive",
)
def test_sync_scan_with_start_after_non_existent(operator, test_scan_dir):
    """Tests synchronous scan starting after a non-existent file."""
    dir_name, files = test_scan_dir
    start_after_path = f"{dir_name}non_existent_file_{str(uuid4())}"

    # Behavior might vary; assert it doesn't error and returns a list.
    try:
        entries = list(operator.scan(dir_name, start_after=start_after_path))
        assert isinstance(entries, list)  # Check it returns a list without erroring
    except Exception as e:
        pytest.fail(f"Scanning with non-existent start_after raised an exception: {e}")


@pytest.mark.need_capability(
    "list",
    "write",
    "create_dir",
    "delete",
    "list_with_start_after",
    "list_with_recursive",
)
def test_sync_scan_with_start_after_last(operator, test_scan_dir):
    """Tests synchronous scan starting after the last item."""
    dir_name, files = test_scan_dir
    start_after_path = files[-1]  # Start after the last item

    entries = list(operator.scan(dir_name, start_after=start_after_path))
    # Exclude the base directory from results
    entry_paths = [e.path for e in entries if e.path != dir_name]

    assert entry_paths == [], (
        f"Expected empty list when scanning after last item, but got {entry_paths}"
    )
