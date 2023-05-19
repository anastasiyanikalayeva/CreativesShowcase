"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        const cta = select('#cta')
        const text1 = select('#text1')
        const text2 = select('#text2')

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


        // Animation
        const tl = gsap.timeline()
        const wrect = select('#wrect')
        const text1Splitted = new SplitText(text1, { type: "words,chars" })

        tl
            .to(wrect, { duration: 0.8, alpha: 0, ease: "none" })

            .from(text1Splitted.words, { duration: 1.5, alpha: 0, stagger: 0.8, ease: "none" }, ">0.1")

            .from(text2, { duration: 1, x: '+=25', ease: "sine" }, ">-0.5")
            .from(text2, { duration: 1, alpha: 0, ease: "none" }, "<")

            .from(cta, { duration: 1, y: "+=20", ease: "power1" }, ">0.2")
            .from(cta, { duration: 1, alpha: 0, ease: "none" }, "<")

    }
}



