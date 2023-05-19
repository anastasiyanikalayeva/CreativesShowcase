"use strict"
window.onload = function () {
  politeInit()

  async function politeInit() {
    const select = (s) => document.querySelector(s)

    // Setting variables
    const tl = gsap.timeline()
    const textWrap = select('#textWrap')
    const headline = select('.headline')
    const subheadline = select('.subheadline')

    const cta = select('#cta')
    const wrect = select('#wrect')
    const image = select('#image')

    headline.innerHTML = "FULLY<br> VACCINATE<br>\n<span class=\'blue\'>A CHILD<br> FOR LIFE<\/span>";
    subheadline.innerHTML = "Help provide lifesaving<br> vaccines to children<br> around the world with<br> a UNICEF Inspired Gift.";
    cta.innerHTML = "Brighten Futures";

    const headlineSplitted = new SplitText(headline, { type: "lines, words, chars" });
    const subheadlineSplitted = new SplitText(subheadline, { type: "lines, words, chars" });
    const blueLetters = select('.blue')
    const blueLettersSplitted = new SplitText(blueLetters, { type: "words, chars" });

    // Loading images
    const imagesSrc = [
      {
        name: 'img',
        src: "img.jpg"
      }
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

    image.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 160 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
            <defs>
              <clipPath id="clip-0">
                <path style="fill: rgb(0,192,244);" class="st0" d="M 136.026 278.771 C 136.08 284.795 136.134 290.819 136.187 296.842 C 125.455 296.842 114.72 296.842 103.987 296.842 C 103.934 290.819 103.88 284.795 103.826 278.771 C 114.559 278.771 125.294 278.771 136.026 278.771 M 157.866 278.771 C 158.077 302.493 158.287 326.218 158.498 349.94 C 153.2 349.94 147.901 349.94 142.603 349.94 C 142.392 326.218 142.181 302.493 141.971 278.771 C 147.27 278.771 152.568 278.771 157.866 278.771 M 196.011 278.771 C 196.065 284.795 196.119 290.819 196.172 296.842 C 185.439 296.842 174.705 296.842 163.972 296.842 C 163.919 290.819 163.865 284.795 163.811 278.771 C 174.544 278.771 185.278 278.771 196.011 278.771 M 109.456 302.788 C 118.363 302.788 127.272 302.788 136.181 302.788 C 136.321 318.506 136.461 334.223 136.599 349.94 C 128.868 349.94 121.137 349.94 113.406 349.94 C 112.089 334.223 110.772 318.506 109.456 302.788 M 164.025 302.788 C 172.914 302.788 181.802 302.788 190.691 302.788 C 189.634 318.506 188.577 334.223 187.518 349.94 C 179.827 349.94 172.134 349.94 164.443 349.94 C 164.304 334.223 164.164 318.506 164.025 302.788 M 141.077 250.809 C 148.945 250.809 156.813 250.809 164.682 250.809 C 160.592 258.598 156.501 266.389 152.409 274.178 C 150.191 274.178 147.975 274.178 145.757 274.178 C 144.198 266.389 142.636 258.598 141.077 250.809 M 156.058 274.178 C 159.827 269.725 163.594 265.271 167.36 260.817 C 169.265 263.034 171.168 265.251 173.071 267.469 C 167.4 269.705 161.73 271.943 156.058 274.178 M 137.402 261.229 C 135.127 263.661 132.853 266.095 130.579 268.527 C 134.676 270.411 138.775 272.295 142.872 274.178 C 141.049 269.863 139.225 265.545 137.402 261.229" id="light"></path>
                </clipPath>
              <mask id="mask-0">
                <path style="fill: rgb(0,192,244);" class="st0" d="M 136.026 278.771 C 136.08 284.795 136.134 290.819 136.187 296.842 C 125.455 296.842 114.72 296.842 103.987 296.842 C 103.934 290.819 103.88 284.795 103.826 278.771 C 114.559 278.771 125.294 278.771 136.026 278.771 M 157.866 278.771 C 158.077 302.493 158.287 326.218 158.498 349.94 C 153.2 349.94 147.901 349.94 142.603 349.94 C 142.392 326.218 142.181 302.493 141.971 278.771 C 147.27 278.771 152.568 278.771 157.866 278.771 M 196.011 278.771 C 196.065 284.795 196.119 290.819 196.172 296.842 C 185.439 296.842 174.705 296.842 163.972 296.842 C 163.919 290.819 163.865 284.795 163.811 278.771 C 174.544 278.771 185.278 278.771 196.011 278.771 M 109.456 302.788 C 118.363 302.788 127.272 302.788 136.181 302.788 C 136.321 318.506 136.461 334.223 136.599 349.94 C 128.868 349.94 121.137 349.94 113.406 349.94 C 112.089 334.223 110.772 318.506 109.456 302.788 M 164.025 302.788 C 172.914 302.788 181.802 302.788 190.691 302.788 C 189.634 318.506 188.577 334.223 187.518 349.94 C 179.827 349.94 172.134 349.94 164.443 349.94 C 164.304 334.223 164.164 318.506 164.025 302.788 M 141.077 250.809 C 148.945 250.809 156.813 250.809 164.682 250.809 C 160.592 258.598 156.501 266.389 152.409 274.178 C 150.191 274.178 147.975 274.178 145.757 274.178 C 144.198 266.389 142.636 258.598 141.077 250.809 M 156.058 274.178 C 159.827 269.725 163.594 265.271 167.36 260.817 C 169.265 263.034 171.168 265.251 173.071 267.469 C 167.4 269.705 161.73 271.943 156.058 274.178 M 137.402 261.229 C 135.127 263.661 132.853 266.095 130.579 268.527 C 134.676 270.411 138.775 272.295 142.872 274.178 C 141.049 269.863 139.225 265.545 137.402 261.229"  id="box2"></path>
                </mask>
            </defs>
            <rect width="160" height="600" style="fill: rgb(0, 0, 0);"></rect>
            <image width="160" height="600" style="clip-path: url(#clip-0);" xlink:href="${imagesSrc[0].src}"></image>
            <path style="fill: rgb(0,192,244);" class="st0" d="M 136.026 278.771 C 136.08 284.795 136.134 290.819 136.187 296.842 C 125.455 296.842 114.72 296.842 103.987 296.842 C 103.934 290.819 103.88 284.795 103.826 278.771 C 114.559 278.771 125.294 278.771 136.026 278.771 M 157.866 278.771 C 158.077 302.493 158.287 326.218 158.498 349.94 C 153.2 349.94 147.901 349.94 142.603 349.94 C 142.392 326.218 142.181 302.493 141.971 278.771 C 147.27 278.771 152.568 278.771 157.866 278.771 M 196.011 278.771 C 196.065 284.795 196.119 290.819 196.172 296.842 C 185.439 296.842 174.705 296.842 163.972 296.842 C 163.919 290.819 163.865 284.795 163.811 278.771 C 174.544 278.771 185.278 278.771 196.011 278.771 M 109.456 302.788 C 118.363 302.788 127.272 302.788 136.181 302.788 C 136.321 318.506 136.461 334.223 136.599 349.94 C 128.868 349.94 121.137 349.94 113.406 349.94 C 112.089 334.223 110.772 318.506 109.456 302.788 M 164.025 302.788 C 172.914 302.788 181.802 302.788 190.691 302.788 C 189.634 318.506 188.577 334.223 187.518 349.94 C 179.827 349.94 172.134 349.94 164.443 349.94 C 164.304 334.223 164.164 318.506 164.025 302.788 M 141.077 250.809 C 148.945 250.809 156.813 250.809 164.682 250.809 C 160.592 258.598 156.501 266.389 152.409 274.178 C 150.191 274.178 147.975 274.178 145.757 274.178 C 144.198 266.389 142.636 258.598 141.077 250.809 M 156.058 274.178 C 159.827 269.725 163.594 265.271 167.36 260.817 C 169.265 263.034 171.168 265.251 173.071 267.469 C 167.4 269.705 161.73 271.943 156.058 274.178 M 137.402 261.229 C 135.127 263.661 132.853 266.095 130.579 268.527 C 134.676 270.411 138.775 272.295 142.872 274.178 C 141.049 269.863 139.225 265.545 137.402 261.229" id="box"></path>
            <rect id='overlay' width="160" height="600" style="opacity: 0.5; fill: rgb(0,192,244);  mask: url(#mask-0);"></rect>
          </svg>
      `)

    // Animation
    tl
      .set(subheadlineSplitted.lines, { overflow: 'hidden' })
      .set(blueLettersSplitted.chars, { transformPerspective: 200 })
      .set(["#light", "#box", '#box2'], { x: '-=70', scale: 1 })

      // FRAME 1
      .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })
      .fromTo(["#box", "#light", "#box2"], { y: '-=150' }, { y: 0, duration: 1, ease: "power1.in" }, '<')
      .to(["#light", "#box", '#box2'], { yPercent: -1200, scale: 45, transformOrigin: "50% 50%", duration: 2, ease: "power2.in" }, ">-0.2")
      .to("#box", { alpha: 0, duration: 0.4 }, "<0.1")

      .from(headlineSplitted.lines, { alpha: 0, y: '30px', rotationZ: "20", transformOrigin: "0% 50%", stagger: 0.2 }, ">")
      .fromTo(subheadlineSplitted.words, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, force3D: true, rotation: 0.01 }, ">-0.05")
      .to('#overlay', { alpha: 0, duration: 3.5 }, "<")
      .to(blueLettersSplitted.chars, { duration: 1.2, color: '#00bdf2', rotationY: 360, ease: "back(2)", stagger: { amount: 1, ease: "power2.in" } }, '>-1.2')

      .to(textWrap, { alpha: 0, duration: 1 }, ">3")
      .to(["#light", "#box", '#box2'], { yPercent: 0, y: 0, scale: 1, transformOrigin: "50% 50%", duration: 1.4, ease: "power1.out" }, "<-0.4")
      .to("#box", { alpha: 1, duration: 0.7 }, ">-0.8")

      .set([subheadlineSplitted.words, headlineSplitted.lines], { alpha: 0 })
      .set(blueLettersSplitted.chars, { color: '#fff' })
      .set([textWrap, '#overlay'], { alpha: 1 })

      // FRAME 2
      .to(["#light", "#box", '#box2'], { yPercent: -1200, scale: 45, transformOrigin: "50% 50%", duration: 2, ease: "power2.in" }, ">1")
      .to("#box", { alpha: 0, duration: 0.4 }, "<0.1")

      .fromTo(headlineSplitted.lines, { alpha: 0, y: '30px', rotationZ: "20", transformOrigin: "0% 50%" }, { y: 0, alpha: 1, rotationZ: "0", stagger: 0.2 }, ">")
      .fromTo(subheadlineSplitted.words, { y: 20, alpha: 0 }, { y: 0, alpha: 1, stagger: 0.1, duration: 0.5, force3D: true, rotation: 0.01 }, ">-0.05")
      .to('#overlay', { alpha: 0, duration: 3.5 }, "<")
      .to(blueLettersSplitted.chars, { duration: 1.2, color: '#00bdf2', rotationY: '+=360', ease: "back(2)", stagger: { amount: 1, ease: "power2.in" } }, '>-1.2')

  }
}