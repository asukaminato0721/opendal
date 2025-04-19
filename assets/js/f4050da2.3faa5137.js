"use strict";(self.webpackChunkopendal_website=self.webpackChunkopendal_website||[]).push([[3469],{103:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>f,frontMatter:()=>d,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"apps/oay","title":"Oay","description":"","source":"@site/docs/40-apps/oay.mdx","sourceDirName":"40-apps","slug":"/apps/oay","permalink":"/apps/oay","draft":false,"unlisted":false,"editUrl":"https://github.com/apache/opendal/tree/main/website/docs/40-apps/oay.mdx","tags":[],"version":"current","lastUpdatedBy":"Xuanwo","lastUpdatedAt":1741601725000,"frontMatter":{"title":"Oay"},"sidebar":"docs","previous":{"title":"Applications","permalink":"/category/applications"},"next":{"title":"Ofs","permalink":"/apps/ofs"}}');var r=n(6070),a=n(5658),o=n(8699);function i(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",p:"p",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"apache-opendal-oay",children:"Apache OpenDAL\u2122 Oay"})}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"oay"})," is an OpenDAL Gateway that empowers users to access data through their preferred APIs."]}),"\n",(0,r.jsx)(t.h2,{id:"goal",children:"Goal"}),"\n",(0,r.jsx)(t.p,{children:"Allow users to access different storage backend through their preferred APIs."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{src:"/img/external/f268c2d40c7f09706f7fbefc880c9299.png",alt:""})}),"\n",(0,r.jsx)(t.h2,{id:"status",children:"Status"}),"\n",(0,r.jsx)(t.p,{children:"Our first milestone is to provide S3 APIs."}),"\n",(0,r.jsx)(t.h3,{id:"s3-api",children:"S3 API"}),"\n",(0,r.jsxs)(t.p,{children:["Only ",(0,r.jsx)(t.code,{children:"list_object_v2"})," with ",(0,r.jsx)(t.code,{children:"start_after"})," is supported."]}),"\n",(0,r.jsx)(t.h2,{id:"branding",children:"Branding"}),"\n",(0,r.jsxs)(t.p,{children:["The first and most prominent mentions must use the full form: ",(0,r.jsx)(t.strong,{children:"Apache OpenDAL\u2122"})," of the name for any individual usage (webpage, handout, slides, etc.) Depending on the context and writing style, you should use the full form of the name sufficiently often to ensure that readers clearly understand the association of both the OpenDAL project and the OpenDAL software product to the ASF as the parent organization."]}),"\n",(0,r.jsxs)(t.p,{children:["For more details, see the ",(0,r.jsx)(t.a,{href:"https://www.apache.org/foundation/marks/guide",children:"Apache Product Name Usage Guide"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"license-and-trademarks",children:"License and Trademarks"}),"\n",(0,r.jsxs)(t.p,{children:["Licensed under the Apache License, Version 2.0: ",(0,r.jsx)(t.a,{href:"http://www.apache.org/licenses/LICENSE-2.0",children:"http://www.apache.org/licenses/LICENSE-2.0"})]}),"\n",(0,r.jsx)(t.p,{children:"Apache OpenDAL, OpenDAL, and Apache are either registered trademarks or trademarks of the Apache Software Foundation."})]})}function c(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}const d={title:"Oay"},p=void 0,l={},h=[{value:"Goal",id:"goal",level:2},{value:"Status",id:"status",level:2},{value:"S3 API",id:"s3-api",level:3},{value:"Branding",id:"branding",level:2},{value:"License and Trademarks",id:"license-and-trademarks",level:2}];function u(e){return(0,r.jsx)(o.A,{basePath:"bin/oay/",children:(0,r.jsx)(c,{components:{h1:"h2"}})})}function f(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u()}},8699:(e,t,n)=>{n.d(t,{A:()=>a});var s=n(758),r=n(6070);function a(e){let{children:t,owner:n="apache",repo:a="opendal",branch:o="main",basePath:i="",components:c={}}=e;const d=e=>{const t=e.replace(/^\.\//,"");return`https://github.com/${n}/${a}/blob/${o}/${i}${t}`},p={...c,a:e=>{const{href:t,...n}=e;return t&&t.startsWith("./")?(0,r.jsx)("a",{...n,href:d(t)}):(0,r.jsx)("a",{...e})},p:e=>{const{children:t}=e;if("string"==typeof t){const e=/\[(.*?)\]:\s*(\.\/[^\s]+)/g;if(e.test(t)){const n=t.replace(e,((e,t,n)=>`[${t}]: ${d(n)}`));return(0,r.jsx)("p",{children:n})}}return(0,r.jsx)("p",{...e})}};return"string"==typeof t?(e=>{if("string"!=typeof e)return e;let t=e.replace(/\[(.*?)\]\((\.\/[^)]+)\)/g,((e,t,n)=>`[${t}](${d(n)})`));return t=t.replace(/\[(.*?)\]:\s*(\.\/[^\s]+)/g,((e,t,n)=>`[${t}]: ${d(n)}`)),t})(t):s.isValidElement(t)?s.cloneElement(t,{components:{...t.props.components||{},...p}}):t}},5658:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>i});var s=n(758);const r={},a=s.createContext(r);function o(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);