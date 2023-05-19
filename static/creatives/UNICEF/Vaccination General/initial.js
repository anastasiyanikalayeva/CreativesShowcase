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

    headline.innerHTML = "A FEW DROPS <br><span class=\'blue\'>CAN SAVE A LIFE<\/span>";
    subheadline.innerHTML = "Help provide lifesaving vaccines<br>to children around the world with<br>a UNICEF Inspired Gift.";
    cta.innerHTML = "Brighten Futures";

    const headlineSplitted = new SplitText(headline, { type: "lines, words, chars" });
    const subheadlineSplitted = new SplitText(subheadline, { type: "lines, words, chars" });
    const blueLetters = select('.blue')
    const blueLettersSplitted = new SplitText(blueLetters, { type: "words, chars" });

    // Loading images
    const imagesSrc = [
      {
        name: 'bg',
        src: "img1.jpg"
      },
      {
        name: 'img',
        src: "img2.jpg"
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

    image.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
        <defs>
          <clipPath id="clip-0">
            <path class="cls-1" d="M 160.449 303.56 C 160.449 309.482 155.648 314.283 149.725 314.283 C 143.803 314.283 139 309.484 139 303.56 C 139 294.314 146.972 288.39 149.17 280.423 C 149.238 280.172 149.465 280 149.725 280 C 149.984 280 150.211 280.172 150.281 280.423 C 152.477 288.39 160.45 294.314 160.45 303.561 L 160.449 303.56 Z" style="fill: rgb(0, 188, 241);" id="light"></path>
          </clipPath>
          <mask id="mask-0">
            <path class="cls-1" d="M 160.449 303.56 C 160.449 309.482 155.648 314.283 149.725 314.283 C 143.803 314.283 139 309.484 139 303.56 C 139 294.314 146.972 288.39 149.17 280.423 C 149.238 280.172 149.465 280 149.725 280 C 149.984 280 150.211 280.172 150.281 280.423 C 152.477 288.39 160.45 294.314 160.45 303.561 L 160.449 303.56 Z" style="fill: rgb(0, 188, 241);" id="dot2"></path>
          </mask>
        </defs>
        <image width="300" height="600" style="" xlink:href="${imagesSrc[0].src}"></image>
        <image width="300" height="600" style="clip-path: url(#clip-0);" xlink:href="${imagesSrc[1].src}"></image>
        <path class="cls-1" d="M 160.449 303.56 C 160.449 309.482 155.648 314.283 149.725 314.283 C 143.803 314.283 139 309.484 139 303.56 C 139 294.314 146.972 288.39 149.17 280.423 C 149.238 280.172 149.465 280 149.725 280 C 149.984 280 150.211 280.172 150.281 280.423 C 152.477 288.39 160.45 294.314 160.45 303.561 L 160.449 303.56 Z" style="fill: rgb(0, 188, 241);" id="dot" bx:origin="0.18648 0.5"></path>
        <rect id='overlay' width="300" height="600" style="opacity: 0.5; fill: rgb(0, 188, 241);  mask: url(#mask-0);"></rect>
        <g transform="matrix(1, 0, 0, 1, 42.274258, 41.999992)" style="" id="pip">
          <path d="M 127.75 132.88 L 127.75 88.12 C 127.75 85.84 125.9 84 123.63 84 L 91.87 84 C 89.59 84 87.75 85.85 87.75 88.12 L 87.75 132.88 C 87.75 135.16 89.6 137 91.87 137 C 94.29 137 96.25 138.96 96.25 141.38 L 96.25 143 L 90.33 143 C 88.91 143 87.75 144.16 87.75 145.58 L 87.75 160.42 C 87.75 161.84 88.91 163 90.33 163 L 98.25 163 L 98.25 215 C 98.25 216.66 99.59 218 101.25 218 L 103.05 239.56 C 103.16 240.94 104.32 242 105.7 242 L 109.81 242 C 111.19 242 112.34 240.94 112.46 239.56 L 114.26 218 C 115.92 218 117.26 216.66 117.26 215 L 117.26 163 L 125.18 163 C 126.6 163 127.76 161.84 127.76 160.42 L 127.76 145.58 C 127.76 144.16 126.6 143 125.18 143 L 119.26 143 L 119.26 141.38 C 119.26 138.96 121.22 137 123.64 137 C 125.9 137 127.75 135.15 127.75 132.88 Z" style="fill: rgb(255, 255, 255);"></path>
          <line class="st0" x1="92.75" y1="147" x2="92.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="97.75" y1="147" x2="97.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="102.75" y1="147" x2="102.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="107.75" y1="147" x2="107.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="112.75" y1="147" x2="112.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="117.75" y1="147" x2="117.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
          <line class="st0" x1="122.75" y1="147" x2="122.75" y2="161" style="stroke: rgb(242, 242, 242); stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 2px; fill: rgb(255, 255, 255);"></line>
        </g>
      </svg>`)

    // Animation

    tl
      .set(subheadlineSplitted.lines, { overflow: 'hidden' })
      .set(blueLettersSplitted.chars, { transformPerspective: 200 })

      // FRAME 1
      .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })
      .to("#pip", { y: -350, scale: 1.5, duration: 1.5, ease: "power2.in" }, ">-0.4")
      .to(["#dot", "#light", "#dot2"], { y: 50, duration: 1, scaleY: 2, scaleX: 0.7, ease: "power1.in", transformOrigin: "50% 50%" }, "<")
      .to(["#dot", "#light", "#dot2"], { scaleY: 2, scaleX: 2, duration: 1, transformOrigin: "50% 50%" }, '>-0.2')
      .to(["#light", "#dot", '#dot2'], { scale: 45, transformOrigin: "50% 50%", duration: 1.4, ease: "power1.out" }, ">-0.2")
      .to(["#light", "#dot", '#dot2'], { y: 100, duration: 1.7 }, "<-1")
      .to("#dot", { alpha: 0, duration: 0.7 }, ">-0.8")

      .from(headlineSplitted.lines, { alpha: 0, y: '30px', rotationZ: "20", transformOrigin: "0% 50%", stagger: 0.2 }, ">")
      .fromTo(subheadlineSplitted.words, { y: 20, alpha: 0 }, { y: 0, alpha: 1, stagger: 0.1, duration: 0.5, force3D: true, rotation: 0.01 }, ">-0.05")
      .to('#overlay', { alpha: 0, duration: 3.5 }, "<")
      .to(blueLettersSplitted.chars, { duration: 1.2, color: '#00bdf2', rotationY: 360, ease: "back(2)", stagger: { amount: 1, ease: "power2.in" } }, '>-1.2')

      .to(textWrap, { alpha: 0, duration: 1 }, ">3")
      .to(["#light", "#dot", '#dot2'], { y: 0, scale: 1, transformOrigin: "50% 50%", duration: 1.4, ease: "power1.out" }, "<")
      .to("#dot", { alpha: 1, duration: 0.7 }, ">-0.8")
      .to("#pip", { y: 40, scale: 1, duration: 1.5, ease: "power1.out" }, "<-.5")

      .set([subheadlineSplitted.words, headlineSplitted.lines], { alpha: 0 })
      .set(blueLettersSplitted.chars, { color: '#fff' })
      .set(textWrap, { alpha: 1 })

      // FRAME 2
      .to("#pip", { y: -350, scale: 1.5, duration: 1.5, ease: "power2.in" }, ">1")
      .to(["#dot", "#light", "#dot2"], { y: 50, duration: 1, scaleY: 2, scaleX: 0.7, ease: "power1.in", transformOrigin: "50% 50%" }, "<")
      .to(["#dot", "#light", "#dot2"], { scaleY: 2, scaleX: 2, duration: 1, transformOrigin: "50% 50%" }, '>-0.2')
      .to(["#light", "#dot", '#dot2'], { scale: 45, transformOrigin: "50% 50%", duration: 1.4, ease: "power1.out" }, ">-0.2")
      .to(["#light", "#dot", '#dot2'], { y: 100, duration: 1.7 }, "<-1")
      .to("#dot", { alpha: 0, duration: 0.7 }, ">-0.8")

      .fromTo(headlineSplitted.lines, { alpha: 0, y: '30px', rotationZ: "20", transformOrigin: "0% 50%" }, { y: 0, alpha: 1, rotationZ: "0", stagger: 0.2 }, ">")
      .fromTo(subheadlineSplitted.words, { y: 20, alpha: 0 }, { y: 0, alpha: 1, stagger: 0.1, duration: 0.5, force3D: true, rotation: 0.01 }, ">-0.05")
      .to(blueLettersSplitted.chars, { duration: 1.2, color: '#00bdf2', rotationY: '+=360', ease: "back(2)", stagger: { amount: 1, ease: "power2.in" } }, '>')

  }
}