(()=>{"use strict";var e,t={4246:(e,t,r)=>{e.exports=r.p+"assets/TapToStart.bfd5.mp3"}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e+"../"})(),e=o(4246),window.addEventListener("DOMContentLoaded",(()=>{document.querySelector("#ver").innerText="1075f53";try{document.querySelector("#device").innerText="Platform: "+navigator.userAgentData.platform+" ; isMobile:"+navigator.userAgentData.mobile}catch(e){document.querySelector("#device").innerText="User-Agent : "+navigator.userAgent.slice(navigator.userAgent.lastIndexOf(" "))}document.querySelector("#device").title=navigator.userAgent;const t=new(window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext),r=new AbortController;fetch(e,r.signal).then((e=>e.arrayBuffer())).then((e=>{t.decodeAudioData(e,(function(e){var r=t.createBufferSource();r.buffer=e,r.loop=!0,r.connect(t.destination),r.start(0)}))})),document.body.addEventListener("click",(()=>{console.log("Clicked! Redirecting to MainPage");var e=document.createElement("div");e.classList.add("fadeIn"),document.body.appendChild(e),setTimeout((()=>{null==t?r.abort():t.close(),0==window.localStorage.length?location.href="../settings/index.html":location.href="../chapterSelect/index.html"}),510)}))})),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("../service-worker.js").then((e=>{console.log("SW registered: ",e)})).catch((e=>{console.log("SW registration failed: ",e)}))}))})();