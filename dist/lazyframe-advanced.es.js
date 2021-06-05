const e=()=>{let e;const t={vendor:void 0,id:void 0,src:void 0,thumbnail:void 0,title:void 0,apikey:void 0,initialized:!1,parameters:void 0,debounce:250,lazyload:!0,initinview:!1,onLoad:e=>{},onAppend:e=>{},onThumbnailLoad:e=>{}},i={regex:{youtube_nocookie:/(?:youtube-nocookie\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=)))([a-zA-Z0-9_-]{6,11})/,youtube:/(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,vimeo:/vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/},condition:{youtube:e=>!(!e||11!=e[1].length)&&e[1],youtube_nocookie:e=>!(!e||11!=e[1].length)&&e[1],vimeo:e=>!!(e&&9===e[1].length||8===e[1].length)&&e[1]},src:{youtube:e=>`https://www.youtube.com/embed/${e.id}/?${e.parameters}`,youtube_nocookie:e=>`https://www.youtube-nocookie.com/embed/${e.id}/?${e.parameters}`,vimeo:e=>`https://player.vimeo.com/video/${e.id}/?${e.parameters}`},endpoints:{youtube:e=>`https://www.googleapis.com/youtube/v3/videos?id=${e.id}&key=${e.apikey}&fields=items(snippet(title,thumbnails))&part=snippet`,youtube_nocookie:e=>`https://www.googleapis.com/youtube/v3/videos?id=${e.id}&key=${e.apikey}&fields=items(snippet(title,thumbnails))&part=snippet`,vimeo:e=>`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${e.id}`},response:{youtube:{title:e=>e.items[0].snippet.title,thumbnail:e=>{let t=e.items[0].snippet.thumbnails;return(t.maxres||t.standard||t.high||t.medium||t.default).url}},youtube_nocookie:{title:e=>e.items[0].snippet.title,thumbnail:e=>{let t=e.items[0].snippet.thumbnails;return(t.maxres||t.standard||t.high||t.medium||t.default).url}},vimeo:{title:e=>e.title,thumbnail:e=>e.thumbnail_url}}};function n(t){if(!(t instanceof HTMLElement)||t.classList.contains("lazyframe--loaded"))return;const i={el:t,settings:o(t)};i.el.addEventListener("click",(()=>{i.el.appendChild(i.iframe);const e=t.querySelectorAll("iframe");i.settings.onAppend.call(this,e[0])})),e.lazyload?a(i):l(i,i.settings.thumbnail)}function o(t){console.log("getSettings: ",t);const n=Array.prototype.slice.apply(t.attributes).filter((e=>""!==e.value)).reduce(((e,t)=>(e[0===t.name.indexOf("data-")?t.name.split("data-")[1]:t.name]=t.value,e)),{}),o=Object.assign({},e,n,{parameters:s(n.src)});if(o.vendor){const e=o.src.match(i.regex[o.vendor]);o.id=i.condition[o.vendor](e)}return o}function s(e){let t=e.split("?");if(t[1]){t=t[1];return-1!==t.indexOf("autoplay")?t:t+"&autoplay=1&rel=0"}return"autoplay=1&rel=0"}function l(e){var t;console.log(e.settings),!(t=e.settings).vendor||t.title&&t.thumbnail||!("youtube"!==t.vendor&&"youtube_nocookie"!==t.vendor||t.apikey)?a(e,!0):function(e,t){const n=i.endpoints[e.settings.vendor](e.settings),o=new XMLHttpRequest;o.open("GET",n,!0),o.onload=function(){if(o.status>=200&&o.status<400){const i=JSON.parse(o.responseText);t(null,[i,e])}else t(!0)},o.onerror=function(){t(!0)},o.send()}(e,((t,n)=>{if(t)return;const o=n[0],s=n[1];if(s.settings.title||(s.settings.title=i.response[s.settings.vendor].title(o)),!s.settings.thumbnail){const t=i.response[s.settings.vendor].thumbnail(o);s.settings.thumbnail=t,e.settings.onThumbnailLoad.call(this,t)}a(s,!0)}))}function a(t,n){if(t.iframe=function(e){const t=document.createDocumentFragment(),n=document.createElement("iframe");e.vendor&&(e.src=i.src[e.vendor](e));return n.setAttribute("id",`lazyframe-${e.id}`),n.setAttribute("src",e.src),n.setAttribute("frameborder",0),n.setAttribute("allowfullscreen",""),t.appendChild(n),t}(t.settings),t.settings.thumbnail&&n&&(console.log(t.settings.thumbnail),t.el.style.backgroundImage=`url(${t.settings.thumbnail})`),t.settings.title&&0===t.el.children.length){const e=document.createDocumentFragment(),i=document.createElement("span");i.className="lazyframe__title",i.innerHTML=t.settings.title,e.appendChild(i),t.el.appendChild(e)}e.lazyload||(t.el.classList.add("lazyframe--loaded"),t.settings.onLoad.call(this,t)),t.settings.initialized}return function(i,...s){if(e=Object.assign({},t,s[0]),"string"==typeof i){const e=document.querySelectorAll(i);for(let t=0;t<e.length;t++)n(e[t])}else if(void 0===i.length)n(i);else if(i.length>1)for(let e=0;e<i.length;e++)n(i[e]);else n(i[0]);e.lazyload&&function(e){console.log("initIntersectionObserver");const t=new IntersectionObserver(((e,t)=>{e.forEach((e=>{if(e.isIntersecting){let t=e.target;t.settings||(t.settings=o(t),t.el=t,t.settings.initialized=!0,t.classList.add("lazyframe--loaded"),l(t)),t.settings.initinview&&t.click(),t.settings.onLoad.call(this,t)}}))})),i=document.querySelectorAll(e+"[data-initinview]");console.log("lazrframes die initinview haben",i),i.forEach((e=>t.observe(e)))}(i)}},t=e();window.lazyframe=e();export default t;
