"use strict"
window.onload = function () {
    politeInit()

    // Setting variables
    async function politeInit() {

        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        const wrect = select('#wrect')
        const intro = select('#intro')
        const introHeadline = select('#introHeadline')
        const introSubheadline = select('#introSubheadline')
        const introCaption = select('#introCaption')
        const introHeadlineWithColor = select('#introHeadlineWithColor')
        const textColor = select('#textColor')
        const textWrap = select('#textWrap')
        const headline_1_words = selectAll('#headline > div')
        const subheadline = select('#subheadline')
        const headlineCaption = select('#headlineCaption')
        const cta = select('#cta')
        const footer = select('#footer')
        const tl = gsap.timeline()
        const priceNum = select('#priceNum')
        const imagesWrap = select('#imagesWrap')
        const lines = selectAll('.line')
        const imageOverlay = selectAll('.imageOverlay')
        const footerIncludes = select('#footerIncludes')
        const footerInnerWrap = select('#footerInnerWrap')
        const disclaimer = select('#disclaimer')
        const resortSubheadline = select('#resortSubheadline')
        const resortHeadline = select('#resortHeadline')
        const images = [
            { src: "img1.jpg", name: 'img1' },
            { src: "img2.jpg", name: 'img2' }]

        cta.innerHTML = "EXPLORE Mexico & the&nbsp;Caribbean >"
        priceNum.innerHTML = "499"
        resortHeadline.innerHTML = "Mexico & the&nbsp;Caribbean"
        resortSubheadline.innerHTML = "All-Inclusive Vacations to"
        footerIncludes.innerHTML = "Includes Hotel, Air, Drinks & Food"

        // Loading images

        // Helpers
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

        for (let i = 0; i < images.length; i++) {
            const image = document.createElement("div")

            image.style.background = `url('${images[i].src}') 50% 50% / cover no-repeat`

            image.className = 'image'

            imagesWrap.insertBefore(image, imageOverlay[0])
        }

        await loadImages(images)

        animate()


        // Animation
        function animate() {
            const images = selectAll('.image')
            const shiftTopLine = 130
            const shiftBottomLine = 129

            gsap.set(images[1], { alpha: 0 })
            gsap.set(lines, { y: gsap.utils.wrap([`+=${shiftTopLine}`, `-=${shiftBottomLine}`]) })

            tl

                .to(wrect, { duration: 1, alpha: 0, ease: "none" })

                //frame 0
                .from(introSubheadline, { duration: 1, y: "+=30", rotationZ: 0.01, force3D: true, ease: "sine" }, ">-0.5")
                .from(introSubheadline, { duration: 1, alpha: 0, ease: "none" }, "<")
                .from(introHeadline, { duration: 1, stagger: 0.2, rotationZ: 0.01, force3D: true, y: "+=25", ease: "sine" }, ">-0.4")
                .from(introHeadline, { duration: 1, stagger: 0.2, alpha: 0, ease: "none" }, "<")
                .from(introCaption, { duration: 1, alpha: 0, ease: "none" }, ">-0.2")
                .fromTo(introHeadlineWithColor, { backgroundPosition: 'left 0px top 70px' }, { duration: 3.8, backgroundPosition: 'left 400px top -10px', ease: "sine" }, '>-2')
                .to([introSubheadline, introHeadline, introCaption], { duration: 1, stagger: 0.25, y: "-=30", rotationZ: 0.01, force3D: true, clearProps: "y", ease: "sine.in" })
                .to([introSubheadline, introHeadline, introCaption], { duration: 1, stagger: 0.25, alpha: 0, ease: "none" }, "<")
                .set(intro, { scale: 1, y: "-=225" }, ">")
                .set(introHeadlineWithColor, { backgroundPosition: 'left 0px top 70px' }, ">")

                //frame 1
                .from(lines, { duration: 1.5, x: gsap.utils.wrap(['-=160', '+=160']), ease: "sine" }, ">")
                .to(lines, { duration: 1.7, rotationZ: 0.01, force3D: true, y: gsap.utils.wrap([`-=${shiftTopLine}`, `+=${shiftBottomLine}`]), ease: "sine.inOut" }, ">-1.2")
                .to(imageOverlay, { duration: 1.7, y: gsap.utils.wrap([`-=${shiftTopLine}`, `+=${shiftBottomLine}`]), ease: "sine.inOut" }, "<")
                .from(images, { duration: 2.5, scale: 1.2, ease: "power.inOut" }, "<")
                .from(subheadline, { duration: 1, y: "+=30", rotationZ: 0.01, force3D: true, ease: "sine" }, ">-2")
                .from(subheadline, { duration: 1, alpha: 0, ease: "none" }, "<")
                .from(headline_1_words, { duration: 1, stagger: 0.2, rotationZ: 0.01, force3D: true, y: "+=25", ease: "sine" }, ">-0.4")
                .from(headline_1_words, { duration: 1, stagger: 0.2, alpha: 0, ease: "none" }, "<")
                .from(headlineCaption, { duration: 0.8, alpha: 0, ease: "none" }, ">-0.2")
                .fromTo(textColor, { backgroundPosition: 'left 0px top 70px' }, { duration: 3.8, backgroundPosition: 'left 400px top -15px', ease: "sine" }, '>-2')

                //frame 2
                .to(lines, { duration: 1.5, y: gsap.utils.wrap([`+=${shiftTopLine}`, `-=${shiftBottomLine}`]), ease: "sine.inOut" }, ">2.5")
                .to(imageOverlay, { duration: 1.5, y: gsap.utils.wrap([`+=${shiftTopLine}`, `-=${shiftBottomLine}`]), ease: "sine.inOut" }, "<")
                .set(images[1], { alpha: 1 }, '>')
                .to(lines, { duration: 1.5, y: gsap.utils.wrap([`-=${shiftTopLine}`, `+=${shiftBottomLine}`]), ease: "sine.inOut" }, ">")
                .to(imageOverlay, { duration: 1.5, y: gsap.utils.wrap([`-=${shiftTopLine}`, `+=${shiftBottomLine}`]), ease: "sine.inOut" }, "<")
                .from(footer, { duration: 1.5, rotationZ: 0.01, force3D: true, y: "+=268", ease: "sine.inOut" }, "<")
                .to([subheadline, headline_1_words, headlineCaption], { duration: 1, stagger: 0.25, y: "-=30", rotationZ: 0.01, force3D: true, clearProps: "y", ease: "sine.in" }, "<-1.7")
                .to([subheadline, headline_1_words, headlineCaption], { duration: 1, stagger: 0.25, alpha: 0, ease: "none" }, "<")
                .set(textWrap, { y: "-=200" }, ">")
                .set(textColor, { backgroundPosition: 'left 0px top 70px' }, ">")

                // frame 3
                .to(lines, { duration: 1.5, y: gsap.utils.wrap([`+=${shiftTopLine}`, `-=${shiftBottomLine}`]), ease: "sine.inOut" }, ">5")
                .to(imageOverlay, { duration: 1.5, y: gsap.utils.wrap([`+=${shiftTopLine}`, `-=${shiftBottomLine}`]), ease: "sine.inOut" }, "<")
                .to(lines, { duration: 0.5, x: gsap.utils.wrap(['+=160', '-=160']), alpha: 0, ease: "sine" }, ">")
                .to(footer, {
                    duration: 1.5, rotationZ: 0.01, force3D: true, y: "+=270", onComplete: function () {
                        gsap.set(footerInnerWrap, { y: "-=44" })
                        gsap.set(footerIncludes, { y: "-=40" })
                        gsap.set(disclaimer, { y: "-=83" })
                    }, ease: "sine.inOut"
                }, "<-1.7")
                .to(footer, { duration: 1.6, y: "-=183", rotationZ: 0.01, force3D: true, ease: "sine.inOut" }, ">-0.1")
                .to([subheadline, headline_1_words, cta], { duration: 1, stagger: 0.3, y: "-=30", rotationZ: 0.01, force3D: true, ease: "sine" }, "<0.5")
                .fromTo([subheadline, headline_1_words, cta], { alpha: 0 }, { duration: 1, stagger: 0.3, alpha: 1, ease: "none" }, "<")
                .to(textColor, { duration: 3.8, backgroundPosition: 'left 400px top -15px', ease: "sine" }, '>-1.3')
        }
    }
}
