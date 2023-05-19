"use strict"

window.onload = function () {
    politeInit()

    // Setting variables
    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)
        const before = select("#before")
        const bgBefore = select("#bgBefore")
        const slider = select("#slider")
        const after = select("#after")
        const bgAfter = select("#bgAfter")
        const wrapper = select("#wrapper")
        const head = select("#head")
        const subhead = select("#subhead")
        const hand = select('#hand')
        const text = select("#txtWrapper")
        const cta = select("#cta")
        const width = 300
        const height = 600

        let objLevel = { level: 78 }
        let state = 0

        // Helpers
        function updateLevel(level) {
            const l1 = width * level / 100
            gsap.set(slider, { x: width * level / 100 })
            gsap.set(before, { clip: "rect(0px," + l1 + "px," + height + "px,0px)" })
            gsap.set(after, { clip: "rect(0px," + width + "px," + height + "px," + l1 + "px)" })
        }

        function updateLevelG() {
            updateLevel(objLevel.level)
        }

        updateLevel(objLevel.level)

        // Setting variables
        head.innerHTML = "One Year of<br> War in Ukraine"
        subhead.innerHTML = "Have your gift <span class=\'bold\'>MATCHED 3X<\/span> to<br> continue efforts in bringing relief<br> to children around the world."
        cta.innerHTML = "Send 3X Help"

        const
            tl = gsap.timeline(),
            tlHand = gsap.timeline({ paused: true }),
            tlSlider = gsap.timeline(),
            wrect = select('#wrect')

        gsap.registerPlugin(InertiaPlugin)
        gsap.set(hand, { y: 300, x: 152, alpha: 0, scale: .9 })

        Draggable.create(slider, {
            type: "x",
            zIndexBoost: false,
            bounds: wrapper,
            inertia: true,
            snap: [width / 2],
            onDrag: function (e) {
                if (state == 0) tlSlider.pause();
                objLevel.level = (this.x / width) * 100
                updateLevel(objLevel.level)
            },

            onThrowUpdate: function (e) {
                objLevel.level = (this.x / width) * 100
                updateLevel(objLevel.level)
            },
            onMove: function (e) {
                objLevel.level = (this.x / width) * 100
                updateLevel(objLevel.level)
                gsap.set(hand, { alpha: 0 })
            },
            onDragEnd: function () {

            }
        });

        let isOver = 0

        wrapper.addEventListener("mouseenter", overBanner, false);
        wrapper.addEventListener("mouseleave", outBanner, false);
        wrapper.addEventListener("mousemove", overBanner, false);

        function overBanner(e) {
            isOver = 1
        }

        function outBanner(e) {
            isOver = 0
        }

        const imagesSrc = [
            {
                name: 'bg0',
                src: "img1.jpg"
            },
            {
                name: 'bg1',
                src: "img2.jpg"
            }
        ]

        bgBefore.style.background = `url('${imagesSrc[0].src}') no-repeat`
        bgBefore.style.background = `cover`
        bgAfter.style.background = `url('${imagesSrc[1].src}') no-repeat`
        bgAfter.style.background = `cover`

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
        tlSlider

            .to(objLevel, { level: 20, force3D: true, rotation: 0.01, ease: "sine.inOut", duration: 3.5, onUpdate: function () { updateLevelG() } }, '>2')
            .to(objLevel, { level: 78, force3D: true, rotation: 0.01, ease: "sine.inOut", duration: 3.5, onUpdate: function () { updateLevelG() } }, '>1.5')
            .to(objLevel, { level: 20, force3D: true, rotation: 0.01, ease: "sine.inOut", duration: 3.5, onUpdate: function () { updateLevelG() } }, '>1.5')
            .to(objLevel, { level: 78, force3D: true, rotation: 0.01, ease: "sine.inOut", duration: 3.5, onUpdate: function () { updateLevelG() } }, '>1.5')
            .to(objLevel, {
                level: 50, force3D: true, rotation: 0.01, ease: "sine.inOut", duration: 2.5, onUpdate: function () { updateLevelG() }, onComplete: function () {
                    state = 1;
                }
            }, '>1.5')
            .to(hand, { alpha: 1 }, '>')
            .to(hand, { duration: 0.7, x: "+=10", y: "+=10", repeat: 5, scale: 0.8, yoyo: true }, "<")

            .to(hand, { duration: 0.7, alpha: 0, ease: "none" }, ">-1.2")

        tlHand
            .to(hand, { alpha: 1 }, '>')
            .to(hand, { duration: 0.7, x: "+=10", y: "+=10", repeat: 5, scale: 0.8, yoyo: true }, "<")

            .to(hand, { duration: 0.7, alpha: 0, ease: "none" }, ">-1.2")


        setTimeout(() => {
            if (!isOver) {
                tlHand.play()
            }
        }, 30000)

        tl
            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

            .from(head, { duration: 1.8, x: "+=300", ease: "power1.inOut" }, ">-0.4")
            .from(subhead, { duration: 1.8, x: "+=300", ease: "power1.inOut" }, "<")
            .from(text, { duration: 1.8, x: "-=300", ease: "power1.inOut" }, "<")
    }
}