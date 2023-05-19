"use strict"

window.onload = function () {
    politeInit()

    // Setting variables
    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const before = select("#before")
        const slider = select("#slider")
        const after = select("#after")

        const wrapper = select("#wrapper")
        const headBefore = select("#headBefore")
        const headAfter = select("#headAfter")
        const priceEls = select("#priceEls")
        const hand = select('#hand')

        const price = select("#price")
        const person = select("#person")
        const text = select("#text")

        const width = wrapper.offsetWidth
        const height = wrapper.offsetHeight

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

        // Setting texts
        const classList = ['aqua', 'yellow', 'pink', 'white']

        const beachTop = 110
        const betterTop = 155

        headBefore.innerHTML = "Spring weather?"

        for (let i = 1; i < 5; i++) {
            const i3 = i * 3

            let div = document.createElement('div')
            headAfter.appendChild(div)
            div.classList.add('beach', classList[i - 1])
            div.style.top = beachTop - i3 + 'px'
            div.innerHTML = "Beach"

            let div2 = document.createElement('div')
            headAfter.appendChild(div2)
            div2.classList.add('beach2', classList[i - 1])
            div2.style.top = betterTop - i3 + 'px'
            div2.innerHTML = "is better"
        }

        person.innerHTML = "/ PERSON"
        price.innerHTML = 549
        text.innerHTML = "All-Inclusive Vacations<br> for as low as"

        const diffPrice = price.offsetWidth - 67;

        if (diffPrice) {
            gsap.set(person, { x: diffPrice })
            gsap.set(priceEls, { x: -diffPrice / 2 })
        }

        const
            tl = gsap.timeline(),
            tlSlider = gsap.timeline(),
            wrect = select('#wrect')

        gsap.registerPlugin(InertiaPlugin)
        gsap.set(hand, { y: 285, x: 152, alpha: 0, scale: .9 })

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
            { name: 'bg0', src: 'bg0.jpg' },
            { name: 'bg1', src: 'bg1.jpg' },
        ]

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
        const whiteChars = new SplitText('.beach.white', { type: 'chars' })
        const pinkChars = new SplitText('.beach.pink', { type: 'chars' })
        const yellowChars = new SplitText('.beach.yellow', { type: 'chars' })
        const aquaChars = new SplitText('.beach.aqua', { type: 'chars' })

        const white2Chars = new SplitText('.beach2.white', { type: 'chars' })
        const pink2Chars = new SplitText('.beach2.pink', { type: 'chars' })
        const yellow2Chars = new SplitText('.beach2.yellow', { type: 'chars' })
        const aqua2Chars = new SplitText('.beach2.aqua', { type: 'chars' })

        gsap.registerEffect({
            name: "revealText",
            extendTimeline: true,
            defaults: {
                stagger: 0.06,
                ease: "elastic",
                scale: 0.5,
                transformOrigin: "50% 50%",
                alpha: 0,
            },
            effect: (targets, config) => {
                let tl = gsap.timeline()
                    .from(targets, { alpha: config.alpha, duration: 0.085, stagger: config.stagger })
                    .from(targets, { scale: config.scale, ease: config.ease, duration: 1, transformOrigin: config.transformOrigin, stagger: config.stagger }, 0)
                return tl
            }
        })

        tlSlider

            .to(objLevel, { level: 20, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, { level: 78, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, { level: 20, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, { level: 78, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, {
                level: 50, ease: "sine.inOut", duration: 1.3, onUpdate: function () { updateLevelG() }, onComplete: function () {
                    state = 1;
                }
            }, '>1.5')
            .to(hand, { alpha: 1 }, '>')
            .to(hand, { duration: 0.7, x: "+=10", y: "+=10", repeat: 5, scale: 0.8, yoyo: true }, "<")

            .to(hand, { duration: 0.7, alpha: 0, ease: "none" }, ">-1.2")

        gsap.set(headBefore, { rotate: -5 })

        tl
            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

            .from(headBefore, { duration: 0.85, x: '-=30', alpha: 0, ease: 'elastic' })

            .revealText(whiteChars.chars, '>1.7')
            .revealText(pinkChars.chars, '<0.04')
            .revealText(yellowChars.chars, '<0.04')
            .revealText(aquaChars.chars, '<0.04')

            .revealText(white2Chars.chars, '>-1.1')
            .revealText(pink2Chars.chars, '<0.04')
            .revealText(yellow2Chars.chars, '<0.04')
            .revealText(aqua2Chars.chars, '<0.04')
    }
}