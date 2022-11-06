(()=>{"use strict";var e={100:()=>{try{self["workbox:core:6.5.0"]&&_()}catch(e){}},437:()=>{try{self["workbox:precaching:6.5.0"]&&_()}catch(e){}},155:()=>{try{self["workbox:routing:6.5.0"]&&_()}catch(e){}},773:()=>{try{self["workbox:strategies:6.5.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(100);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache),r=e=>e||a(t.runtime);function i(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class c{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const o=new Set;function h(e){return"string"==typeof e?new Request(e):e}s(773);class l{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new c,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=h(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=h(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=h(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:l,matchOptions:u}=this._strategy,d=await self.caches.open(l),f=this.hasCallback("cacheDidUpdate"),p=f?await async function(e,t,s,a){const n=i(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),c=await e.keys(t,r);for(const t of c)if(n===i(t.url,s))return e.match(t,a)}(d,n.clone(),["__WB_REVISION__"],u):null;try{await d.put(n,f?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of o)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:l,oldResponse:p,newResponse:c.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=h(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class u{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new l(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class d extends u{async _handle(t,s){let a,n=await s.cacheMatch(t);if(n);else try{n=await s.fetchAndCachePut(t)}catch(e){e instanceof Error&&(a=e)}if(!n)throw new e("no-response",{url:t.url,error:a});return n}}const f={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class p extends u{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(f),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){const a=[],n=[];let r;if(this._networkTimeoutSeconds){const{id:e,promise:i}=this._getTimeoutPromise({request:t,logs:a,handler:s});r=e,n.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:t,logs:a,handler:s});n.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await i)());if(!c)throw new e("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let a;return{promise:new Promise((t=>{a=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:a}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:a}){let n,r;try{r=await a.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}return e&&clearTimeout(e),!n&&r||(r=await a.cacheMatch(t)),r}}s(155);const g=e=>e&&"object"==typeof e?e:{handle:e};class w{constructor(e,t,s="GET"){this.handler=g(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=g(e)}}class y extends w{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class m{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,g(e))}setCatchHandler(e){this._catchHandler=g(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let _;function R(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new w((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new y(t,s,a);else if("function"==typeof t)n=new w(t,s,a);else{if(!(t instanceof w))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}return(_||(_=new m,_.addFetchListener(),_.addCacheListener()),_).registerRoute(n),n}function v(e,t){const s=t();return e.waitUntil(s),s}function C(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(437);class b{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let U,L;class k extends u{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(k.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:r||e})),e&&i&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==k.copyRedirectedCacheableResponsesPlugin&&(a===k.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(k.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}k.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},k.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===U){const e=new Response("");if("body"in e)try{new Response(e.body),U=!0}catch(e){U=!1}U=!1}return U}()?n.body:await n.blob();return new Response(c,i)}(t):t};class T{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new k({cacheName:n(e),plugins:[...t,new q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=C(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return v(e,(async()=>{const t=new b;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return v(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const x=()=>(L||(L=new T),L);class K extends w{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}const P={get googleAnalytics(){return e||a(t.googleAnalytics);var e},get precache(){return n()},get prefix(){return t.prefix},get runtime(){return r()},get suffix(){return t.suffix}};var N,E;E={prefix:"phi",precache:"precache",runtime:"runtime",suffix:"v1"},(e=>{for(const s of Object.keys(t))e(s)})((e=>{"string"==typeof E[e]&&(t[e]=E[e])})),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),console.log(P),R(/\.(html)$/,new p),R(/\.(css|js)$/,new d),R(/\.(css|js|mp3|wav|ogg|png|jpg|svg|webp)$/,new d({cacheName:"static-cache"})),R(/^https?:\/\/api\.(.*)/,new p),R(/alicdn\.com/,new d({cacheName:"alicdn-cache"})),N=[{'revision':'52b918c910ec7e44eee57745482ce66a','url':'404.css'},{'revision':'845749023befcd3ec8c2c413ea51ba2d','url':'404.html'},{'revision':'1d68d105b4355dac90dc28cf9f0fc674','url':'AppIcon.png'},{'revision':'311fe76362696d70d5bf716aa2711031','url':'CNAME'},{'revision':'21dcc5f10db31c049ee30cf87c966923','url':'COMMITHASH'},{'revision':'11bfd401fd51f068f63250c52d38ae01','url':'LASTCOMMITDATETIME'},{'revision':'db026c8f34286c0390d867acb267afcb','url':'LevelOver/index.html'},{'revision':'20230144f545e28b1fc42dd2f75e14ad','url':'VERSION'},{'revision':'a6f4d00062c524e0d92e6d11c13d4e59','url':'aboutUs/index.html'},{'revision':null,'url':'assets/0.8bd6.png'},{'revision':null,'url':'assets/A15A.4a3b.svg'},{'revision':null,'url':'assets/AboutUs.46b4.mp3'},{'revision':null,'url':'assets/AppIcon.a11b.svg'},{'revision':null,'url':'assets/Avatar.6991.svg'},{'revision':null,'url':'assets/B15B.75b2.svg'},{'revision':null,'url':'assets/Back.0ec4.svg'},{'revision':null,'url':'assets/Back.db5b.svg'},{'revision':null,'url':'assets/C15C.574f.svg'},{'revision':null,'url':'assets/ChapterSelect0.edd0.mp3'},{'revision':null,'url':'assets/Drag.0b13.ogg'},{'revision':null,'url':'assets/Drag.4f65.png'},{'revision':null,'url':'assets/Drag.7fcd.png'},{'revision':null,'url':'assets/Drag2HL.d8ba.png'},{'revision':null,'url':'assets/DragHL.1606.png'},{'revision':null,'url':'assets/ElementSqare.Half.Size.f7ec.webp'},{'revision':null,'url':'assets/Exit.16df.mp3'},{'revision':null,'url':'assets/Exo-Regular.d901.otf'},{'revision':null,'url':'assets/F15F.8053.svg'},{'revision':null,'url':'assets/Flick.50eb.png'},{'revision':null,'url':'assets/Flick.9b90.ogg'},{'revision':null,'url':'assets/Flick.ce10.png'},{'revision':null,'url':'assets/Flick2HL.6ace.png'},{'revision':null,'url':'assets/FlickHL.cc19.png'},{'revision':null,'url':'assets/Hold.3d8e.png'},{'revision':null,'url':'assets/HoldBody.5641.png'},{'revision':null,'url':'assets/HoldEnd.64a0.png'},{'revision':null,'url':'assets/HoldEnd.8f11.png'},{'revision':null,'url':'assets/HoldHL.9caa.png'},{'revision':null,'url':'assets/HoldHead.ae5b.png'},{'revision':null,'url':'assets/HoldHeadHL.83c6.png'},{'revision':null,'url':'assets/JudgeLine.aa03.png'},{'revision':null,'url':'assets/LevelOver0.78f9.ogg'},{'revision':null,'url':'assets/LevelOver1.83d3.ogg'},{'revision':null,'url':'assets/LevelOver2.d36e.ogg'},{'revision':null,'url':'assets/LevelOver3.ad57.ogg'},{'revision':null,'url':'assets/Pause.bb32.png'},{'revision':null,'url':'assets/Pause.bfd6.mp3'},{'revision':null,'url':'assets/ProgressBar.11e3.png'},{'revision':null,'url':'assets/Restart.cec3.svg'},{'revision':null,'url':'assets/Resume.7b58.svg'},{'revision':null,'url':'assets/S15S.d0cb.svg'},{'revision':null,'url':'assets/Settings.1620.svg'},{'revision':null,'url':'assets/SongNameBar.679a.png'},{'revision':null,'url':'assets/Sort.f00c.svg'},{'revision':null,'url':'assets/Start.8240.mp3'},{'revision':null,'url':'assets/Tap.4a30.ogg'},{'revision':null,'url':'assets/Tap.50dc.png'},{'revision':null,'url':'assets/Tap.9ce9.png'},{'revision':null,'url':'assets/Tap2.be94.png'},{'revision':null,'url':'assets/Tap2.d605.png'},{'revision':null,'url':'assets/Tap2HL.90ec.png'},{'revision':null,'url':'assets/TapHL.907d.png'},{'revision':null,'url':'assets/TapToStart.bfd5.mp3'},{'revision':null,'url':'assets/Tick.389b.svg'},{'revision':null,'url':'assets/Title.2a2b.svg'},{'revision':null,'url':'assets/TrashBin.948b.svg'},{'revision':null,'url':'assets/V15FC.6454.svg'},{'revision':null,'url':'assets/V15V.5992.svg'},{'revision':null,'url':'assets/calibrate.9f6c.mp3'},{'revision':null,'url':'assets/clickRaw.4435.png'},{'revision':null,'url':'assets/clickRaw.c48a.png'},{'revision':null,'url':'assets/createImageBitmap.7a50.js'},{'revision':null,'url':'assets/manifest.c456.webmanifest'},{'revision':null,'url':'assets/mute.e3f1.ogg'},{'revision':null,'url':'assets/phi15phi.36be.svg'},{'revision':null,'url':'assets/selectSongItem.7cc8.mp3'},{'revision':null,'url':'assets/showgirl_Half.b325.png'},{'revision':'8b762d1610ae03838354377837abdc11','url':'cacheControl/index.html'},{'revision':'d976616f33de393d16c4794fde5f07f0','url':'chapterSelect/index.html'},{'revision':null,'url':'css/LevelOver.49bb531be587bd622cdc.css'},{'revision':null,'url':'css/aboutUs.920929f9ea786846da9a.css'},{'revision':null,'url':'css/cacheControl.16cd1bc76443aed75008.css'},{'revision':null,'url':'css/calibrate.5609ff8feea2d41c152c.css'},{'revision':null,'url':'css/chapterSelect.3dcb7a34026e740d9e35.css'},{'revision':null,'url':'css/getChart.c79345b49147166735ff.css'},{'revision':null,'url':'css/index.78fda68949916e0cfbd9.css'},{'revision':null,'url':'css/loadingChartScreen.b0fdcf1e9b24858973af.css'},{'revision':null,'url':'css/loadingScreen.805a8f6d89d72cd1eaa3.css'},{'revision':null,'url':'css/settings.b270953c4243530fe9f3.css'},{'revision':null,'url':'css/songSelect.8c6432d738c48ad15a2c.css'},{'revision':null,'url':'css/statistic.f4c20735cc8e6ed7db77.css'},{'revision':null,'url':'css/tapToStart.8926fc560e53e7487aef.css'},{'revision':null,'url':'css/whilePlaying.1f59465ed3368bbaafb3.css'},{'revision':'656ef8176b28232ecbedf2fd721eced6','url':'favicon.ico'},{'revision':'890d6b8306413db80077d1b1b80d2ba1','url':'getChart/index.html'},{'revision':'69cdc11dc204a8de3b1fd7c90ed78fb4','url':'index.html'},{'revision':null,'url':'js/LevelOver.1d8b3a1d4129ea8ecbd0.js'},{'revision':null,'url':'js/aboutUs.89437ae4b8f55e4e8bb2.js'},{'revision':null,'url':'js/cacheControl.2f3cb3d2c366e2cb1f40.js'},{'revision':null,'url':'js/calibrate.f6ef330df3105bc4873e.js'},{'revision':null,'url':'js/chapterSelect.a048b943b3cb7dc96272.js'},{'revision':null,'url':'js/getChart.39b786a3b0a0e2ee1331.js'},{'revision':null,'url':'js/index.321a4e71998e59abdfe4.js'},{'revision':null,'url':'js/loadingChartScreen.5650ebb90b89a515cddd.js'},{'revision':null,'url':'js/loadingScreen.438fa766bd78bc1858e8.js'},{'revision':null,'url':'js/settings.f7b7715980a8ec6a1481.js'},{'revision':null,'url':'js/songSelect.ce650755b2c3487b7749.js'},{'revision':null,'url':'js/statistic.ee25aa8eeb9fd533b36f.js'},{'revision':null,'url':'js/tapToStart.0ab13a9c47c30028f585.js'},{'revision':null,'url':'js/whilePlaying.79d3680da7504d0e6870.js'},{'revision':'8a32649f130935dd49ec2261324c27ef','url':'loadingChartScreen/index.html'},{'revision':'dd3a6d87a8979e37862dd4b84bf8897c','url':'loadingScreen/index.html'},{'revision':'922eb6e14a01f95f4bcd1af343dc838c','url':'manifest.webmanifest'},{'revision':'efccd97a1a6caf0f0edccb65a7fa5d3d','url':'settings/calibrate/index.html'},{'revision':'6de861e1895f7aaa32d8bb334e55a47e','url':'settings/index.html'},{'revision':'d5987495bffa2dfdacbadd972ef46c8b','url':'settings/statistic/index.html'},{'revision':'8d5e01d801157aff3df56ffaf0b6a126','url':'songSelect/index.html'},{'revision':'bba1dd28b669a1724b83be7cb600b31f','url':'tapToStart/index.html'},{'revision':'f4302f88729f2e0f0132a4afa621a472','url':'whilePlaying/index.html'}],x().precache(N),function(e){const t=x();R(new K(t,undefined))}()})()})();