"use strict"
window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        const tl = gsap.timeline()
        const headline1 = select('#headline1')
        const headline2 = select('#headline2')
        const subheadline1 = select('#subheadline1')
        const subheadline2 = select('#subheadline2')
        const cta = select('#cta')
        const wrect = select('#wrect')
        const imgWraps = selectAll('.imgWrap')
        const imgGeneralWrap = select('#imgGeneralWrap')

        headline1.innerHTML = "For the cost<br> of a book";
        headline2.innerHTML = "For the cost<br> of a book";
        subheadline1.innerHTML = "You could provide<br> 12 exercise books to the world\u2019s<br> most vulnerable children.";
        subheadline2.innerHTML = "Help children get back to school in times of emergency and conflict.";
        cta.innerHTML = "DONATE NOW";

        const headlines = selectAll('.headline')
        const headlineFrameArray = []

        for (var i = 0; i < headlines.length; i++) {
            headlineFrameArray[i] = new SplitText(headlines[i], { type: "words" });
        }
        const subheadline1Splitted = new SplitText(subheadline1, { type: "words, chars" })
        const subheadline2Splitted = new SplitText(subheadline2, { type: "words, chars" })

        // Loading images
        const imagesSrc = [
            {
                name: 'img1',
                src: "img1.jpg"
            },
            {
                name: 'img2',
                src: "img2.jpg"
            }]

        for (let i = 0; i < imagesSrc.length; i++) {
            const imgDiv = document.createElement('div')

            imgDiv.classList.add('img')
            imgDiv.setAttribute('id', `${imagesSrc[i].name}`)
            imgDiv.style.background = `url('${imagesSrc[i].src}') no-repeat`
            imgWraps[i].append(imgDiv)
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
        const img1 = select('#img1')
        const img2 = select('#img2')

        gsap.registerEffect({
            name: "fadeIn",
            effect: (targets, config) => {
                var tlEffect = gsap.timeline();
                tlEffect.from(targets, { stagger: 0.05, duration: config.duration, x: config.x, force3D: true, ease: "power3" })
                    .from(targets, { stagger: 0.05, duration: config.duration, alpha: 0, ease: "none" }, "<")
                return tlEffect;
            },
            defaults: { duration: 1, x: "+=20" },
            extendTimeline: true,
        });

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

        var bounds = imgGeneralWrap.getBoundingClientRect();

        tl

            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

            //frame1
            .from(imgWraps[0], { duration: 2.3, y: "-=" + bounds.height, force3D: true, rotation: 0.001, ease: "sine" }, ">-0.2")
            .from(img1, { duration: 2.3, y: "+=" + bounds.height, force3D: true, rotation: 0.001, ease: "sine" }, "<")
            .fadeIn(headlineFrameArray[0].words, "<0.2")
            .from(subheadline1Splitted.chars, { duration: 1, stagger: 0.02, x: "+=20", ease: "power2" }, "<0.7")
            .from(subheadline1Splitted.chars, { duration: 1, stagger: 0.02, alpha: 0, ease: "none" }, "<")
            .from(cta, { duration: 1.2, scale: 0, alpha: 0, force3D: true, rotation: 0.001, ease: "back" }, "<0.7")

            //frame2
            .fadeOut(headlineFrameArray[0].words, ">2")
            .to(subheadline1, { duration: 1.4, x: "-=50", ease: "back.in" }, "<")
            .to(subheadline1, { duration: 1.4, alpha: 0, ease: "none" }, "<")

            .from(imgWraps[1], { duration: 0.1, alpha: 0, ease: "sine" }, "<0.7")
            .from(imgWraps[1], { duration: 2.3, y: "+=" + bounds.height, force3D: true, rotation: 0.001, ease: "sine" }, ">0.2")
            .from(img2, { duration: 2.3, y: "-=" + bounds.height, force3D: true, rotation: 0.001, ease: "sine" }, "<")
            .from(lineBottom, { duration: 0.5, alpha: 0, ease: "none" }, "<")

            .fadeIn(headlineFrameArray[1].words, ">0.2")
            .from(subheadline2Splitted.chars, { duration: 1, stagger: 0.02, x: "+=20", ease: "power2" }, "<0.7")
            .from(subheadline2Splitted.chars, { duration: 1, stagger: 0.02, alpha: 0, ease: "none" }, "<")


    }
}