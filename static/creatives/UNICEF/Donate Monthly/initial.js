"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        const wrect = select('#wrect')
        const cta = select('#cta')
        const ctaback = select('#ctaback')
        const text1 = select('#text1')
        const text2 = select('#text2')

        text1.innerHTML = "DONATE MONTHLY";
        text2.innerHTML = "AND HAVE 12 MONTHS OF GIVING MATCHED";
        cta.innerHTML = ctaback.innerHTML = "2X My Gift";

        if (text1.innerHTML.length > 16) {
            text1.style.fontSize = '27px';
        }

        // Loading images
        const imagesCont = select('#images')
        const imagesSrc = [{
            name: 'imgBg',
            src: "img.jpg"
        }]

        for (let i = 0; i < imagesSrc.length; i++) {
            const imgDiv = document.createElement('div')

            imgDiv.classList.add('img')
            imgDiv.style.background = `url('${imagesSrc[i].src}') no-repeat`
            imgDiv.style.backgroundSize = "cover"
            imgDiv.style.backgroundPosition = "50% 50%"
            imagesCont.append(imgDiv)
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

        // Setting additional variables
        const tl = gsap.timeline()
        const logo = select('#logo')
        const ctawrap = select('#ctawrap')
        const ctas = selectAll('.cta')
        const headlinesSplitted = []
        const subheadlinesSplitted = []

        headlinesSplitted.push(new SplitText(text1, { type: "words, lines", linesClass: "slanted" }))
        subheadlinesSplitted.push(new SplitText(text2, { type: "words, lines", linesClass: "slanted" }))



        // Animation
        gsap.set(ctas, { backfaceVisibility: "hidden" });
        gsap.set(ctaback, { rotationY: -180 });
        gsap.set(ctawrap, { perspective: 300 });
        gsap.set(ctas, { transformStyle: "preserve-3d" });

        tl
            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })
            .from(logo, { duration: 0.7, rotationX: 90, force3D: true, rotation: 0.01, ease: "back" }, "<0.5")
         
            .from(headlinesSplitted[0].words[0], { duration: 0.7, x: "+=70", force3D: true, rotation: 0.01, alpha: 0, ease: "back" }, ">-0.3")
        if (headlinesSplitted[0].words.length === 3) {
            tl
                .from(headlinesSplitted[0].words[2], { duration: 0.7, y: "+=20", force3D: true, rotation: 0.01, alpha: 0, ease: "back" }, "<")
        }

        tl
            .from(headlinesSplitted[0].words[1], { duration: 0.7, scale: 0, ease: "back" }, "<")

            .from(subheadlinesSplitted[0].words, { duration: 0.7, stagger: 0.2, autoAlpha: 0, x: "+=50", ease: "power2" }, ">0.1")

            .from(ctawrap, { duration: 0.7, alpha: 0, ease: "none" }, ">-0.1")
            .to(ctas, { duration: 2, rotationY: "+=360", ease: "back.inOut", repeat: 3, repeatDelay: 4 }, "<-0.8")

    }
}


