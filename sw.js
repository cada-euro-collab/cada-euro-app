/* Interfaz offline de Cada Euro v1.1. Los datos se mantienen en localStorage. */
const VERSION='cada-euro-v1.1.0';
const STATIC=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(STATIC)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('cada-euro-')&&k!==VERSION).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const path=new URL(e.request.url).pathname;if(path.endsWith('/app.js')||path.endsWith('/styles.css')||path.endsWith('/index.html')||path.endsWith('/')){e.respondWith(fetch(e.request).then(r=>{if(r.ok){let copy=r.clone();caches.open(VERSION).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));return}e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(cached=>cached||fetch(e.request)))});
