"use strict"

/* smoke.js */

class Smoke {

    constructor(options) {
        const defaults = {
            width: 300,
            height: 600,
        };


        Object.assign(this, options, defaults);
        this.onResize = this.onResize.bind(this);

        this.addEventListeners();
        this.init();
    }

    init() {
        const { width, height } = this;

        this.clock = new THREE.Clock();

        const renderer = this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });

        renderer.setSize(width, height);

        this.scene = new THREE.Scene();

        const meshGeometry = new THREE.BufferGeometry();
        const meshMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: false
        });
        this.mesh = new THREE.Mesh(meshGeometry, meshMaterial);

        this.cubeSineDriver = 0;

        this.addCamera();
        this.addLights();
        this.addParticles();
    }

    evolveSmoke(delta) {
        const { smokeParticles } = this;

        let smokeParticlesLength = smokeParticles.length;

        while (smokeParticlesLength--) {
            smokeParticles[smokeParticlesLength].rotation.z += delta * .6;
        }
    }

    addLights() {
        const { scene } = this;
        const light = new THREE.DirectionalLight(0xffffff, 1.4);

        light.position.set(1, 1, 2.2);
        scene.add(light);

    }

    addCamera() {
        const { scene } = this;
        const camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);

        camera.position.z = 1000;
        scene.add(camera);
    }

    addParticles() {
        const { scene } = this;
        const textureLoader = new THREE.TextureLoader();
        const smokeParticles = this.smokeParticles = [];

        textureLoader.load('c2.png', texture => {
            const smokeMaterial = new THREE.MeshLambertMaterial({
                color: 0x70a8bf,
                map: texture,
                transparent: true
            });

            smokeMaterial.map.minFilter = THREE.LinearFilter;
            const smokeGeometry = new THREE.PlaneBufferGeometry(300, 300);

            const smokeMeshes = [];
            let limit = 75;

            while (limit--) {
                smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
                smokeMeshes[limit].position.set(Math.random() * 700 - 200, Math.random() * 500 - 250, Math.random() * 300 + 400);
                smokeMeshes[limit].rotation.z = Math.random() * 60;
                smokeParticles.push(smokeMeshes[limit]);
                scene.add(smokeMeshes[limit]);
            }
        });
    }

    render() {
        const { mesh } = this;
        let { cubeSineDriver } = this;

        cubeSineDriver += 0.01;

        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        mesh.position.z = 100 + Math.sin(cubeSineDriver) * 300;

        this.renderer.render(this.scene, this.camera);
    }

    update() {
        this.evolveSmoke(this.clock.getDelta());
        this.render();

        if (this.clock.elapsedTime < 25)
            requestAnimationFrame(this.update.bind(this));
    }

    onResize() {
        const { camera } = this;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        camera.aspect = windowWidth / windowHeight;
        camera.updateProjectionMatrix();

        this.renderer.setSize(windowWidth, windowHeight);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize);
    }

}



window.onload = function () {
    politeInit()

    async function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        const wrapper = select('#wrapper')
        const wrect = select('#wrect')
        const cta = select('#cta')
        const headline = select("#headline")
        const subheadline = select("#subheadline")
        const fog = select('#fog')
        let imagesSrc = []
        cta.innerHTML = "CONTINUE GIVING"
        headline.innerHTML = "Protect Them<br>From Further Harm"
        let s = "Donate now to continue helping UNICEF scale up lifesaving programs for the children and women fleeing the violence in Ukraine."
        s = s.split('<br>').join(" ")
        subheadline.innerHTML = s

        let ob = {}
        ob.name = "img"
        ob.src = "img.jpg"
        imagesSrc.push(ob)

        const smoke = new Smoke({ width: wrapper.offsetWidth, height: wrapper.offsetHeight, canvas: fog });

        smoke.update();

        const logo = select('#logo')
        const getSVG = await fetch("logo.svg")
        const svg = await getSVG.text()
        logo.insertAdjacentHTML("afterbegin", svg)

        // Loading images
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


        // Animating
        const tl = gsap.timeline()

        const img = select("#img")
        let lines = []

        const alert = select("#alert")
        const innerCta = select("#innerCta")

        const headlineChars = new SplitText(headline, { type: "words, chars" })
        const subheadlineChars = new SplitText(subheadline, { type: "words, chars" })

        for (let i = 0; i < 3; i++) {
            lines[i] = selectAll(".pl" + i)

            let counter = 0
            let ex = false
            for (let c = 0; c < lines[i].length; c++) {
                const words = lines[i][c].innerHTML.split(" ")
                let ah = addHighlights(words, counter, hws[i].hw, ex)
                ex = ah.isFrom
                lines[i][c].innerHTML = ah.s
                counter += words.length
            }
        }

        headlineChars.chars.sort(() => Math.random() - 0.5);
        subheadlineChars.chars.sort(() => Math.random() - 0.5);

        const mY = 99

        tl
            .to(wrect, { duration: 1, alpha: 0, ease: "none" })

            .set(headlineChars.chars, { rotation: .001 })
            .set(subheadlineChars.chars, { rotation: .001, y: mY })

            .fromTo(alert, { alpha: 0, scaleX: .1 }, { alpha: 1, scaleX: 1, duration: .5 }, '>')
            .from(innerCta, { duration: .6, alpha: 0 }, '>')

            .from(headlineChars.chars, { duration: 2.1, stagger: .03, y: 20, force3D: true, filter: "blur(10px)", ease: "power2.inOut", alpha: 0 }, '<')

            .to(headlineChars.chars, { y: mY, duration: 1.1, ease: "power2.inOut" }, '>2')
            .to(alert, { y: mY, duration: 1.1, ease: "power2.inOut" }, '<.1')
            .fromTo(subheadlineChars.chars, { y: mY + 20, filter: "blur(5px)", force3D: true, alpha: 0 }, { duration: 2.1, filter: "blur(0px)", stagger: .02, y: mY, alpha: 1, ease: "power2.inOut" }, '>')
            .fromTo(img, { alpha: 0 }, { duration: 3.1, alpha: .96, ease: "sine.inOut" }, '<.1')
            .to(fog, { alpha: .2, duration: 3.1, ease: "sine.inOut" }, '<')

            .from(ctaWrap, { duration: .9, alpha: 0, ease: "power2.inOut" }, '>')
    }
}