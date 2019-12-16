/**
 * Preloader
 */
window.addEventListener('load', function() {
    document.querySelector('body').classList.add('loaded');
});
//stats.js - http://github.com/mrdoob/stats.js
var Stats = function () {
    function h(a) {
        c.appendChild(a.dom);
        return a
    }

    function k(a) {
        for (var d = 0; d < c.children.length; d++) c.children[d].style.display = d === a ? "block" : "none";
        l = a
    }

    var l = 0, c = document.createElement("div");
    c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
    c.addEventListener("click", function (a) {
        a.preventDefault();
        k(++l % c.children.length)
    }, !1);
    var g = (performance || Date).now(), e = g, a = 0, r = h(new Stats.Panel("FPS", "#0ff", "#002")),
        f = h(new Stats.Panel("MS", "#0f0", "#020"));
    if (self.performance && self.performance.memory) var t = h(new Stats.Panel("MB", "#f08", "#201"));
    k(0);
    return {
        REVISION: 16, dom: c, addPanel: h, showPanel: k, begin: function () {
            g = (performance || Date).now()
        }, end: function () {
            a++;
            var c = (performance || Date).now();
            f.update(c - g, 200);
            if (c > e + 1E3 && (r.update(1E3 * a / (c - e), 100), e = c, a = 0, t)) {
                var d = performance.memory;
                t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576)
            }
            return c
        }, update: function () {
            g = this.end()
        }, domElement: c, setMode: k
    }
};
Stats.Panel = function (h, k, l) {
    var c = Infinity, g = 0, e = Math.round, a = e(window.devicePixelRatio || 1), r = 80 * a, f = 48 * a, t = 3 * a,
        u = 2 * a, d = 3 * a, m = 15 * a, n = 74 * a, p = 30 * a, q = document.createElement("canvas");
    q.width = r;
    q.height = f;
    q.style.cssText = "width:80px;height:48px";
    var b = q.getContext("2d");
    b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
    b.textBaseline = "top";
    b.fillStyle = l;
    b.fillRect(0, 0, r, f);
    b.fillStyle = k;
    b.fillText(h, t, u);
    b.fillRect(d, m, n, p);
    b.fillStyle = l;
    b.globalAlpha = .9;
    b.fillRect(d, m, n, p);
    return {
        dom: q, update: function (f,
                                  v) {
            c = Math.min(c, f);
            g = Math.max(g, f);
            b.fillStyle = l;
            b.globalAlpha = 1;
            b.fillRect(0, 0, r, m);
            b.fillStyle = k;
            b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);
            b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
            b.fillRect(d + n - a, m, a, p);
            b.fillStyle = l;
            b.globalAlpha = .9;
            b.fillRect(d + n - a, m, a, e((1 - f / v) * p))
        }
    }
};
"object" === typeof module && (module.exports = Stats);
// stats.min.js END
//-----------------------------------------------------------
// WebGL Begins
var WEBGL = {
    isWebGLAvailable: function () {
        try {
            var e = document.createElement("canvas");
            return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
        } catch (e) {
            return !1
        }
    }, isWebGL2Available: function () {
        try {
            var e = document.createElement("canvas");
            return !(!window.WebGL2RenderingContext || !e.getContext("webgl2"))
        } catch (e) {
            return !1
        }
    }, getWebGLErrorMessage: function () {
        return this.getErrorMessage(1)
    }, getWebGL2ErrorMessage: function () {
        return this.getErrorMessage(2)
    }, getErrorMessage: function (e) {
        var t = {1: window.WebGLRenderingContext, 2: window.WebGL2RenderingContext},
            n = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>',
            r = document.createElement("div");
        return r.id = "webglmessage", r.style.fontFamily = "monospace", r.style.fontSize = "13px", r.style.fontWeight = "normal", r.style.textAlign = "center", r.style.background = "#fff", r.style.color = "#000", r.style.padding = "1.5em", r.style.width = "400px", r.style.margin = "5em auto 0", n = (n = t[e] ? n.replace("$0", "graphics card") : n.replace("$0", "browser")).replace("$1", {
            1: "WebGL",
            2: "WebGL 2"
        }[e]), r.innerHTML = n, r
    }
};
// WebGL.js END
//----------------------------------------------------
// My Code

if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var SCREEN_WIDTH = document.documentElement.clientWidth,
    SCREEN_HEIGHT = window.innerHeight,
    r = 450,
    mouseY = 0,
    windowHalfY = window.innerHeight / 2,
    camera, scene, renderer;


init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(80, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    var i, line, material, p,
        parameters = [
            [0.1, 0x8905D2, 0.1],
            [0.1, 0x6249EE, 0.1],
            [0.1, 0x8B40ED, 0.1],
            [0.1, 0x466DED, 0.1],
            [0.1, 0x7070F2, 0.1],
            [0.1, 0x2B0CD5, 0.1],
            [0.1, 0x7070F2, 0.1],
            [0.1, 0x214FE6, 0.1],
            [0.1, 0x5F08D3, 0.1]
        ];

    var geometry = createGeometry();

    for (i = 0; i < parameters.length; ++i) {

        p = parameters[i];

        material = new THREE.LineBasicMaterial({
            color: p[1],
            opacity: p[2]
        });

        line = new THREE.LineSegments(geometry, material);
        line.scale.x = line.scale.y = line.scale.z = p[0]++;
        line.userData.originalScale = p[0];
        line.rotation.y = Math.random() * Math.PI;
        line.updateMatrix();
        scene.add(line);
    }

    // renderer = new THREE.WebGLRenderer({
    //   antialias: true
    // });

    (renderer = new THREE.WebGLRenderer({antialias: !0})).setPixelRatio(window.devicePixelRatio),
        renderer.setSize(SCREEN_WIDTH, SCREEN_WIDTH>576? SCREEN_HEIGHT<750?750:SCREEN_HEIGHT : SCREEN_HEIGHT<450?450:SCREEN_HEIGHT);


    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    let animation = document.getElementById('animation-screen');
    // document.body.appendChild(renderer.domElement);
    animation.appendChild(renderer.domElement);

    //console.log(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, true);
    window.addEventListener('resize', onWindowResize, false);


    // test geometry swapability
    setInterval(function () {
        var geometry = createGeometry();
        scene.traverse(function (object) {

            if (object.isLine) {
                object.geometry.dispose();
                object.geometry = geometry;
            }
        });
    }, 100000); // This was making the code go stuck
}

function createGeometry() {

    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var vertex = new THREE.Vector3();

    for (var i = 0; i < 1500; i++) {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.normalize();
        vertex.multiplyScalar(r);

        vertices.push(vertex.x, vertex.y, vertex.z);

        vertex.multiplyScalar(Math.random() * 0.01 + 1);

        vertices.push(vertex.x, vertex.y, vertex.z);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    return geometry;
}

function onWindowResize() {
    windowHalfY = window.innerHeight / 2, camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix(), renderer.setSize(document.documentElement.clientWidth, window.innerWidth>576? window.innerHeight<750?750:window.innerHeight : window.innerHeight<450?450:window.innerHeight)

}

function onDocumentMouseMove(event) {
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        //event.preventDefault();
        mouseY = event.touches[0].pageY - windowHalfY;
        console.log(event.touches[0].pageY)
    }
}

//
function animate() {

    requestAnimationFrame(animate);

    render();

}

//
var rpmY = 7;
var rpmX = 2;

function render() {

    renderer.render(scene, camera);

    var time = Date.now() * 0.00005;

    for (var i = 0; i < scene.children.length; i += 1) {
        var object = scene.children[i];
        if (object.isLine) {
            object.rotation.y = rpmY * (time * (i < 4 ? (i + 1) : -(i + 1)));
            object.rotation.x = rpmX * (time * (i < 4 ? (i + 1) : -(i + 1)));
            if (i < 9) {
                var scale = object.userData.originalScale * (i / 5 + 0.1) * (1 + 20 * Math.sin(2 * time));
                object.scale.x = object.scale.y = object.scale.z = scale;
            }
        }
    }
};

/**
 * Function open services block
 */

if(document.documentElement.clientWidth < 992){
    document.addEventListener("DOMContentLoaded", accordeonMobile);
    function accordeonMobile() {
        let accordBlocks = document.querySelectorAll('.row2'),
            accordTitles = document.querySelectorAll('.services-block__item'),
            index = null;
        accordTitles.forEach((el,i)=>{
            accordBlocks[i].style.display = 'none';
            el.addEventListener('click', function(e){

                accordTitles.forEach((elSek,y)=>{
                    if(elSek !== el){
                        accordTitles[y].style.filter = 'grayscale(1)';
                    }
                    if(index === i){
                        accordTitles[y].style.filter = 'unset';
                    }
                });
                accordTitles[i].style.filter = 'unset';
                accordBlocks[i].style.display = 'block';
                accordBlocks[i].style.height = '350px';
                accordBlocks[i].style.opacity = '1';
                console.log(accordTitles[i]);

                if(index !== null){
                    accordBlocks[index].style.display = 'none';
                    //el.style.filter = 'unset';
                    //accordTitles[index].style.opacity = '1';
                    console.log(index);
                    //accordTitles[index].style.filter = 'unset';
                    //accordTitles[y].style.filter = 'grayscale(1)' ? 'grayscale(1)' : 'unset';
                }
                index = index==i? null: i;
            });
        });
    }

}else {
    // desktop function
    document.addEventListener("DOMContentLoaded", accordeon);
    function accordeon() {
        let accordBlocks = document.querySelectorAll('.row1'),
            accordTitles = document.querySelectorAll('.services-block__item'),
            blockAboutUs =  document.querySelector('.services-block__about'),
            index = null;
        accordTitles.forEach((el,i)=>{
            accordBlocks[i].style.display = 'none';
            el.addEventListener('click', function(e){

                accordTitles.forEach((elSek,y)=>{
                    if(elSek !== el){
                        accordTitles[y].style.filter = 'grayscale(1)';
                    }
                    if(index === i){
                        accordTitles[y].style.filter = 'unset';
                    }
                });

                accordTitles[i].style.filter = 'unset';
                accordBlocks[i].style.display = 'block';
                accordBlocks[i].style.height = '388px';
                accordBlocks[i].style.opacity = '1';
                console.log(accordTitles[i]);
                blockAboutUs.style.display = 'none';
                console.log(blockAboutUs);

                if(index != null){
                    accordBlocks[index].style.display = 'none';
                    blockAboutUs.style.display = 'block';
                    //accordTitles[index].style.filter = 'unset';
                }
                index = index==i? null: i;
            });
        });
    }
}


/**
 * Scroll to anchor
 */
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

/**
 * Scroll to top
 */
// window.onload = function () {
//     //window.scrollTo(x,y)
//     let scrolled;
//     let timer;

//     document.getElementById('top').onclick = function() {
//         scrolled = window.pageYOffset;
//         //window.scrollTo(0,0);
//         scrollToTop();
//     };
//     function scrollToTop() {
//         if(scrolled > 0){
//             window.scrollTo(0, scrolled);
//             scrolled = scrolled - 100;
//             timer = setTimeout(scrollToTop, 100);
//         }
//         else {
//             clearTimeout(timer);
//             window.scrollTo(0,0);
//         }
//     }
// };

/**
 * Popup
 */
var button = $('#button');

button.on('click', (element) => {
    element.preventDefault();
    $('#popup-1').delay(1000).fadeIn();

    $('.button-popup').click(function(e)
        {
            $('#popup-1').delay(4000).fadeOut(); // Now the pop up is hiden.
        });
//     $('.overlay').click(function(e)
//     {
//         $('#popup').fadeOut();
//     });
});
$(document).mouseup(function (e) {
    var popup = $('.popup');
    if (e.target!=popup[0]&&popup.has(e.target).length === 0){
        $('.js-overlay').fadeOut();
    }
});





