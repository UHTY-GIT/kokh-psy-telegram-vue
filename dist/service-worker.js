if(!self.define){let l,i={};const n=(n,t)=>(n=new URL(n+".js",t).href,i[n]||new Promise((i=>{if("document"in self){const l=document.createElement("script");l.src=n,l.onload=i,document.head.appendChild(l)}else l=n,importScripts(n),i()})).then((()=>{let l=i[n];if(!l)throw new Error(`Module ${n} didn’t register its module`);return l})));self.define=(t,e)=>{const s=l||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let o={};const u=l=>n(l,s),r={module:{uri:s},exports:o,require:u};i[s]=Promise.all(t.map((l=>r[l]||u(l)))).then((l=>(e(...l),o)))}}define(["./workbox-6567b62a"],(function(l){"use strict";l.setCacheNameDetails({prefix:"kokh-assistant-vue-telegram"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/css/10.1155c89c.css",revision:null},{url:"/css/app.72ef3dfe.css",revision:null},{url:"/fonts/Anton-Regular.41006b42.ttf",revision:null},{url:"/fonts/Nunito-Black.1b122f59.ttf",revision:null},{url:"/fonts/Nunito-BlackItalic.1b6d8463.ttf",revision:null},{url:"/fonts/Nunito-Bold.1bf75fbc.ttf",revision:null},{url:"/fonts/Nunito-BoldItalic.92c7aea4.ttf",revision:null},{url:"/fonts/Nunito-ExtraBold.52758667.ttf",revision:null},{url:"/fonts/Nunito-ExtraBoldItalic.38b3685b.ttf",revision:null},{url:"/fonts/Nunito-ExtraLight.6d567e9b.ttf",revision:null},{url:"/fonts/Nunito-ExtraLightItalic.2faf19da.ttf",revision:null},{url:"/fonts/Nunito-Italic.0a5fab18.ttf",revision:null},{url:"/fonts/Nunito-Light.6309b972.ttf",revision:null},{url:"/fonts/Nunito-LightItalic.2cb7f29d.ttf",revision:null},{url:"/fonts/Nunito-Medium.bed7d7c4.ttf",revision:null},{url:"/fonts/Nunito-MediumItalic.5be9c6fd.ttf",revision:null},{url:"/fonts/Nunito-Regular.53a5ca69.ttf",revision:null},{url:"/fonts/Nunito-SemiBold.6c5467fd.ttf",revision:null},{url:"/fonts/Nunito-SemiBoldItalic.b1ea370d.ttf",revision:null},{url:"/img/about.620f582c.png",revision:null},{url:"/img/ai-technology.778726e3.png",revision:null},{url:"/img/document-session.7a501dd2.png",revision:null},{url:"/img/emoji.iamrohit.d35327a0.png",revision:null},{url:"/img/favorite.6684db68.png",revision:null},{url:"/img/heart-couple.195b819d.png",revision:null},{url:"/img/hyperlink.ef000c77.png",revision:null},{url:"/img/lotus.d3e04935.png",revision:null},{url:"/img/love-message.478dfbd7.png",revision:null},{url:"/index.html",revision:"4c060df655886fa09c3a7bd9217c0be5"},{url:"/js/10.63dd58ee.js",revision:null},{url:"/js/221.506c2d3a.js",revision:null},{url:"/js/567.16b7e49a.js",revision:null},{url:"/js/568.df305534.js",revision:null},{url:"/js/673.b5ec8670.js",revision:null},{url:"/js/741.7570dbb1.js",revision:null},{url:"/js/837.9c3b3350.js",revision:null},{url:"/js/993.062739fe.js",revision:null},{url:"/js/app.fbd4bfec.js",revision:null},{url:"/js/chunk-vendors.01adf905.js",revision:null},{url:"/manifest.json",revision:"7375e329508b2d3090b5606aae13e42d"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
