"use strict"
window.onload = function () {
    politeInit()

    function random(v) {
        return Math.floor(Math.random() * v);
    }

    function randomB(v) {
        if (random(2)) {
            return random(v);
        } else {
            return -random(v);
        }
    }

    async function politeInit() {
        var select = function (s) {
            return document.querySelector(s);
        },
            selectAll = function (s) {
                return document.querySelectorAll(s);
            },

            // Setting variables
            wrect = select('#wrect'),
            cta = select("#cta"),
            txtWrap = select("#txtWrap"),
            imgWrap = select("#imgWrap"),
            october = select("#october"),
            childImage = select("#childImage")
            cta.innerHTML = "Contribute"

        const text = [
            {
                body: "Donate and help every child survive and thrive.",
                time: 2
            }
        ]

        // Duplications for october
        let countOctober = 20;
        const countOctoberOrg = 20;
        let hElement = 0;
        const clipsOctober = [];

        for (let i = 0; i < countOctober; i++) {
            const div = document.createElement('div')
            div.innerHTML = "THIS OCTOBER<br> YOU CAN DO GOOD";
            div.classList.add("divOctober")
            october.appendChild(div)

            if (i == 0) {
                hElement = div.offsetHeight;
            }
        }

        const diff = Math.floor(hElement / countOctober);
        const sdiff = diff - 1;

        clipsOctober[0] = 0;
        for (let i = 1; i < countOctober; i++) {
            clipsOctober[i] = i * diff - random(sdiff);
        }

        const octobers = selectAll('.divOctober')
        for (let i = 0; i < countOctober; i++) {
            if (i < countOctober - 1)
                gsap.set(octobers[i], { clip: "rect(" + clipsOctober[i] + "px,300px," + clipsOctober[i + 1] + "px,0px)" }); else
                gsap.set(octobers[i], { clip: "rect(" + clipsOctober[i] + "px,300px," + hElement + "px,0px)" });
        }

        // Duplications for image
        let countQr = 30;
        let hElementQr = 0;
        const clipsQr = [];

        for (let i = 0; i < countQr; i++) {
            const div = document.createElement('div')
            div.classList.add("childImage")
            childImage.appendChild(div)
        }

        hElementQr = 260

        const diffQr = Math.round(hElementQr / countQr);

        clipsQr[0] = 0;
        for (let i = 1; i < countQr; i++) {
            clipsQr[i] = i * diffQr;
        }

        const qrs = selectAll('.childImage')
        for (let i = 0; i < countQr; i++) {
            if (i < countQr - 1)
                gsap.set(qrs[i], { clip: "rect(" + clipsQr[i] + "px,160px," + clipsQr[i + 1] + "px,0px)" }); else
                gsap.set(qrs[i], { clip: "rect(" + clipsQr[i] + "px,123px," + hElementQr + "px,0px)" });
        }

        // Loading images
        const imagesToLoad = []

        imagesToLoad.push({ name: `bg`, src: "bg.jpg" })
        imagesToLoad.push({ name: `bg2`, src: "bg2.png" })

        const imgDiv = document.createElement('div')
        imgDiv.classList.add('imgBg')
        imgWrap.append(imgDiv)
        gsap.set(imgDiv, { backgroundImage: 'url(' + imagesToLoad[0].src + ')' })

        let maxBodyHeight = 0
        const countX = 3
        const countY = 13
        const offsetW = Math.floor(wrect.offsetWidth / countX);
        const parts = []
        const frames = []

        for (let i = 0; i < 3; i++) {
            const divFrame = document.createElement('div')
            divFrame.classList.add('frame')
            txtWrap.append(divFrame)

            frames[i] = divFrame

            maxBodyHeight = 0
            parts[i] = []
            for (let x = 0; x < countX * countY; x++) {
                const divBody = document.createElement('div')
                divBody.classList.add('body')
                divBody.classList.add('body' + i)
                parts[i][x] = divBody
                divFrame.append(divBody)
                divBody.innerHTML = text[0].body.split("\n").join("<br>")
                if (divBody.offsetHeight > maxBodyHeight) {
                    maxBodyHeight = divBody.offsetHeight
                }
            }

            const offsetH = Math.round(maxBodyHeight / countY) + 1;

            gsap.set(divFrame, { alpha: 0 })

            for (let y = 0; y < countY; y++) {
                for (let x = 0; x < countX; x++) {
                    gsap.set(parts[i][x + y * countX], { clip: "rect(" + (y * offsetH) + "px," + ((x + 1) * offsetW) + "px," + ((y + 1) * offsetH) + "px," + (x * offsetW) + "px)" });
                }
            }
        }

        const loadImages = async (srcsArr) => {
            const imagesArr = await Promise.all(srcsArr.map((img) => {
                return new Promise((resolve) => {
                    const image = new Image()

                    image.nameImg = img.name
                    image.src = img.src
                    img.img = image
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

        const canvasEdges = document.getElementById('canvasEdges')
        const ctxEdges = canvasEdges.getContext('2d')
        ctxEdges.drawImage(imagesToLoad[1].img, 0, 0, canvasEdges.width, canvasEdges.height)


        // Animation
        const tl = gsap.timeline(),
            tlOctober = gsap.timeline({ paused: true }),
            stepsAnim = [0, 0, 0],
            partsObj = [],

            waves = [
                {
                    working: "no",
                    index: 0,
                    counter: 0,
                    counterMax: 1
                }
            ],
            octoberAnim = { level: 0, currentLevel: 0, oldLevel: 0 }

        let currentFrame = 0
        let ready = 0

        for (let i = 0; i < parts.length; i++) partsObj[i] = { level: 0 }

        tlOctober
            .to(octoberAnim, {
                duration: .6, level: 20, ease: "none", onUpdate: function () {
                    octoberAnim.currentLevel = Math.floor(octoberAnim.level);
                    if (octoberAnim.currentLevel < 20) {

                        if (octoberAnim.currentLevel != octoberAnim.oldLevel) {

                            for (let i = 0; i < countOctoberOrg; i++) {
                                gsap.set(octobers[i], { clip: "rect(0px,0px,0px,0px)" });
                            }
                            countOctober = random(countOctoberOrg)
                            if (countOctober < 4) countOctober = 4;

                            clipsOctober[0] = 0;
                            for (let i = 1; i < countOctober; i++) {
                                clipsOctober[i] = i * diff - random(sdiff);
                            }
                            for (let i = 0; i < countOctober; i++) {
                                if (i < countOctober - 1)
                                    gsap.set(octobers[i], { clip: "rect(" + clipsOctober[i] + "px,300px," + clipsOctober[i + 1] + "px,0px)" }); else
                                    gsap.set(octobers[i], { clip: "rect(" + clipsOctober[i] + "px,300px," + hElement + "px,0px)" });
                            }

                            for (let i = 0; i < countOctober; i++) {
                                gsap.set(octobers[i], { x: randomB(6), y: randomB(1), scaleY: 1 - .1 * random(10) / 10, scaleX: 1 - .1 * random(10) / 10 });
                            }
                        }

                        octoberAnim.oldLevel = octoberAnim.currentLevel
                    } else {
                        if (octoberAnim.currentLevel != octoberAnim.oldLevel) {
                            for (let i = 0; i < countOctober; i++) {
                                gsap.set(octobers[i], { x: 0, scaleX: 1, scaleY: 1, rotation: 0, y: 0 });
                            }
                            octoberAnim.oldLevel = octoberAnim.currentLevel
                        }
                    }
                }
            })

        function updateQr() {
            for (let i = 0; i < countQr; i += 2) {
                const skX = randomB(17)
                gsap.set(qrs[i], { skewX: skX, skewY: randomB(7), x: randomB(12) });
                gsap.set(qrs[i + 1], { skewX: -skX, skewY: randomB(5), x: randomB(11) });
            }
        }

        let qrMax = { level: 1 }

        function extraQr() {
            for (let i = 0; i < countQr; i += 2) {
                const skX = randomB(Math.floor(17 * qrMax.level) + 1)
                gsap.set(qrs[i], { skewX: skX, skewY: randomB(Math.floor(7 * qrMax.level) + 1), x: randomB(Math.floor(7 * qrMax.level) + 1) });
                gsap.set(qrs[i + 1], { skewX: -skX, skewY: randomB(Math.floor(5 * qrMax.level) + 1), x: randomB(Math.floor(11 * qrMax.level) + 1) });
            }
        }

        function resetQr() {
            qrMax.level = 1
            for (let i = 0; i < countQr; i++) {
                if (i == 0)
                    gsap.set(qrs[i], { clip: "rect(0px,160px,268px,0px)" }); else
                    gsap.set(qrs[i], { clip: "rect(0px,0px,0px,0px)" });


                gsap.set(qrs[i], { skewX: 0, x: 0, y: 0, skewY: 0 });
            }
        }

        function animateQr(idImg) {
            for (let i = 0; i < countQr; i++) {
                if (i < countQr - 1)
                    gsap.set(qrs[i], { clip: "rect(" + clipsQr[i] + "px,515px," + clipsQr[i + 1] + "px,0px)" }); else
                    gsap.set(qrs[i], { clip: "rect(" + clipsQr[i] + "px,515px," + hElementQr + "px,0px)" });

                gsap.set(qrs[i], { backgroundImage: 'url(img' + idImg + '.png)' })
            }
        }

        function completeQr() {
            const tlEx = gsap.timeline()
            tlEx

                .to(qrMax, {
                    level: 0, duration: .5, onUpdate: extraQr, onComplete: function () {
                        resetQr();
                    }
                })

                //second animation
                .to(qrMax, {
                    level: 0, duration: 1.2, onStart: function () {
                        animateQr(2);
                    }, onUpdate: extraQr, onComplete: function () {
                        resetQr();
                    }
                }, '>2.5') //delay between first and 2nd image


                //third animation
                .to(qrMax, {
                    level: 0, duration: 1.2, onStart: function () {
                        animateQr(3);
                    }, onUpdate: extraQr, onComplete: function () {
                        resetQr();
                    }
                }, '>2.5') //delay between 2nd and 3rd image
        }

        gsap.ticker.add(updateFrames);
        gsap.ticker.fps(30);

        let freq = 0

        function updateFrames() {
            const index = currentFrame;

            if (ready) {
                for (let i = 0; i < parts[index].length; i++) {
                    gsap.set(parts[index][i], { x: 0, scaleX: 1, scaleY: 1, rotation: 0, y: 0, skewX: 0 });
                }
                gsap.ticker.remove(updateFrames);
            } else {

                if (partsObj[index].level > 0 && partsObj[index].level < 1) {
                    for (let i = 0; i < parts[index].length; i++) {
                        gsap.set(parts[index][i], { x: randomB(12), y: randomB(2), skewX: randomB(20), scaleY: 1 + .1 * (randomB(5) / 5) });
                    }
                } else {
                    if (!stepsAnim[index] && partsObj[index].level == 1) {
                        for (let i = 0; i < parts[index].length; i++) {
                            gsap.set(parts[index][i], { x: 0, scaleX: 1, scaleY: 1, rotation: 0, y: 0, skewX: 0 });
                        }
                        stepsAnim[index]++;
                        waves[0].working = "no"
                    } else {
                        //animation in loop
                        if (waves[0].working == "no") {
                            if (random(5) == 1) waves[0].working = "yes"
                        }

                        for (let w = 0; w < waves.length; w++) {

                            if (waves[w].working == "yes") {
                                if (waves[w].counter < waves[w].counterMax) {
                                    waves[w].counter++;
                                } else {
                                    waves[w].counter = 0;
                                    waves[w].index++;
                                    if (waves[w].index == countY) {
                                        waves[w].index = 0;
                                        waves[w].counter = -20;
                                        waves[w].working = "delay"

                                        //without-glitch

                                        for (let y = 0; y < countY; y++) {
                                            for (let x = 0; x < countX; x++) {
                                                gsap.set(parts[index][y * countX + x], { x: 0, scaleX: 1, scaleY: 1, rotation: 0, y: 0, skewX: 0 });
                                            }
                                        }
                                    } else {
                                        for (let y = 0; y < countY; y++) {
                                            for (let x = 0; x < countX; x++) {
                                                if (y != waves[w].index) {
                                                    if (random(6)) gsap.set(parts[index][y * countX + x], { x: 0, scaleX: 1, scaleY: 1, rotation: 0, y: 0, skewX: 0 }); else
                                                        gsap.set(parts[index][y * countX + x], { x: randomB(2) });
                                                } else {
                                                    gsap.set(parts[index][y * countX + x], { x: randomB(2), skewX: randomB(20) });
                                                }

                                            }
                                        }
                                    }
                                }
                            }

                            if (waves[w].working == "delay") {
                                if (waves[w].counter < waves[w].counterMax) {
                                    waves[w].counter++;
                                } else {
                                    waves[w].working == "yes"
                                }
                            }

                        }

                    }
                }
            }

            if (freq > random(3) + 5) {
                ctxEdges.clearRect(0, 0, canvasEdges.width, canvasEdges.height);

                const hEdges = canvasEdges.height
                const wEdges = canvasEdges.width
                const limit = Math.floor(canvasEdges.width / 2)
                let posH

                for (let s = 0; s < 2; s++) { //sides
                    posH = 0
                    while (posH < hEdges) {
                        let h = 4
                        if (!h) h = 1
                        posH += h
                        let mx = random(4)
                        let my = randomB(2)

                        if (random(5) == 1) {
                            if (!s)
                                ctxEdges.drawImage(imagesToLoad[1].img, 0, posH, limit, h, -mx, posH + my, limit, h); else
                                ctxEdges.drawImage(imagesToLoad[1].img, wEdges - limit, posH, limit, h, wEdges - limit + mx, posH + my, limit, h);
                        } else {
                            if (!s)
                                ctxEdges.drawImage(imagesToLoad[1].img, 0, posH, limit, h, 0, posH, limit, h); else
                                ctxEdges.drawImage(imagesToLoad[1].img, wEdges - limit, posH, limit, h, wEdges - limit, posH, limit, h);
                        }
                    }
                }
                freq = 0
            } else {
                freq++
            }

        }


        tl
            .to(wrect, { duration: .6, alpha: 0 })
            .from(october, {
                duration: .9, alpha: 0, onStart: () => {
                    tlOctober.play()
                }
            }, '>')
            .to(frames[0], { alpha: 1, duration: .9, ease: "power2" }, '<.5')
            .to(partsObj[0], { level: 1, duration: .5, ease: "none" }, '<')

            .from(cta, { duration: 1, alpha: 0 }, '<.2')

            .from(childImage, { alpha: 0, duration: .5, onUpdate: updateQr, onComplete: completeQr, ease: "expo" }, '<.5')

            .from(october, {
                duration: .9, onStart: () => {
                    tlOctober.restart()
                }
            }, '>3')

            .set(frames[0], { alpha: 0 }, '<')
            .set(partsObj[0], { level: 0, onComplete: function () { currentFrame = 1; } }, '<')

            .set(frames[1], { alpha: 1 }, '<')
            .to(partsObj[1], { level: 1, duration: .3, ease: "none" }, '<')


            .from(october, {
                duration: .9, onStart: () => {
                    tlOctober.restart()
                }
            }, '>3.3')

            .set(frames[1], { alpha: 0 }, '<')
            .set(partsObj[1], { level: 0, onComplete: function () { currentFrame = 2; } }, '<')

            .to(frames[2], { alpha: 1, ease: "power2" }, '<')
            .to(partsObj[2], {
                level: 1, duration: .3, ease: "none", onComplete: () => {
                    gsap.delayedCall(5, () => {
                        ready = 1
                    })
                }
            }, '<')
    };
}
