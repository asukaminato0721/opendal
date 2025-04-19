"use strict";(self.webpackChunkopendal_website=self.webpackChunkopendal_website||[]).push([[8883],{5393:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>h,contentTitle:()=>c,default:()=>x,frontMatter:()=>o,metadata:()=>t,toc:()=>p});const t=JSON.parse('{"id":"bindings/c","title":"C \ud83d\udea7","description":"","source":"@site/docs/20-bindings/c.mdx","sourceDirName":"20-bindings","slug":"/bindings/c","permalink":"/bindings/c","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/opendal/tree/main/website/docs/20-bindings/c.mdx","tags":[],"version":"current","lastUpdatedBy":"Friends A.","lastUpdatedAt":1741941961000,"frontMatter":{"title":"C \ud83d\udea7"},"sidebar":"docs","previous":{"title":"Bindings","permalink":"/category/bindings"},"next":{"title":"Cpp \ud83d\udea7","permalink":"/bindings/cpp"}}');var r=s(6070),i=s(5658),l=s(8699);function a(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"apache-opendal-c-binding-wip",children:"Apache OpenDAL\u2122 C Binding (WIP)"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://opendal.apache.org/bindings/c/",children:(0,r.jsx)(n.img,{src:"/img/external/552ab0d9376d217ab2e8b0ade233afb8.svg",alt:""})})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{src:"https://github.com/apache/opendal/assets/5351546/87bbf6e5-f19e-449a-b368-3e283016c887",alt:""})}),"\n",(0,r.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,r.jsx)(n.p,{children:"A simple read and write example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-C",children:'#include "assert.h"\n#include "opendal.h"\n#include "stdio.h"\n\nint main()\n{\n    /* Initialize a operator for "memory" backend, with no options */\n    opendal_result_operator_new result = opendal_operator_new("memory", 0);\n    assert(result.operator_ptr != NULL);\n    assert(result.error == NULL);\n\n    /* Prepare some data to be written */\n    opendal_bytes data = {\n        .data = (uint8_t*)"this_string_length_is_24",\n        .len = 24,\n    };\n\n    /* Write this into path "/testpath" */\n    opendal_error *error = opendal_operator_write(op, "/testpath", &data);\n    assert(error == NULL);\n\n    /* We can read it out, make sure the data is the same */\n    opendal_result_read r = opendal_operator_read(op, "/testpath");\n    opendal_bytes read_bytes = r.data;\n    assert(r.error == NULL);\n    assert(read_bytes.len == 24);\n\n    /* Lets print it out */\n    for (int i = 0; i < 24; ++i) {\n        printf("%c", read_bytes.data[i]);\n    }\n    printf("\\n");\n\n    /* the opendal_bytes read is heap allocated, please free it */\n    opendal_bytes_free(&read_bytes);\n\n    /* the operator_ptr is also heap allocated */\n    opendal_operator_free(&op);\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["For more examples, please refer to ",(0,r.jsx)(n.code,{children:"./examples"})]}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsx)(n.p,{children:"To build OpenDAL C binding, the following is all you need:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["A compiler that supports ",(0,r.jsx)(n.strong,{children:"C11"})," and ",(0,r.jsx)(n.strong,{children:"C++14"}),", ",(0,r.jsx)(n.em,{children:"e.g."})," clang and gcc"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To format the code, you need to install ",(0,r.jsx)(n.strong,{children:"clang-format"})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"opendal.h"})," is not formatted by hands when you contribute, please do not format the file. ",(0,r.jsxs)(n.strong,{children:["Use ",(0,r.jsx)(n.code,{children:"make format"})," only."]})]}),"\n",(0,r.jsxs)(n.li,{children:["If your contribution is related to the files under ",(0,r.jsx)(n.code,{children:"./tests"}),", you may format it before submitting your pull request. But notice that different versions of ",(0,r.jsx)(n.code,{children:"clang-format"})," may format the files differently."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["(optional) ",(0,r.jsx)(n.strong,{children:"Doxygen"})," need to be installed to generate documentations."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"For Ubuntu and Debian:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"# install C/C++ toolchain\nsudo apt install -y build-essential\n\n# install clang-format\nsudo apt install clang-format\n\n# install and build GTest library under /usr/lib and softlink to /usr/local/lib\nsudo apt-get install libgtest-dev\n\n# install CMake\nsudo apt-get install cmake\n\n# install Rust\ncurl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\n"})}),"\n",(0,r.jsx)(n.h2,{id:"makefile",children:"Makefile"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To ",(0,r.jsx)(n.strong,{children:"build the library and header file"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"mkdir -p build && cd build\ncmake ..\nmake\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The header file ",(0,r.jsx)(n.code,{children:"opendal.h"})," is under ",(0,r.jsx)(n.code,{children:"./include"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The library is under ",(0,r.jsx)(n.code,{children:"../../target/debug"})," after building."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To ",(0,r.jsx)(n.strong,{children:"clean"})," the build results."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"cargo clean\ncd build && make clean\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To build and run the ",(0,r.jsx)(n.strong,{children:"tests"}),". (Note that you need to install Valgrind and GTest)"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"cd build\nmake tests && ./tests\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To build the ",(0,r.jsx)(n.strong,{children:"examples"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"cd build\nmake basic error_handle\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,r.jsxs)(n.p,{children:["The documentation index page source is under ",(0,r.jsx)(n.code,{children:"./docs/doxygen/html/index.html"}),".\nIf you want to build the documentations yourself, you could use"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"# this requires you to install doxygen\nmake doc\n"})}),"\n",(0,r.jsx)(n.h2,{id:"used-by",children:"Used by"}),"\n",(0,r.jsxs)(n.p,{children:["Check out the ",(0,r.jsx)(n.a,{href:"./users.md",children:"users"})," list for more details on who is using OpenDAL."]}),"\n",(0,r.jsx)(n.h2,{id:"license-and-trademarks",children:"License and Trademarks"}),"\n",(0,r.jsxs)(n.p,{children:["Licensed under the Apache License, Version 2.0: ",(0,r.jsx)(n.a,{href:"http://www.apache.org/licenses/LICENSE-2.0",children:"http://www.apache.org/licenses/LICENSE-2.0"})]}),"\n",(0,r.jsx)(n.p,{children:"Apache OpenDAL, OpenDAL, and Apache are either registered trademarks or trademarks of the Apache Software Foundation."})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}const o={title:"C \ud83d\udea7"},c=void 0,h={},p=[{value:"Example",id:"example",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Makefile",id:"makefile",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Used by",id:"used-by",level:2},{value:"License and Trademarks",id:"license-and-trademarks",level:2}];function u(e){return(0,r.jsx)(l.A,{basePath:"bindings/c/",children:(0,r.jsx)(d,{components:{h1:"h2"}})})}function x(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u()}},8699:(e,n,s)=>{s.d(n,{A:()=>i});var t=s(758),r=s(6070);function i(e){let{children:n,owner:s="apache",repo:i="opendal",branch:l="main",basePath:a="",components:d={}}=e;const o=e=>{const n=e.replace(/^\.\//,"");return`https://github.com/${s}/${i}/blob/${l}/${a}${n}`},c={...d,a:e=>{const{href:n,...s}=e;return n&&n.startsWith("./")?(0,r.jsx)("a",{...s,href:o(n)}):(0,r.jsx)("a",{...e})},p:e=>{const{children:n}=e;if("string"==typeof n){const e=/\[(.*?)\]:\s*(\.\/[^\s]+)/g;if(e.test(n)){const s=n.replace(e,((e,n,s)=>`[${n}]: ${o(s)}`));return(0,r.jsx)("p",{children:s})}}return(0,r.jsx)("p",{...e})}};return"string"==typeof n?(e=>{if("string"!=typeof e)return e;let n=e.replace(/\[(.*?)\]\((\.\/[^)]+)\)/g,((e,n,s)=>`[${n}](${o(s)})`));return n=n.replace(/\[(.*?)\]:\s*(\.\/[^\s]+)/g,((e,n,s)=>`[${n}]: ${o(s)}`)),n})(n):t.isValidElement(n)?t.cloneElement(n,{components:{...n.props.components||{},...c}}):n}},5658:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var t=s(758);const r={},i=t.createContext(r);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);