"use strict"
window.onload = function () {
    politeInit()

    // Setting variables
    async function politeInit() {
        var select = function (s) {
            return document.querySelector(s);
        },
            selectAll = function (s) {
                return document.querySelectorAll(s);
            },

            wrect = select('#wrect'),
            cta = select("#cta"),
            txtWrap = select("#txtWrap"),
            blue = select("#blue"),
            rush = selectAll('.rush'),

            tl = gsap.timeline()

        const size = '320x50';
        const filtered = {
            "frame_1_320x50": "RUSH | LIFE-CHANGING SUPPORT | Help children overcome severe acute malnutrition and other humanitarian crises.",
            "frame_2_320x50": "RUSH | PROTECTION | Send emergency relief and protection for children caught in disaster zones.",
            "frame_3_320x50": "MAKE | AN IMPACT | Your gift will provide critical support, supplies and hope to children in need."
        }
        const framesArr = [];
        let rushText = new Set();

        for (let property in filtered) {
            if (property.includes('frame_')) {
                const [rush, headline, subheadline] = filtered[property].split("|")

                const orderNum = property.split('_')[1];
                framesArr.push({
                    rushText: rush,
                    order: parseInt(orderNum),
                    headline: headline.trim(),
                    subheadline: subheadline.trim()
                });
            }
        }

        framesArr.sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        })

        framesArr.forEach(frame => {
            rushText.add(frame.rushText)
        })

        cta.innerHTML = "2X My Gift"

        for (let i = 0; i < rushText.size; i++) {
            rush[i].innerHTML = [...rushText][i];
        }

        const text = [
            {
                headline: framesArr[0].headline,
                time: 2.5
            }, {
                headline: framesArr[1].headline,
                time: 2.5
            }, {
                headline: framesArr[2].headline,
                time: 2.5
            }
        ]

        // Loading images
        const imagesToLoad = []
        const imgParts = 14
        const imgPartWidth = 140 / imgParts

        const imagesFromFeed = ["img.jpg"]
        for (let i = 0; i < 1; i++) {
            imagesToLoad.push({ name: `img` + i, src: imagesFromFeed[i] })

            for (let x = 0; x < imgParts; x++) {
                const imgDiv = document.createElement('div')
                imgDiv.classList.add('imgDiv')
                imgDiv.classList.add('img' + (i))

                imgWrap.append(imgDiv)
                let alpha = 0;
                gsap.set(imgDiv, { left: x * imgPartWidth, width: imgPartWidth, backgroundImage: 'url(' + imagesFromFeed[i] + ')', transformOrigin: "50% 50%", alpha: alpha, backgroundPosition: "-" + (x * imgPartWidth) + "px 0px" })
            }
        }

        for (let i = 1; i <= 3; i++) {
            const divFrame = document.createElement('div')
            divFrame.classList.add('frame')
            txtWrap.append(divFrame)

            const divHeadline = document.createElement('div')

            divHeadline.classList.add('headline')

            divFrame.append(divHeadline)

            divHeadline.innerHTML = text[i - 1].headline

            gsap.set(divHeadline, { height: divHeadline.offsetHeight + 5 })

            gsap.set(divHeadline, { left: 131 + 124 / 2 - divHeadline.offsetWidth / 2 })

            text[i - 1].left = 131 + 124 / 2 - divHeadline.offsetWidth / 2
            text[i - 1].width = divHeadline.offsetWidth

            if (i == 1) {
                gsap.set(divFrame, { alpha: 1 })
            } else {
                gsap.set(divFrame, { alpha: 0 })
            }


        }

        const loadImages = async (srcsArr) => {
            const imagesArr = await Promise.all(srcsArr.map((img) => {
                return new Promise((resolve) => {
                    const image = new Image()

                    image.nameImg = img.name
                    image.src = img.src
                    image.setAttribute("id", img.name)
                    image.onload = () => resolve(image)
                })
            }))

            const images = imagesArr.reduce((acc, img) => {
                acc[img.nameImg] = img
                return acc
            }, {})

            return images
        }

        await loadImages(imagesToLoad)

        // Animation
        const headline = selectAll(".headline")
        const subheadline = selectAll(".subheadline")
        const frame = selectAll(".frame")
        const rushSplitted = [new SplitText(rush[0], { type: "chars" }), new SplitText(rush[1], { type: "chars" })]

        const headlines = []

        const images = []

        for (let i = 0; i < 3; i++) {
            headlines[i] = new SplitText(headline[i], { type: "words, chars" })
            images[i] = selectAll(".img" + i)
        }


        tl
            .to(wrect, { duration: .6, alpha: 0 })
            .to(images[0], { ease: "power1", alpha: 1, stagger: .07, duration: .7 }, '<')
            .from(rushSplitted[0].chars, { duration: .8, ease: "power2.out", scaleX: .1, alpha: 0, stagger: .1 }, '<.31')

        for (let i = 0; i < 3; i++) {
            tl
                .set([frame[i], blue], { alpha: 1 }, '<.7')

            tl
                .from(headlines[i].chars, { duration: .3, ease: "expo", y: 14, alpha: 0, stagger: .03 }, '<.-3')
                .set(blue, { alpha: 1 }, '>')
                .fromTo(blue, { left: text[i].left, width: 0 }, { width: text[i].width }, '<')

            if (!i) tl.from(cta, { duration: .7, force3D: true, alpha: 0, ease: "none" }, ">-.5")

            if (i != 2)
                tl
                    .to(blue, { alpha: 0, duration: .5 }, '>' + text[i].time)
                    .to(headlines[i].chars, { duration: .3, ease: "expo.in", y: 14, alpha: 0, stagger: .03 }, '>')
                    .set(blue, { left: -20, width: 1 }, '<.1')

            if (i == 1)
                tl
                    .to(rushSplitted[0].chars, { duration: .8, ease: "power2.out", scaleX: .1, alpha: 0, stagger: .1 }, '<.31')
                    .from(rushSplitted[1].chars, { duration: .8, ease: "power2.out", scaleX: .1, alpha: 0, stagger: .1 }, '>-.5')
        }
    };
}