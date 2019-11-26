"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Stats=function e(){function t(e){return r.appendChild(e.dom),e}function n(e){for(var t=0;t<r.children.length;t++)r.children[t].style.display=t===e?"block":"none";o=e}var o=0,r=document.createElement("div");r.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",r.addEventListener("click",function(e){e.preventDefault(),n(++o%r.children.length)},!1);var i=(performance||Date).now(),a=i,l=0,c=t(new e.Panel("FPS","#0ff","#002")),s=t(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new e.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:r,addPanel:t,showPanel:n,begin:function(){i=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(s.update(e-i,200),a+1e3<e&&(c.update(1e3*l/(e-a),100),a=e,l=0,d)){var t=performance.memory;d.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){i=this.end()},domElement:r,setMode:n}};Stats.Panel=function(n,o,r){var i=1/0,a=0,l=Math.round,c=l(window.devicePixelRatio||1),s=80*c,e=48*c,d=3*c,u=2*c,m=3*c,f=15*c,y=74*c,p=30*c,h=document.createElement("canvas");h.width=s,h.height=e,h.style.cssText="width:80px;height:48px";var w=h.getContext("2d");return w.font="bold "+9*c+"px Helvetica,Arial,sans-serif",w.textBaseline="top",w.fillStyle=r,w.fillRect(0,0,s,e),w.fillStyle=o,w.fillText(n,d,u),w.fillRect(m,f,y,p),w.fillStyle=r,w.globalAlpha=.9,w.fillRect(m,f,y,p),{dom:h,update:function(e,t){i=Math.min(i,e),a=Math.max(a,e),w.fillStyle=r,w.globalAlpha=1,w.fillRect(0,0,s,f),w.fillStyle=o,w.fillText(l(e)+" "+n+" ("+l(i)+"-"+l(a)+")",d,u),w.drawImage(h,m+c,f,y-c,p,m,f,y-c,p),w.fillRect(m+y-c,f,c,p),w.fillStyle=r,w.globalAlpha=.9,w.fillRect(m+y-c,f,c,l((1-e/t)*p))}}},"object"===("undefined"==typeof module?"undefined":_typeof(module))&&(module.exports=Stats);var WEBGL={isWebGLAvailable:function(){try{var e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}},isWebGL2Available:function(){try{var e=document.createElement("canvas");return!(!window.WebGL2RenderingContext||!e.getContext("webgl2"))}catch(e){return!1}},getWebGLErrorMessage:function(){return this.getErrorMessage(1)},getWebGL2ErrorMessage:function(){return this.getErrorMessage(2)},getErrorMessage:function(e){var t={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext},n='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>',o=document.createElement("div");return o.id="webglmessage",o.style.fontFamily="monospace",o.style.fontSize="13px",o.style.fontWeight="normal",o.style.textAlign="center",o.style.background="#fff",o.style.color="#000",o.style.padding="1.5em",o.style.width="400px",o.style.margin="5em auto 0",n=(n=t[e]?n.replace("$0","graphics card"):n.replace("$0","browser")).replace("$1",{1:"WebGL",2:"WebGL 2"}[e]),o.innerHTML=n,o}};!1===WEBGL.isWebGLAvailable()&&document.body.appendChild(WEBGL.getWebGLErrorMessage());var camera,scene,renderer,SCREEN_WIDTH=document.documentElement.clientWidth,SCREEN_HEIGHT=window.innerHeight,r=450,mouseY=0,windowHalfY=window.innerHeight/2;function init(){(camera=new THREE.PerspectiveCamera(80,SCREEN_WIDTH/SCREEN_HEIGHT,1,3e3)).position.z=1e3,scene=new THREE.Scene;var e,t,n,o,r=[[.1,8979922,.1],[.1,6441454,.1],[.1,9126125,.1],[.1,4615661,.1],[.1,7368946,.1],[.1,2821333,.1],[.1,7368946,.1],[.1,2183142,.1],[.1,6228179,.1]],i=createGeometry();for(e=0;e<r.length;++e)o=r[e],n=new THREE.LineBasicMaterial({color:o[1],opacity:o[2]}),(t=new THREE.LineSegments(i,n)).scale.x=t.scale.y=t.scale.z=o[0]++,t.userData.originalScale=o[0],t.rotation.y=Math.random()*Math.PI,t.updateMatrix(),scene.add(t);(renderer=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT),document.getElementById("animation-screen").appendChild(renderer.domElement),document.addEventListener("mousemove",onDocumentMouseMove,!1),document.addEventListener("touchstart",onDocumentTouchStart,!1),document.addEventListener("touchmove",onDocumentTouchMove,!0),window.addEventListener("resize",onWindowResize,!1),setInterval(function(){var t=createGeometry();scene.traverse(function(e){e.isLine&&(e.geometry.dispose(),e.geometry=t)})},1e5)}function createGeometry(){for(var e=new THREE.BufferGeometry,t=[],n=new THREE.Vector3,o=0;o<1500;o++)n.x=2*Math.random()-1,n.y=2*Math.random()-1,n.z=2*Math.random()-1,n.normalize(),n.multiplyScalar(r),t.push(n.x,n.y,n.z),n.multiplyScalar(.01*Math.random()+1),t.push(n.x,n.y,n.z);return e.addAttribute("position",new THREE.Float32BufferAttribute(t,3)),e}function onWindowResize(){windowHalfY=window.innerHeight,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseMove(e){mouseY=e.clientY-windowHalfY}function onDocumentTouchStart(e){1<e.touches.length&&(e.preventDefault(),mouseY=e.touches[0].pageY-windowHalfY)}function onDocumentTouchMove(e){1==e.touches.length&&(mouseY=e.touches[0].pageY-windowHalfY,console.log(e.touches[0].pageY))}function animate(){requestAnimationFrame(animate),render()}init(),animate();var rpmY=7,rpmX=2;function render(){renderer.render(scene,camera);for(var e=5e-5*Date.now(),t=0;t<scene.children.length;t+=1){var n=scene.children[t];if(n.isLine&&(n.rotation.y=rpmY*(e*(t<4?t+1:-(t+1))),n.rotation.x=rpmX*(e*(t<4?t+1:-(t+1))),t<9)){var o=n.userData.originalScale*(t/5+.1)*(1+20*Math.sin(2*e));n.scale.x=n.scale.y=n.scale.z=o}}}if(document.documentElement.clientWidth<576){var accordeon=function(){var t=document.querySelectorAll(".row2"),r=document.querySelectorAll(".services-block__item"),i=null;r.forEach(function(n,o){t[o].style.display="none",n.addEventListener("click",function(e){r.forEach(function(e,t){e!==n&&(r[t].style.filter="grayscale(1)"),i===o&&(r[t].style.filter="unset")}),r[o].style.filter="unset",t[o].style.display="block",t[o].style.height="300px",t[o].style.opacity="1",console.log(r[o]),null!==i&&(t[i].style.display="none",console.log(i)),i=i==o?null:o})})};document.addEventListener("DOMContentLoaded",accordeon)}else{var _accordeon=function(){var t=document.querySelectorAll(".row1"),r=document.querySelectorAll(".services-block__item"),i=document.querySelector(".services-block__about"),a=null;r.forEach(function(n,o){t[o].style.display="none",n.addEventListener("click",function(e){r.forEach(function(e,t){e!==n&&(r[t].style.filter="grayscale(1)"),a===o&&(r[t].style.filter="unset")}),r[o].style.filter="unset",t[o].style.display="block",t[o].style.height="300px",t[o].style.opacity="1",console.log(r[o]),i.style.display="none",console.log(i),null!=a&&(t[a].style.display="none",i.style.display="block"),a=a==o?null:o})})};document.addEventListener("DOMContentLoaded",_accordeon)}setTimeout(function(){document.querySelector("body").classList.add("loaded")},3e3);var anchors=document.querySelectorAll('a[href*="#"]'),_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_loop=function(){var n=_step.value;n.addEventListener("click",function(e){e.preventDefault();var t=n.getAttribute("href").substr(1);document.getElementById(t).scrollIntoView({behavior:"smooth",block:"start"})})},_iterator=anchors[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0)_loop()}catch(e){_didIteratorError=!0,_iteratorError=e}finally{try{_iteratorNormalCompletion||null==_iterator.return||_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}window.onload=function(){var e,t;function n(){0<e?(window.scrollTo(0,e),e-=100,t=setTimeout(n,100)):(clearTimeout(t),window.scrollTo(0,0))}document.getElementById("top").onclick=function(){e=window.pageYOffset,n()}};