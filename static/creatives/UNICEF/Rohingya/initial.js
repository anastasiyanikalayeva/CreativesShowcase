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

        frame1.innerHTML = "Over <span class=\"blue\">1,700 Rohingya refugees<\/span> were affected by devastating fires in Cox\'s Bazar, the world\'s largest refugee camp.";
        frame2.innerHTML = "UNICEF joined partner organizations in an effort to provide food, water, clothing and shelter to <span class=\"blue\">displaced refugees.<\/span>";
        frame3.innerHTML = "Help <span class=\"blue\">provide lifesaving assistance<\/span><br> to Rohingya refugees and displaced children worldwide.";
        cta.innerHTML = "Brighten Futures";

        const blueLetters = selectAll('.blue')
        const blueLettersArray = []

        for (let i = 0; i < blueLetters.length; i++) {
            blueLettersArray[i] = new SplitText(blueLetters[i], { type: "words, chars" });
        }

        const frames = selectAll('.frame')
        const frameFrameArray = []

        for (let i = 0; i < frames.length; i++) {
            frameFrameArray[i] = new SplitText(frames[i], { type: "words, chars" });
        }

        // Loading images
        const imagesSrc = [
            {
                name: 'img1',
                src: "img.jpg"
            }
        ]

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
        const imagesArray = selectAll('.img')

        gsap.registerEffect({
            name: "fadeOut",
            effect: (targets, config) => {
                let tlEffect = gsap.timeline();
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
            .from(imagesArray[0], 5, { filter: 'grayscale(100%) blur(2px)' })
            .from(frameFrameArray[0].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, "<")
            .from(frameFrameArray[0].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[0].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")

            //frame2
            .fadeOut(frameFrameArray[0].words, ">2")
            .from(frameFrameArray[1].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, ">-0.3")
            .from(frameFrameArray[1].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[1].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")

            //frame3
            .fadeOut(frameFrameArray[1].words, ">2")
            .from(frameFrameArray[2].chars, { duration: 0.7, stagger: 0.02, x: "+=50", ease: "sine" }, ">-0.3")
            .from(frameFrameArray[2].chars, { duration: 0.7, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .to(blueLettersArray[2].chars, { duration: 0.7, stagger: 0.02, color: '#00BDF2', ease: "none" }, ">")
    }
}