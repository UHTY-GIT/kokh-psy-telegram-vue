if(!self.define){let l,i={};const n=(n,e)=>(n=new URL(n+".js",e).href,i[n]||new Promise((i=>{if("document"in self){const l=document.createElement("script");l.src=n,l.onload=i,document.head.appendChild(l)}else l=n,importScripts(n),i()})).then((()=>{let l=i[n];if(!l)throw new Error(`Module ${n} didn’t register its module`);return l})));self.define=(e,t)=>{const s=l||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let r={};const u=l=>n(l,s),o={module:{uri:s},exports:r,require:u};i[s]=Promise.all(e.map((l=>o[l]||u(l)))).then((l=>(t(...l),r)))}}define(["./workbox-6567b62a"],(function(l){"use strict";l.setCacheNameDetails({prefix:"kokh-assistant-vue-telegram"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/css/467.1155c89c.css",revision:null},{url:"/css/app.879bae8d.css",revision:null},{url:"/fonts/Anton-Regular.41006b42.ttf",revision:null},{url:"/fonts/Nunito-Black.1b122f59.ttf",revision:null},{url:"/fonts/Nunito-BlackItalic.1b6d8463.ttf",revision:null},{url:"/fonts/Nunito-Bold.1bf75fbc.ttf",revision:null},{url:"/fonts/Nunito-BoldItalic.92c7aea4.ttf",revision:null},{url:"/fonts/Nunito-ExtraBold.52758667.ttf",revision:null},{url:"/fonts/Nunito-ExtraBoldItalic.38b3685b.ttf",revision:null},{url:"/fonts/Nunito-ExtraLight.6d567e9b.ttf",revision:null},{url:"/fonts/Nunito-ExtraLightItalic.2faf19da.ttf",revision:null},{url:"/fonts/Nunito-Italic.0a5fab18.ttf",revision:null},{url:"/fonts/Nunito-Light.6309b972.ttf",revision:null},{url:"/fonts/Nunito-LightItalic.2cb7f29d.ttf",revision:null},{url:"/fonts/Nunito-Medium.bed7d7c4.ttf",revision:null},{url:"/fonts/Nunito-MediumItalic.5be9c6fd.ttf",revision:null},{url:"/fonts/Nunito-Regular.53a5ca69.ttf",revision:null},{url:"/fonts/Nunito-SemiBold.6c5467fd.ttf",revision:null},{url:"/fonts/Nunito-SemiBoldItalic.b1ea370d.ttf",revision:null},{url:"/img/TG-interface-heart-1.10a55147.png",revision:null},{url:"/img/about.620f582c.png",revision:null},{url:"/img/ai-technology.778726e3.png",revision:null},{url:"/img/document-session.7a501dd2.png",revision:null},{url:"/img/emoji.iamrohit.d35327a0.png",revision:null},{url:"/img/favorite.6684db68.png",revision:null},{url:"/img/heart-couple.195b819d.png",revision:null},{url:"/img/heart.0d6c1440.png",revision:null},{url:"/img/hyperlink.ef000c77.png",revision:null},{url:"/img/lotus.d3e04935.png",revision:null},{url:"/img/love-message.478dfbd7.png",revision:null},{url:"/index.html",revision:"b96256d556456296ae295f14f1094d38"},{url:"/js/379.de16ef73.js",revision:null},{url:"/js/467.feacdf90.js",revision:null},{url:"/js/536.6a6da392.js",revision:null},{url:"/js/714.980d7998.js",revision:null},{url:"/js/73.13a4cb40.js",revision:null},{url:"/js/741.7570dbb1.js",revision:null},{url:"/js/834.f1ee750f.js",revision:null},{url:"/js/837.9c3b3350.js",revision:null},{url:"/js/926.e9129538.js",revision:null},{url:"/js/app.de2cd48b.js",revision:null},{url:"/js/chunk-vendors.01adf905.js",revision:null},{url:"/manifest.json",revision:"7375e329508b2d3090b5606aae13e42d"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
