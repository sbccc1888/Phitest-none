(()=>{"use strict";var e,t={6247:(e,t,n)=>{e.exports=n.p+"assets/ChapterSelect0.edd0.mp3"}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e+"../"})(),e=o(6247),window.addEventListener("DOMContentLoaded",(()=>{const t=new AbortController,n=new(window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext);fetch(e,t.signal).then((e=>e.arrayBuffer())).then((e=>{n.decodeAudioData(e,(function(e){var t=n.createBufferSource();t.buffer=e,t.loop=!0,t.connect(n.destination),t.start(0)}))})),fetch("https://api.github.com/repos/HanHan233/PhiCommunity/commits?per_page=1").then((e=>e.json())).then((e=>{document.querySelector("div#recentUpdContent").innerText=e[0].commit.message})),document.querySelector("div#startToPlayBtn").addEventListener("click",(()=>{null==n?t.abort():n.close(),location.href="../songSelect/index.html"})),document.querySelector("div#getChart").addEventListener("click",(()=>{null==n?t.abort():n.close(),location.href="../getChart/index.html"})),document.querySelector("div#cacheControl").addEventListener("click",(()=>{null==n?t.abort():n.close(),location.href="../cacheControl/index.html"})),document.querySelector("div#settingBtn").addEventListener("click",(()=>{null==n?t.abort():n.close(),location.href="../settings/index.html"})),document.querySelector("div#uploadChartsBtn").addEventListener("click",(()=>{null==n?t.abort():n.close(),location.href="https://github.com/sbccc1888/phitest-charts-repo"}));const o=document.getElementById("body");window.DeviceOrientationEvent&&(console.log("DeviceOrientationEvent detected, attaching event listener."),window.addEventListener("deviceorientation",(e=>{const{gamma:t,beta:n}=e;o.style.setProperty("--gamma",t),o.style.setProperty("--beta",n)}),!0))}))})();
