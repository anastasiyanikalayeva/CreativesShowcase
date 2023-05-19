"use strict"

window.onload = function () {
    politeInit();

    // Setting variables
    function politeInit() {

        let select = function (s) {
            return document.querySelector(s);
        },
            selectAll = function (s) {
                return document.querySelectorAll(s);
            },
            wrapper = select('#wrapper'),
            cta = select('#cta'),
            wrect = select('#wrect'),
            headlines = selectAll('.headline'),
            lastTxt = selectAll('.lastTxt'),
            lastBold = select('.lastBold'),
            textTop = select('#textTop'),
            imagesCont = select('#images'),
            images = [],
            imagesSrc = ['img1.jpg', 'img2.jpg', 'img3.jpg'],
            logo = select('#logo'),
            closeIcon = select('.close-icon'),
            hand = select('#hand'),
            tlCards = gsap.timeline(),
            tlHand = gsap.timeline(),
            tlHandler = gsap.timeline(),
            tlEnd = gsap.timeline(),
            tlMain = gsap.timeline({ paused: true });

        let interaction = 0
        let enabled = 1
        let ctaVisible = 0
        let closeButtonEnabled = 0
        let currentCard = -1
        let handAnimationStage = 0
        let handlerAnimation = 0
        let endAnimation = 0

        let splitTextTop = new SplitText(textTop, { type: "words, chars" });
        let splitlastBold = new SplitText(lastBold, { type: "words, chars" });

        // Loading images
        preloadImages(imagesSrc, imagesPreloaded)


        function preloadImages(arrayWithImages, callback) {
            let img
            let remaining = arrayWithImages.length

            for (let i = 0; i < arrayWithImages.length; i++) {

                img = new Image()
                img.onload = function () {
                    --remaining
                    if (remaining <= 0) {
                        callback()
                    }
                }

                img.src = arrayWithImages[i]
                images[i] = img
            }
        }

        function imagesPreloaded() {

            for (let i = 0; i < images.length; i++) {
                const imgDiv = document.createElement('div')

                imgDiv.classList.add('img')
                imgDiv.style.background = `url('${images[i].src}') no-repeat`

                imagesCont.append(imgDiv)
            }

            animate()
        }

        // Animation
        function animate() {

            const imagesElem = selectAll('.img');

            gsap.registerEffect({
                name: "fadeIn",
                effect: (targets, config) => {
                    let tlEffect = gsap.timeline();
                    tlEffect.from(targets, { duration: config.duration, x: config.x, alpha: 0, ease: "back" })
                    return tlEffect;
                },
                defaults: { duration: 1, x: "+=45" },
                extendTimeline: true,
            });

            gsap.registerEffect({
                name: "fadeOut",
                effect: (targets, config) => {
                    let tlEffect = gsap.timeline();
                    tlEffect.to(targets, { duration: config.duration, x: config.x, alpha: 0, ease: "back" })
                    return tlEffect;
                },
                defaults: { duration: 1, x: "+=40" },
                extendTimeline: true,
            });
            let cards = Array.prototype.slice.call(document.getElementsByClassName('slider-item'));

            slide1.addEventListener('click', function () { handler(0); });
            slide2.addEventListener('click', function () { handler(1); });
            slide3.addEventListener('click', function () { handler(2); });

            slide1.addEventListener('mouseover', handlerHover);
            slide2.addEventListener('mouseover', handlerHover);
            slide3.addEventListener('mouseover', handlerHover);

            let tlHover = gsap.timeline();

            function handlerHover(x) {
                tlHover
                    .to(x.currentTarget, { duration: 0.5, scale: 1.05, repeat: 1, yoyo: true, ease: 'sine.out' });
            }

            closeIcon.addEventListener('click', showEnd);

            function showEnd() {
                if (closeButtonEnabled) {
                    closeButtonEnabled = 0
                    const x = currentCard

                    if (handlerAnimation) {
                        tlHandler.pause()
                    }

                    enabled = 1

                    endAnimation = 1

                    tlEnd.clear()
                    tlEnd
                        .to([headlines[x], splitTextTop.chars], { alpha: 0, x: 0, ease: "power1" })
                        .to(imagesElem[x], { duration: 0.8, alpha: 0, ease: "none" }, '<')
                        .to(cards, { alpha: 1, delay: .4, duration: .6, display: "power1.out" }, '<.1')
                        .to(closeIcon, {
                            duration: .6, alpha: 0, onComplete: () => {
                                gsap.set(closeIcon, { display: "none" })
                            }
                        }, '<')
                        .fromTo(splitlastBold.chars, { x: 40, alpha: 0 }, { duration: 0.7, delay: .5, stagger: 0.03, x: 0, alpha: 1, ease: "power3" }, '<')
                        .fromTo(lastTxt, { alpha: 0, x: 0 }, {
                            duration: 1, alpha: 1, x: 0, ease: "power1", onComplete: () => {
                                endAnimation = 0
                            }
                        }, '<.5')

                    tlEnd.restart()
                    tlEnd.play()
                }
            }

            function handler(x) {
                if (enabled) {
                    enabled = 0
                    interaction = 1
                    closeButtonEnabled = 1
                    currentCard = x

                    tlCards.pause();

                    if (!ctaVisible) {
                        ctaVisible = true
                        gsap.to(cta, { alpha: 1, ease: "none" })
                    }

                    if (endAnimation) {
                        tlEnd.pause()
                    }

                    handlerAnimation = 1

                    tlHandler.clear()

                    tlHandler
                        .to(cards, { alpha: 0, duration: .6, display: "power1.out" })
                        .to([splitlastBold.chars, lastTxt], { alpha: 0 }, '<')
                        .to(cta, { alpha: 1 }, '<')
                        .to(imagesElem[x], { duration: 0.8, alpha: 1, ease: "none" }, '<')
                        .fromTo(splitTextTop.chars, { x: 40, alpha: 0 }, { duration: 0.7, delay: .5, stagger: 0.03, x: 0, alpha: 1, ease: "power3" }, '<.1')
                        .to(closeIcon, { duration: 1, display: "inline-block", alpha: 1, ease: "back" }, '<')
                        .fromTo(headlines[x], { alpha: 0, x: 0 }, {
                            duration: 1, alpha: 1, x: 0, ease: "power1", onComplete: () => {
                                handlerAnimation = 0
                            }
                        }, '<.5')

                    tlHandler.restart()
                    tlHandler.play()
                }
            }

            function sliderAnim(array) {
                let tlNew = gsap.timeline();
                tlNew
                    .fromTo(array[0], { x: '0', y: '0', rotation: -14, scale: 0.8 }, { x: '17', y: '165', rotation: 14, scale: 0.8, zIndex: 1 })
                    .fromTo(array[1], { x: '0', y: '90', zIndex: 1 }, { x: '10', y: '-=65', rotation: 9, scale: 0.8, zIndex: 1 }, '<')
                    .to(array[2], { x: '0', y: '95', zIndex: 2, rotation: -8, scale: 1 }, '<')
                    .to(array[2], { duration: 0.7, repeat: 2, zIndex: 2, repeatDelay: 0.02, scale: 0.98, ease: "slow" }, '>0.4');
            }

            function sortArray(array) {
                let firstElem = array.shift();
                array.push(firstElem);
                return sliderAnim(array);
            }

            gsap

            tlCards
                .to(cards, { alpha: 0 })
                .to(imagesElem, { alpha: 0 })
                .to(wrect, { duration: 0.3, alpha: 0, ease: "none" })

                // frame1
                .to(logo, { duration: 0.35, alpha: 1, ease: "none" }, '<')
                .call(sliderAnim, [cards])
                .to(cards, { alpha: 1, duration: 0.3 })
                .call(sortArray, [cards], '<4')
                .from(splitlastBold.chars, { duration: 1, stagger: 0.03, x: "+=20", alpha: 0, ease: "power3" }, ">-3.7")
                .from(lastTxt, { duration: 1, alpha: 0, ease: "none" }, "<0.5")
                .from(cta, {
                    duration: 1, onStart: () => { ctaVisible = 1 }, alpha: 0, ease: "none", onComplete: () => {
                        if (!interaction) {
                            gsap.delayedCall(5, () => {
                                if (!interaction) {
                                    tlMain.play()
                                }
                            })

                        }
                    }
                }, '<.2')



            // frame2
            tlMain
                .to(cards, { alpha: 0, duration: 1, display: "none" })
                .fadeOut(lastTxt, "<.5")
                .fadeOut(splitlastBold.chars, "<")
                .to(imagesElem[0], { duration: 0.8, alpha: 1, ease: "none" }, ">")
                .addLabel("label1", '>-0.7')
                .from(splitTextTop.chars, { duration: 0.7, stagger: 0.03, x: "+=20", alpha: 0, ease: "power3" }, "<")
                .fadeIn(headlines[0], ">-0.5")
                .addLabel("label2")

                // frame3
                .fadeOut(headlines[0], ">2.4")
                .fadeOut(splitTextTop.chars, "<")
                .to(imagesElem[0], { duration: 0.4, alpha: 0, ease: "none" }, "<")
                .addLabel("label3")
                .to(imagesElem[1], { duration: 0.8, alpha: 1, ease: "none" }, "<")
                .to(splitTextTop.chars, { duration: 0.7, stagger: 0.03, x: "-=45", alpha: 1, ease: "power3" }, "<0.5")
                .fadeIn(headlines[1], ">-0.5")
                .addLabel("label4")

                // frame4
                .fadeOut(headlines[1], ">2.4")
                .fadeOut(splitTextTop.chars, "<")
                .to(imagesElem[1], { duration: 0.4, alpha: 0, ease: "none" }, "<")
                .addLabel("label5")
                .to(imagesElem[2], { duration: 0.8, alpha: 1, ease: "none" }, "<")
                .to(splitTextTop.chars, { duration: 0.7, stagger: 0.03, x: "-=42", alpha: 1, ease: "power3" }, "<0.5")
                .fadeIn(headlines[2], ">-0.5")
                .add(() => {
                    gsap.set(cards, { display: "block" })
                    currentCard = 2
                    closeButtonEnabled = 1
                    handAnimationStage = 1
                    showEnd()
                }, '>2.3')
        }

        setInterval(() => {
            if (handAnimationStage == 1) {
                handAnimationStage = 2
                tlHand
                    .to(hand, { duration: 0.6, alpha: 1, ease: "none" }, ">")
                    .to(hand, { duration: 0.6, x: "-=10", y: "-=10", repeat: 5, scale: 0.9, yoyo: true }, "<")
                    .to(hand, {
                        alpha: 0, duration: .5, ease: "none", onComplete: () => {
                            handAnimationStage = 3
                        }
                    }, '>.4')
            }
        }, 100)

        wrapper.addEventListener('mousemove', function () {
            if (handAnimationStage == 2) {
                tlHand.pause()
                gsap.to(hand, { alpha: 0, duration: .5, ease: "none" })
            }
        });
    };
}