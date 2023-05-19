"use strict"
window.onload = function () {
    politeInit();

    // Setting variables
    async function politeInit() {
        let select = function (s) {
            return document.querySelector(s);
        },
            wrect = select('#wrect'),
            tl = gsap.timeline(),
            fees = select("#fees"),
            headline1 = select("#headline1"),
            headline2 = select("#headline2"),
            headline3 = select("#headline3"),
            headline4 = select("#headline4"),
            highlight1 = select("#highlight1"),
            highlight2 = select("#highlight2"),
            highlight3 = select("#highlight3"),
            highlight4 = select("#highlight4");


        // Loading images
        let imagesSrc = []
        imagesSrc.push({
            src: "img.jpg"
        })

        const loadImages = async (srcsArr) => {
            const imagesArr = await Promise.all(srcsArr.map((img) => {
                return new Promise((resolve) => {
                    const image = new Image()

                    image.nameImg = img.name
                    image.src = img.src
                    image.onload = () => resolve(image)
                })
            }))

            const images = imagesArr.reduce((acc, img) => {
                acc[img.nameImg] = img
                return acc
            }, {})

            return images
        }

        await loadImages(imagesSrc)

        animate();

        // Animation
        function animate() {

            TweenLite.set([headline1, headline2, headline3, headline4], { perspective: 400 });

            tl

                .to(wrect, { duration: .7, alpha: 0, ease: "power1.in" })

                // FRAME 1         
                .from(headline2, { duration: 1, x: -320, ease: "power2" }, '>0.5')
                .fromTo(highlight1, { width: 0 }, { width: 89.6, duration: 0.6, force3D: true, rotation: 0.01, ease: "power2" }, '>')
                .fromTo(highlight2, { width: 0 }, { width: 104.08, duration: 0.6, force3D: true, rotation: 0.01, ease: "power2" }, '<0.3')
                .fromTo(highlight3, { width: 0 }, { width: 67.88, duration: 0.5, force3D: true, rotation: 0.01, ease: "power2" }, '<0.3')
                .fromTo(highlight4, { width: 0 }, { width: 54.3, duration: 0.5, force3D: true, rotation: 0.01, ease: "power2" }, '<0.3')

                .to(headline1, { duration: 0.7, x: -320, ease: "power2.in" }, '>1')
                .to(headline2, { duration: 0.7, x: -320, ease: "power2.in" }, '<')

                .to(highlight1, { duration: 0.7, x: -320, ease: "power2.in" }, '<')
                .to(highlight2, { duration: 0.7, x: -320, ease: "power2.in" }, '<')
                .to(highlight3, { duration: 0.7, x: -320, ease: "power2.in" }, '<')
                .to(highlight4, { duration: 0.7, x: -320, ease: "power2.in" }, '<')

                // FRAME 2
                .from(headline3, { duration: 1, x: -320, stagger: .1, ease: "power2" }, '>')
                .from(headline4, { duration: 1, x: -320, stagger: .1, ease: "power2" }, '<0.5')

                .from(fees, { alpha: 0, duration: 1, ease: 'powe1.in' }, '<')

        }

    };
}