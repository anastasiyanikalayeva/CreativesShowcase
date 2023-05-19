"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        let
            cta = select('#cta'),
            headlines = selectAll('.headline'),
            subheadlines = selectAll('.subheadline'),
            headlinesArray = [],
            subheadlinesArray = []

        headlines[0].innerHTML = "Choose Children<br>Before Politics"
        subheadlines[0].innerHTML = "They need your help<br> more than ever."
        let ctaSpan = document.createElement('span')
        ctaSpan.innerHTML = "Brighten Futures"
        cta.append(ctaSpan)


        // Loading images
        const imagesCont = select('#images')
        const imagesSrc = [];

        imagesSrc.push({
            url: "img.jpg",
            name: 'img'
        })

        for (let i = 0; i < imagesSrc.length; i++) {
            const imgUrl = imagesSrc[i].url
            const imgDiv = document.createElement('div')

            imgDiv.classList.add('img')
            imgDiv.style.background = `url('${imgUrl}') no-repeat`
            imgDiv.style.backgroundSize = "cover"
            imgDiv.style.backgroundPosition = "50% 50%"
            imagesCont.append(imgDiv)
        }

        const loadImages = async (srcsArr) => {
            const imagesArr = await Promise.all(srcsArr.map((img) => {
                return new Promise((resolve) => {
                    const image = new Image()

                    image.nameImg = img.name
                    image.src = img.url
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

        // Splitting texts
        for (let i = 0; i < headlines.length; i++) {
            const headlineSplitted = new SplitText(headlines[i], { type: "words, chars" })

            headlinesArray.push(headlineSplitted)
        }

        for (let i = 0; i < subheadlines.length; i++) {
            const subheadlineSplitted = new SplitText(subheadlines[i], { type: "words, chars" })

            subheadlinesArray.push(subheadlineSplitted)
        }

        // Animation
        const tl = gsap.timeline()
        const wrect = select('#wrect')

        gsap.registerEffect({
            name: "randomFade",
            extendTimeline: true,
            defaults: {
                y: 0,
                x: 0,
                duration: 1,
                ease: "power1",
            },
            effect: (targets, config) => {
                gsap.set(targets, { filter: "blur(0)" })
                let tl = gsap.timeline()
                tl.from(targets, {
                    opacity: 0, duration: config.duration, ease: config.ease, x: config.x, y: config.y,
                    stagger: {
                        each: 0.15,
                        from: "random"
                    }
                })
                return tl
            }
        })

        gsap.registerEffect({
            name: "burnIn",
            extendTimeline: true,
            defaults: {
                y: 0,
                x: 0,
                duration: 1,
                ease: "none"
            },
            effect: (targets, config) => {

                gsap.set(targets, { filter: "blur(0px) brightness(1)" })
                let tl = gsap.timeline()
                tl.from(targets, {
                    filter: "blur(20px) brightness(8)", scale: 0.8, rotation: -10,
                    duration: config.duration, ease: config.ease, x: config.x, y: config.y,
                    stagger: {
                        each: 0.02,
                        ease: "none"
                    }
                })
                    .from(targets, {
                        duration: 0.1, opacity: 0, ease: "none", stagger: {
                            each: 0.02,
                            ease: "none"
                        }
                    }, 0)
                return tl
            }
        })

        tl
            .to(wrect, { duration: 1, alpha: 0, ease: "none" })

            //// FRAME 1
            .burnIn(headlinesArray[0].chars, { x: -10 })
            .randomFade(subheadlinesArray[0].words, '<1.3')
            .from(cta, { duration: 1, force3D: true, rotation: 0.01, alpha: 0, ease: "sine" }, ">-1.2")
    }
}


