"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        const tl = gsap.timeline()
        const frame1 = select('#frame1')
        const frame2 = select('#frame2')
        const frame3 = select('#frame3')
        const cta = select('#cta')
        const wrect = select('#wrect')
        const image = select('#image')

        frame1.innerHTML = "Due to widespread food<br> insecurity in Yemen,<br> over <span class=\'blue\'>2 million children<\/span><br> under age 5 are<br> malnourished.";
        frame2.innerHTML = "Hundreds of thousands suffer from <span class=\'blue\'>severe<br> acute malnutrition,<\/span><br> which is a life-threatening condition.";
        frame3.innerHTML = "<span class=\'blue\'>Donate now<\/span> to help<br> ensure children<br> everywhere grow up<br> healthy and strong.";
        cta.innerHTML = "DONATE NOW";

        const blueLetters = selectAll('.blue')
        const blueLettersArray = []

        for (var i = 0; i < blueLetters.length; i++) {
            blueLettersArray[i] = new SplitText(blueLetters[i], { type: "words, chars" });
        }

        const frames = selectAll('.frame')
        const frameFrameArray = []

        for (var i = 0; i < frames.length; i++) {
            frameFrameArray[i] = new SplitText(frames[i], { type: "words, chars" });
        }

        // Loading images
        const imagesSrc = []

        imagesSrc[0] = {
            name: 'img',
            src: "img.jpg"
        }

        for (let i = 0; i < imagesSrc.length; i++) {
            const imgDiv = document.createElement('div')

            imgDiv.classList.add('img')
            imgDiv.style.background = `url('${imagesSrc[i].src}') no-repeat`
            imgDiv.style.background = `cover`
            image.append(imgDiv)
        }

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

        // Animation
        gsap.registerEffect({
            name: "fadeOut",
            effect: (targets, config) => {
                var tlEffect = gsap.timeline();
                tlEffect.to(targets, { stagger: 0.05, duration: config.duration, x: config.x, force3D: true, ease: "power3.in" })
                    .to(targets, { stagger: 0.05, duration: config.duration / 2, alpha: 0, ease: "none" }, "<0.6")
                return tlEffect;
            },
            defaults: { duration: 1, x: "-=20" },
            extendTimeline: true,
        });

        tl
            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

            //frame1
            .from(image, 10, { filter: 'grayscale(100%) blur(2px)' })
            .from(frameFrameArray[0].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, "<")
            .from(frameFrameArray[0].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[0].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")
            .from(cta, { duration: 1.2, y: '+=20px', alpha: 0, force3D: true, rotation: 0.001, ease: "back" }, "<")

            //frame2
            .fadeOut(frameFrameArray[0].words, ">2")
            .from(frameFrameArray[1].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, "<2.5")
            .from(frameFrameArray[1].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[1].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")

            //frame3
            .fadeOut(frameFrameArray[1].words, ">2")
            .from(frameFrameArray[2].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, "<2.5")
            .from(frameFrameArray[2].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[2].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")
    }
}