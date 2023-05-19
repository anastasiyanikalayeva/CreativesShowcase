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

        const price = select("#price")
        const person = select("#person")
        const text = select("#text")
        const subhead = select("#subhead")
        const cta = select("#cta")

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

        const staycayTop = 57
        const vacayTop = 110

        for (let i = 1; i < 5; i++) {
            const i2 = i * 2
            const i3 = i * 3

            let div = document.createElement('div')
            headBefore.appendChild(div)
            div.classList.add('staycay', classList[i - 1])
            div.style.top = staycayTop - i2 + 'px'
            div.innerHTML = "staycay"

            let div2 = document.createElement('div')
            headAfter.appendChild(div2)
            div2.classList.add('vacay', classList[i - 1])
            div2.style.top = vacayTop - i3 + 'px'
            div2.innerHTML = "vacay"
        }

        let div = document.createElement('div')
        headBefore.appendChild(div)
        div.classList.add('turn')
        div.innerHTML = "Turn your"

        let div2 = document.createElement('div')
        headAfter.appendChild(div2)
        div2.classList.add('into')
        div2.innerHTML = "Into"

        subhead.innerHTML = "Get <span class=\'bold\'>MORE <\/span> beach, <span class=\'bold\'>MORE <\/span> fun times<br> with friends, for <span class=\'bold\'>LESS<\/span>!"
        person.innerHTML = "/ PERSON"
        price.innerHTML = 549
        text.innerHTML = "All-Inclusive Vacations<br> for as low as"
        cta.innerHTML = 'Book Now'

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
        const whiteChars = new SplitText('.staycay.white', { type: 'chars' })
        const pinkChars = new SplitText('.staycay.pink', { type: 'chars' })
        const yellowChars = new SplitText('.staycay.yellow', { type: 'chars' })
        const aquaChars = new SplitText('.staycay.aqua', { type: 'chars' })

        const white2Chars = new SplitText('.vacay.white', { type: 'chars' })
        const pink2Chars = new SplitText('.vacay.pink', { type: 'chars' })
        const yellow2Chars = new SplitText('.vacay.yellow', { type: 'chars' })
        const aqua2Chars = new SplitText('.vacay.aqua', { type: 'chars' })

        const turn = select('.turn')
        const into = select('.into')

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

            .to(objLevel, { level: 20, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>2')
            .to(objLevel, { level: 78, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, { level: 20, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, { level: 78, ease: "sine.inOut", duration: 1.7, onUpdate: function () { updateLevelG() } }, '>1.7')
            .to(objLevel, {
                level: 50, ease: "sine.inOut", duration: 1.3, onUpdate: function () { updateLevelG() }, onComplete: function () {
                    state = 1;
                }
            }, '>1.5')

        tl
            .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

            .from(turn, { duration: 0.85, x: '-=30', alpha: 0, ease: 'elastic' })
            .revealText(whiteChars.chars, '>-0.4')
            .revealText(pinkChars.chars, '<0.04')
            .revealText(yellowChars.chars, '<0.04')
            .revealText(aquaChars.chars, '<0.04')

            .from(into, { duration: 0.85, x: '-=30', alpha: 0, ease: 'elastic' }, '>1')
            .revealText(white2Chars.chars, '>-=0.4')
            .revealText(pink2Chars.chars, '<0.04')
            .revealText(yellow2Chars.chars, '<0.04')
            .revealText(aqua2Chars.chars, '<0.04')

            .from(subhead, { alpha: 0 }, '>1.5')
    }
}