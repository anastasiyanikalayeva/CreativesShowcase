"use strict"
window.onload = function () {
    politeInit();

    // Setting variables
    async function politeInit() {
        const select = (s) => document.querySelector(s);
        const selectAll = (s) => document.querySelectorAll(s);
        const wrect = select('#wrect');

        const wrectWidth = 300;
        const wrectHeight = 600;
        const dimension = wrectWidth + "x" + wrectHeight;
        const headlines = select('#headlines');


        const imgWrap = select('#imgWrap');
        const images = selectAll('.imgElem');
        const descriptorTrigger = select('#descriptor_trigger');
        const descriptorText = selectAll('.descriptor_text');
        const arrow = select('#descriptor_arrow_right');
        const descriptorBG = select('#descriptorBG');
        const descriptorWrap = select('#descriptorWrap');
        const cta = select('#cta');
        const tl = gsap.timeline();
        const tlClick = gsap.timeline();
        const tlArrow = gsap.timeline();

        let isMouseHovered = false;
        let sliderImageGap = 5;
        let currentFrame = 0;

        const shiftImageWrap = (images.length - 1) * wrectWidth + (sliderImageGap * (images.length - 1));
        const shiftImageWrapClick = wrectWidth + sliderImageGap;
        const arrayForClicks = Array(images.length - 1).fill({})

        gsap.registerPlugin(DrawSVGPlugin);

        const frameTypes = [
            "Winter Hats",
            "Winter Blankets",
            "Winter Jackets",
            "Winter Kit"
        ]

        headlines.innerHTML = ""
        for (let i = 0; i < 4; i++) {
            descriptorText[i].innerHTML = frameTypes[i];
        }

        const frames = [
            "Help us reach children<br>in need around the<br>world <span class=\"highlight\">before winter<\/span> does.",
            "Send a <span class=\"highlight\">winter kit</span> to<br>a child in need."
        ]
        for (let i = 0; i < 2; i++) {
            const headLine = document.createElement("div")
            headLine.setAttribute("id", "headline" + (i + 1))
            headLine.classList.add('headline')

            const fr = frames[i]
            const lines = fr.split("<br>")
            for (let l = 0; l < lines.length; l++) {
                const line = document.createElement('div')

                line.classList.add('line')

                line.innerHTML = lines[l]

                if (lines[l].includes('class="highlight"')) {
                    const blueline = document.createElement('div')
                    blueline.classList.add('blueLine')
                    blueline.setAttribute("id", "blueLine" + (i + 1))
                    line.appendChild(blueline)
                }

                headLine.appendChild(line)
                if (i == 1 && l == lines.length - 1) {
                    const sub1 = document.createElement('div')
                    sub1.setAttribute("id", "subheadline")
                    sub1.innerHTML = "WINTER CLOTHING, BLANKETS,<br>EMERGENCY AID & MORE!"
                    headLine.appendChild(sub1)
                }
            }

            headlines.appendChild(headLine)
        }

        const blueLines = selectAll('.blueLine');
        const highlight = selectAll('.highlight');

        for (let i = 0; i < 2; i++) {
            gsap.set(blueLines[i], { width: highlight[i].offsetWidth, left: highlight[i].offsetLeft })
        }


        cta.innerHTML = "Brighten Futures";

        const subheadline = select('#subheadline');

        const linesFirstHeadline = selectAll('#headline1 .line');
        const linesSecondHeadline = selectAll('#headline2 .line');

        const imagesToPreload = [
            { name: 'ocean', src: 'ocean.jpg' },
            { name: 'cloud0', src: 'cloud0.jpg' },
            { name: 'cloud1', src: 'cloud1.png' }
        ]


        const imagesSrc = []
        for (let i = 0; i < 4; i++) {
            imagesSrc.push({
                name: "img" + i, src: "img" + (i + 1) + ".jpg"
            })
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

        animate();

        // Animation
        function animate() {
            gsap.set(descriptorBG, { bottom: "-45px" })
            gsap.set(images, { marginRight: `${sliderImageGap}px` })
            gsap.set(descriptorTrigger, { pointerEvents: "none" })
            gsap.set(descriptorText, { alpha: 0 })
            gsap.set(descriptorText[0], { alpha: 1 })
            gsap.set([linesSecondHeadline, subheadline], { alpha: 0 })
            gsap.set(".imageStroke", { alpha: 0 })

            tlArrow
                .to(arrow, { duration: 1, x: "+=10", alpha: 0, repeat: 25, ease: "sine.InOut" })
                .set(arrow, { x: "-=10" }, ">")
                .to(arrow, { duration: 1, alpha: 1, ease: "none" }, ">")

            tl

                .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })
                .from(imgWrap, { duration: 2, x: `-=${shiftImageWrap}`, onComplete: () => gsap.set(".imageStroke", { alpha: 1 }), ease: "power3.inOut" }, ">")

                .from(linesFirstHeadline, { duration: 0.8, y: "+=30", stagger: 0.2, rotationZ: 0.01, force3D: true, ease: "power" }, ">-0.1")
                .from(linesFirstHeadline, { duration: 0.8, alpha: 0, stagger: 0.2, ease: "none" }, "<")
                .from(cta, { duration: 1.5, y: "+=100", rotationZ: 0.01, force3D: true, ease: "power3" }, ">-0.6")
                .from(blueLines[0], { duration: 1.1, width: "0px", ease: "power2.inOut" }, ">-0.8")

                .from(`.svg_${currentFrame}_outer`, { duration: 2.1, drawSVG: "50% 50%", ease: "sine.inOut" }, ">")
                .from(`.svg_${currentFrame}_inner`, { duration: 0.6, alpha: 0, ease: "sine.in" }, ">")

                .from(descriptorWrap, {
                    duration: 0.8, y: "+=40", rotationZ: 0.01, force3D: true, ease: "power", onComplete: () => {
                        gsap.set(descriptorTrigger, { pointerEvents: "auto" })
                    }
                }, ">-0.1")
                .to(arrayForClicks, {
                    stagger: {
                        each: 5,
                        onStart: () => clickSlider()
                    }
                }, ">3")
        }

        function clickSlider(e) {
            if (e) gsap.killTweensOf(arrayForClicks);

            if (tlClick.isActive()) return;

            if (currentFrame >= 3) {
                tlClick
                    .to(imgWrap, { duration: 2, x: `+=${shiftImageWrap}`, onComplete: () => currentFrame = 0, ease: "power3.inOut" })
                    .to(descriptorText[currentFrame], { duration: 0.6, y: "+=40", alpha: 0, clearProps: "y", ease: "sine.in" }, "<")
                    .to(descriptorText[0], { duration: 0.6, alpha: 1, ease: "none" }, ">-0.3")

                    .to([linesSecondHeadline, subheadline], { duration: 0.7, x: `+=${100}`, stagger: 0.15, clearProps: "x", ease: "sine.in" }, "<-0.3")
                    .to([linesSecondHeadline, subheadline], { duration: 0.7, alpha: 0, stagger: 0.15, ease: "none" }, "<")

                    .from(linesFirstHeadline, { duration: 0.7, x: `-=${100}`, stagger: 0.15, ease: "sine" }, "<0.6")
                    .to(linesFirstHeadline, { duration: 0.7, alpha: 1, stagger: 0.15, ease: "none" }, "<")
                    .from(blueLines[0], { duration: 0.8, width: "0px", ease: "power2.inOut" }, ">")

                    .from(`.svg_${0}_outer`, { duration: 1.7, drawSVG: "50% 50%", ease: "sine.inOut" }, ">")
                    .from(`.svg_${0}_inner`, { duration: 0.6, alpha: 0, ease: "sine.in" }, ">")

            } else {
                tlClick
                    .to(imgWrap, { duration: 0.7, x: `-=${shiftImageWrapClick}`, onComplete: () => currentFrame++, ease: "sine.inOut" })
                    .to(descriptorText[currentFrame], { duration: 0.6, y: "+=40", alpha: 0, clearProps: "y", ease: "sine.in" }, "<")
                    .to(descriptorText[currentFrame + 1], { duration: 0.6, alpha: 1, ease: "none" }, ">-0.3")
                    .from(`.svg_${currentFrame + 1}_outer`, { duration: 2.1, drawSVG: "50% 50%", ease: "sine.inOut" }, ">")
                    .from(`.svg_${currentFrame + 1}_inner`, { duration: 0.6, alpha: 0, ease: "sine.in" }, ">")
            }

            if (currentFrame === 2) {
                tlClick
                    .to(linesFirstHeadline, { duration: 0.7, x: `-=${100}`, stagger: 0.15, clearProps: "x", ease: "sine.in" }, "<-3")
                    .to(linesFirstHeadline, { duration: 0.7, alpha: 0, stagger: 0.15, ease: "none" }, "<")

                    .from([linesSecondHeadline, subheadline], { duration: 0.7, x: `+=${100}`, stagger: 0.15, ease: "sine" }, "<0.6")
                    .to([linesSecondHeadline, subheadline], { duration: 0.7, alpha: 1, stagger: 0.15, ease: "none" }, "<")
                    .from(blueLines[1], { duration: 0.8, width: "0px", ease: "power2.inOut" }, ">1.1")
            }
        }

        cta.addEventListener('mouseenter', function (e) {
            gsap.to(cta, { duration: 0.3, backgroundColor: "#007dab" })

            if (!isMouseHovered) {

            }

        }, false)

        cta.addEventListener('mouseleave', function (e) {
            gsap.to(cta, { duration: 0.3, backgroundColor: "#00aeef" })
        }, false)

        descriptorTrigger.addEventListener('mouseenter', function (e) {
            gsap.to(descriptorBG, { duration: 0.3, bottom: "0px", ease: "sine.inOut" })
        }, false)

        descriptorTrigger.addEventListener('mouseleave', function (e) {
            gsap.to(descriptorBG, { duration: 0.45, bottom: "-45px", ease: "sine.inOut" })
        }, false)


        descriptorTrigger.addEventListener('click', function (e) {
            clickSlider(e)
        }, false)
    };
}