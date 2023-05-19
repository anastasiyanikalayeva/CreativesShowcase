"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {

        // Setting variables
        let select = function (s) {
            return document.querySelector(s)
        },
            selectAll = function (s) {
                return document.querySelectorAll(s)
            },
            wrect = select('#wrect'),
            blueRect = select("#blueRectangle"),
            cta = select('#cta'),
            sub0 = select('#sub0'),
            sub1 = select('#sub1'),
            sub2 = select('#sub2'),
            backgroundImage = select('#backgroundImage'),
            topImage = select('#topImage'),
            blueShape = select('#blueShape'),
            tl = gsap.timeline(),
            tlCircle = gsap.timeline({ paused: true, repeat: 10 }),
            ctaText = select("#ctaText"),
            imagesToLoad = [{
                src: "img1.jpg",
                name: "bg"
            }, {
                src: "img2.png",
                name: "img"
            }]

        const logo = select('#logo')
        const getSVG = await fetch("logo.svg")
        const svg = await getSVG.text()
        logo.insertAdjacentHTML("afterbegin", svg)

        sub0.innerHTML = "<strong>Over 2 million<\/strong> children<br> in Yemen under the age<br> of 5 are malnourished."
        sub1.innerHTML = "UNICEF is delivering<br> <strong>lifesaving assistance<\/strong> to malnourished children."
        sub2.innerHTML = "<strong>Donate now<\/strong> to help ensure children everywhere grow up healthy and strong."
        ctaText.innerHTML = "DONATE NOW" + "<br>" + "DONATE NOW" + "<br>" + "DONATE NOW"

        // Loading images
        backgroundImage.classList.add('bgImg')
        backgroundImage.style.background = `url('${imagesToLoad[0].src}') no-repeat`
        backgroundImage.style.backgroundSize = 'cover'

        topImage.classList.add('topImg')
        topImage.style.background = `url('${imagesToLoad[1].src}') no-repeat`

        const loadImages = async (srcsArr) => {
            const imagesArr = await Promise.all(
                srcsArr.map((img) => {
                    return new Promise((resolve) => {
                        const image = new Image();

                        image.nameImg = img.name;
                        image.src = img.src;
                        image.onload = () => resolve(image);
                    });
                })
            );

            const images = imagesArr.reduce((acc, img) => {
                acc[img.nameImg] = img;
                return acc;
            }, {});

            return images;
        };

        await loadImages(imagesToLoad);

        animate()

        // Animating
        function animate() {
            const subheadline = selectAll(".subheadline");

            tlCircle
                .to(blueShape, { scale: 1.06, duration: 1.5, ease: "power1.inOut" })
                .to(blueShape, { scale: 1, duration: 1, ease: "power1.inOut" })

            tl
                .to(wrect, { duration: .7, alpha: 0, ease: "none" })

                .from(blueShape, {
                    duration: 2, scale: .01, ease: "back", onComplete: () => {
                        tlCircle.play()
                    }
                }, "<-0.2")

                .fromTo(blueRect, { height: 1, alpha: 0 }, { duration: 0.8, alpha: 1, height: sub0.offsetHeight, ease: "power2" }, "<.9")
                .from([subheadline[0]], { duration: 1.1, alpha: 0, x: -200, ease: "power2.inOut" }, ">")

                .from(cta, { duration: 0.8, y: 100, ease: "power2" }, ">-0.3")
                .from(ctaText, { duration: 0.6, y: -100, alpha: 0, ease: "power3" }, "<.2")

                .to([subheadline[0]], { alpha: 0, ease: "none" }, ">3")
                .to(blueRect, { duration: 0.8, height: sub1.offsetHeight, ease: "power2" }, ">")
                .from([subheadline[1]], { duration: 1.1, alpha: 0, x: -200, ease: "power2.inOut" }, ">")

                .to([subheadline[1]], { alpha: 0, ease: "none" }, ">3")
                .from([subheadline[2]], { duration: 1.1, alpha: 0, x: -200, ease: "power2.inOut" }, ">");
        }
    }
}