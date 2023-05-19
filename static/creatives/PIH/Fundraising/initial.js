"use strict"
window.onload = function () {
    politeInit();

    // Setting variables
    function politeInit() {

        var select = function (s) {
            return document.querySelector(s);
        },
            wrect = select('#wrect'),
            cta = select('#cta'),
            ctaInner = select('#ctaInner'),
            text1 = select('#text1'),
            text2 = select('#text2'),
            canvas = select('#canvas'),
            ctx = canvas.getContext("2d"),
            w = canvas.width,
            h = canvas.height,
            frames = [],
            tl = gsap.timeline();

        ctaInner.innerHTML = "Donate to<br>save lives";

        text1.innerHTML = "During instability in Haiti, PIH remains a pocket of hope";
        text2.innerHTML = "Dedicated PIH Haiti physicians are saving lives";

        // Loading images
        function preloadImages(callback) {
            var img, imgLink;
            var remaining = 1;
            for (var i = 0; i < 1; i++) {
                var frame = {};

                img = new Image();
                img.onload = function () {
                    --remaining;
                    if (remaining <= 0) {
                        callback();
                    }
                };
                img.id = i;

                imgLink = "img.jpg";
                img.src = imgLink;

                frame.img = img;

                frames[i] = frame;
            }
        }
        preloadImages(imagesPreloaded);

        function imagesPreloaded() {
            for (var i = 0; i < frames.length; i++) {

                frames[i].maskHeight = h * 2;
                frames[i].maskWidth = w;
                frames[i].maskX = frames[i].maskY = 0;
                frames[i].maskScale = 1;
                frames[i].canvas = document.createElement('canvas');
                frames[i].canvas.width = w;
                frames[i].canvas.height = h;
                frames[i].ctx = frames[i].canvas.getContext("2d");
            }

            animate();

            gsap.ticker.add(drawCanvas);
        }

        // Drawing canvas
        function drawImageCanvas(ob) {
            var contex = ob.ctx;

            contex.clearRect(0, 0, w, h);

            contex.save();

            contex.translate(w / 2, h / 2);

            contex.save();
            var grd = ctx.createLinearGradient(0, -h / 2, 0, h * 3 / 2);
            grd.addColorStop(0, "rgba(255, 255, 255, 1)");
            grd.addColorStop(0.5, "rgba(255, 255, 255, 1)");
            grd.addColorStop(1, "rgba(255, 255, 255, 0)");

            contex.fillStyle = grd;
            contex.translate(ob.maskX, ob.maskY);
            contex.fillRect(-ob.maskWidth / 2, -ob.maskHeight / 4, ob.maskWidth, ob.maskHeight);
            contex.restore();

            contex.globalCompositeOperation = "source-in";

            contex.drawImage(ob.img,
                -ob.img.width / 2,
                -ob.img.height / 2);

            contex.restore();

            return ob.canvas;
        }

        function drawCanvas() {
            ctx.clearRect(0, 0, w, h);

            for (var i = 0; i < frames.length; i++) {
                ctx.save();

                ctx.drawImage(drawImageCanvas(frames[i]), 0, 0);

                ctx.restore();
            }
        }


        // Animation
        function animate() {

            tl
                .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

                .from(frames[0], {
                    duration: 3, maskY: "-=" + h * 2, ease: "sine.inOut", onComplete: function () {
                        gsap.ticker.remove(drawCanvas);
                    }
                }, "<")

                .from(text1, { duration: 1, y: "-=30", alpha: 0, ease: "sine" }, "<1.3")
                .from([logo, cta], { duration: 1, x: gsap.utils.wrap(["-=100", "+=100"]), alpha: 0, ease: "power2" }, "<")

                .to(text1, { duration: 0.8, y: "+=20", alpha: 0, ease: "power2.in" }, ">2.4")
                .from(text2, { duration: 0.8, y: "+=20", alpha: 0, ease: "power2" }, ">0.2")
        }
    };
}