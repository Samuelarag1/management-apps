if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const o=e=>a(e,c),r={module:{uri:c},exports:n,require:o};s[c]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(t(...e),n)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"cf45dad01813b2a9339f8dbdf057c952"},{url:"/_next/static/chunks/181-787eb1c908725cd7.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/347-ae3cbf8174210bec.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/4bd1b696-7ebdc6fadb79800a.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/517-b29e75ab2cdc3a14.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/5e22fd23-0c6d06ee2b28c925.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/648-d6f3f8cb77d3669d.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/912-6690b0039fd7c807.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/94730671-0d24b083ffdacd2b.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/9c4e2130-8eaf24634e6e2444.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/_not-found/page-d570ebe2dd931068.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/api/login/route-f8ed50870810a9f6.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/api/logout/route-80574a506ff5de95.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/api/projects/route-9213a203d9995856.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/api/users/route-f1d9b36307654a51.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/dashboard/page-f1ac3aefe13aa6ee.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/layout-480f6e87e051a635.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/metrics/page-72218b9e757efe03.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/page-1ff1caf00c50f01e.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/app/projects/page-0331c1cc32bbcb34.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/eec3d76d-0816b64ba74ffe7d.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/framework-895c1583be5f925a.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/main-app-81dad17b8f3f2d4c.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/main-bb6ef8b51dc99019.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-c7d77275a02b513b.js",revision:"yHKo-K-fkiaos-oMzNUqV"},{url:"/_next/static/css/78393472778f960e.css",revision:"78393472778f960e"},{url:"/_next/static/css/89f4d6b1722ae5cc.css",revision:"89f4d6b1722ae5cc"},{url:"/_next/static/css/8dfa94cd7d8a2933.css",revision:"8dfa94cd7d8a2933"},{url:"/_next/static/css/a8fc0dbc91a29816.css",revision:"a8fc0dbc91a29816"},{url:"/_next/static/media/021bc4481ed92ece-s.woff2",revision:"0f5cb8880dd308345f58cecdc5fc5041"},{url:"/_next/static/media/0df4fb79790f0c1e-s.woff2",revision:"05dc9d14006763ad3669a335ab492cac"},{url:"/_next/static/media/266accaa65769876-s.p.woff2",revision:"a1072c814ca5edece0d56013d0d8859f"},{url:"/_next/static/media/3f69592b2fe603c7-s.woff2",revision:"84568c0a37620328592a78e9ad069d77"},{url:"/_next/static/media/4b28e4ca9443cf96-s.woff2",revision:"80e374ca2ae3a68c38e4c4a8b921c174"},{url:"/_next/static/media/4bcb60b63075eb7f-s.p.woff2",revision:"e5f3b3503012baf74bc76a54fa4da99f"},{url:"/_next/static/media/4f05ba3a6752a328-s.p.woff2",revision:"ea21cc6e4b393851204d1a3160ad6abc"},{url:"/_next/static/media/6325a8417175c41d-s.woff2",revision:"a3fd0c427e31c0cadb48607ee8c7876b"},{url:"/_next/static/media/99b7f73d5af7c3e2-s.woff2",revision:"e94b5e20c27aefc321077e0493d637fa"},{url:"/_next/static/media/c47a672499cc40a7-s.woff2",revision:"f690b39d6a983a567dc2a2b5e315e7ad"},{url:"/_next/static/media/d2d96f88ff7d2814-s.woff2",revision:"4007df4766c7c2fc66efd02c871e4f7d"},{url:"/_next/static/media/dd5dc49b6a6fba84-s.woff2",revision:"995ee16d76874bfa3b4449e0c5f69a59"},{url:"/_next/static/media/e899afd763727967-s.woff2",revision:"314c9b0ffbeffb81247e096c5ca0b2ba"},{url:"/_next/static/yHKo-K-fkiaos-oMzNUqV/_buildManifest.js",revision:"e841b7fb542dcea47c07b6163d3b06d0"},{url:"/_next/static/yHKo-K-fkiaos-oMzNUqV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"92e230868a6b99fb4be715eb5b9e5678"},{url:"/icon-512x512.png",revision:"954d69ea3e0a02387e94232aae52e44a"},{url:"/manifest.json",revision:"ab0e639f7b21a33c3e460f9de2c660cc"},{url:"/samaragtech.png",revision:"3a9b3708bfc90e4e17089abb822a1a21"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
