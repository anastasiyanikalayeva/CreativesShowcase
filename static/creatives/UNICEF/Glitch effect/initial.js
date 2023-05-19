"use strict";
window.onload = function () {
  politeInit();

  // Setting variables
  async function politeInit() {
    const select = (s) => document.querySelector(s);
    const selectAll = (s) => document.querySelectorAll(s);
    const textWrap = select('#textWrap');
    const headline = select('#headline');
    const copySign = select('#copySign');
    const copy1 = select('#copy1');
    const cta = select('#cta');
    const alertBar = select('#alertBar');
    const alertTitle = select("#alertTitle");
    const alertDesc = select("#alertDesc");
    const alertDesc2 = select("#alertDesc2");
    const tl = gsap.timeline();
    const canvas = select('#canvas');
    const ctx = canvas.getContext('2d');
    const width = 300;
    const height = 250;

    canvas.width = width;
    canvas.height = height;


    // Loading images
    let imgLink = "img.jpg";

    const loadImages = async (srcsArr) => {
      const imagesArr = await Promise.all(
        srcsArr.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();

            image.nameImg = img.name;
            image.src = img.src;
            image.setAttribute('crossOrigin', '');
            image.onload = () => resolve(image);
          });
        })
      );

      const images = imagesArr.reduce((acc, img) => {
        acc[img.nameImg] = img;
        return acc;
      }, {});

      return images;
    };

    const imagesToLoad = [{ src: imgLink, name: "img" }];

    const alertTitleWord = "Alert";
    const alertDesc2Inner = "3X MATCH YOUR DONATION";
    const headlineInner = "CHILDREN <br>CAN\'T WAIT";
    const copySignInner = "CHILDREN CAN\'T WAIT";
    const copyInner1 = "Your tax-deductible gift will be<br> <span class=\"red\">MATCHED 3X<\/span> to help us protect every child<br> throughout the upcoming year.";
    const ctaInner = "3X My Gift";

    //settings
    const alertTitleHeightInPercent = 59;
    let currentFrame = 0;
    let imgData;
    let imgAlpha = {
      alpha: 0
    };

    //set
    headline.innerHTML = headlineInner;
    copySign.innerHTML = copySignInner;
    copy1.innerHTML = copyInner1;
    cta.innerHTML = ctaInner;

    // Setting alert bar
    const firstAlertWord = document.createElement('div');
    const secondAlertWord = document.createElement('div');
    const alertTitleWidth = alertTitle.getBoundingClientRect().width;

    firstAlertWord.innerHTML = secondAlertWord.innerHTML = alertTitleWord;
    firstAlertWord.classList.add('alertTitle_firstWord', 'alertWord');
    secondAlertWord.classList.add('alertTitle_secondWord', 'alertWord');

    gsap.set(secondAlertWord, { left: `${alertTitleWidth}px` });
    alertTitle.append(firstAlertWord, secondAlertWord);

    const secondalertDesc2 = document.createElement('div');
    secondalertDesc2.classList.add('alertSubtitle');

    alertDesc.innerHTML = "";
    alertDesc2.innerHTML = alertDesc2Inner;
    secondalertDesc2.innerHTML = alertDesc2Inner;

    alertDesc2.after(secondalertDesc2);

    gsap.set(alertDesc, { right: `${alertTitleWidth}px` });
    gsap.set(secondalertDesc2, { right: `${alertTitleWidth * 2}px` });

    const images = await loadImages(imagesToLoad);
    const img = images['img'];

    const speed = 0.4;

    glitchAnimation();
    animate();

    // Glitch animation
    function glitchAnimation() {
      const progress = currentFrame % 100;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);

      imgData = ctx.getImageData(0, 0, width, height);
      imgData = pixelProcessor(imgData, 1);

      ctx.putImageData(imgData, 0, 0);

      glitchWave((currentFrame * 6) % height, 8);

      if (progress > 10 && progress < 13) {
        drawGlitch(width, height, randInt(2, 6), glitchLine);
      }

      if (progress > 10 && progress < 20) {
        glitchSlip(5, 0, 600);
      }

      if (progress > 40 && progress < 50) {
        glitchSlip(5, 0, 440);
      }

      if (progress > 80) {
        glitchSlip(10, 0, 440);
      }

      if (progress > 90 && progress < 95) {
        drawGlitch(width, height, randInt(3, 15), glitchBlock);
        drawGlitch(width, height, randInt(3, 20), glitchLine);
      }

      if (progress > 95) {
        glitchSlip(20, 100 * Math.random(), 400 * Math.random());
      }

      ctx.save();
      ctx.globalAlpha = imgAlpha.alpha;
      ctx.drawImage(img, 0, 0);
      ctx.restore();

      currentFrame += speed;
    };

    function glitchWave(renderLineHeight, cuttingHeight) {
      const image = ctx.getImageData(0, renderLineHeight, width, cuttingHeight);

      ctx.putImageData(image, 0, renderLineHeight - 10);
    };

    function glitchSlip(waveStrength, startHeight, endHeight) {
      if (endHeight < startHeight) {
        const temp = endHeight;

        endHeight = startHeight;
        startHeight = temp;
      }

      for (let h = startHeight; h < endHeight; h++) {
        if (Math.random() < 0.1) h++;

        const image = ctx.getImageData(0, h, width, 1);

        ctx.putImageData(image, Math.random() * waveStrength - (waveStrength / 2), h);
      }
    };

    function glitchBlock(i, x, y) {
      if (i > 3) {
        const spliceHeight = 1 + randInt(0, 10);

        ctx.drawImage(canvas, x, y, x, spliceHeight, randInt(0, x), y, randInt(x, width), spliceHeight);
      }
    };

    function glitchLine(y) {
      const spliceHeight = 1 + randInt(1, 50);

      ctx.drawImage(canvas, 0, y, width, spliceHeight, 1 + randInt(0, 6), y + randInt(0, 10), width, spliceHeight);
    };

    function pixelProcessor(imageData, step) {
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 1200 * step) {
        for (let j = 0; j < 1200; j += 4) {
          const c = i + j;

          data[c] = data[c + 16];

          data[c] += randInt(0, -60);
          data[c + 1] += randInt(0, -60);
          data[c + 2] += randInt(0, -60);
        }
      }

      return imageData;
    };

    function drawGlitch(width, height, amount, callback) {

      for (let i = 0; i < (amount || 10); i++) {
        const x = Math.random() * width + 1;
        const y = Math.random() * height + 1;

        callback(i, x, y);
      }
    };

    function randInt(a, b) {
      return ~~(Math.random() * (b - a) + a);
    };

    // Animating
    function animate() {
      gsap.registerEffect({
        name: "textGlitch",
        effect: (targets) => {
          const tlEffect = gsap.timeline({ defaults: { duration: 0.04, ease: "power4.inOut" } });
          const glitchElem = targets[0];
          const glitchWrap = targets[1];
          const skewX = gsap.utils.random(30, 70, 5);
          const shiftX = gsap.utils.random(-10, -25);
          const scaleY = gsap.utils.random(1.1, 1.3);
          const scale = gsap.utils.random(1.1, 1.3);

          tlEffect
            .to(glitchElem, {
              duration: 0.05, alpha: 0.5, repeat: 10, yoyo: "true", ease: "power", onComplete: () => {
                gsap.to(glitchElem, { duration: 0.85, alpha: 1 })
              }
            })
            .to(glitchElem, { duration: 0.1, skewX: skewX }, "<")
            .to(glitchElem, { skewX: 0 }, ">")
            .to(glitchElem, { opacity: 0, yoyo: true, repeat: 1, ease: "none" }, ">")
            .to(glitchElem, { x: shiftX, yoyo: true, repeat: 1 }, ">")
            .to(glitchWrap, { duration: 0.0, scale: scale, ease: "none" }, ">")
            .to(glitchWrap, { duration: 0.0, scale: 1, ease: "none" }, ">0.02")
            .to(glitchElem, { duration: 0.02, scaleY: scaleY }, "<")
            .to(glitchElem, { scaleY: 1 }, "<")
            .to(glitchElem, { duration: 0.1, skewX: -skewX }, ">0.2")
            .to(glitchElem, { skewX: 0 }, ">")
          return tlEffect;
        },
        extendTimeline: true,
      });

      gsap.set([textWrap, alertBar], { alpha: 1 });
      const alertWords = selectAll('.alertWord');
      const alertSubtitleElements = selectAll('.alertSubtitle');
      const redWords = select('.red')
      const splittedHeadline = new SplitText(headline, { type: "words" })
      const splittedCopy1 = new SplitText(copy1, { type: "lines,words,chars", linesClass: "line" })
      const firstWordHeadline = selectAll("#headline > div:first-child")[0]

      firstWordHeadline.classList.add('blue-bg')

      gsap.set(headline, { perspective: 100, rotation: -9, skewX: -10, transformOrigin: "0 0" });
      gsap.set(splittedHeadline.words, { transformStyle: "preserve-3d" });

      tl
        // FRAME 1
        .to(alertWords, { duration: 3.5, x: `-=${alertTitleWidth}`, force3D: true, rotation: 0.01, ease: "none", repeat: 6 })
        .to(alertSubtitleElements, { duration: 3.5, x: `+=${alertTitleWidth * 2.71}`, force3D: true, rotation: 0.01, ease: "none", repeat: 6 }, "<")
        .set(alertSubtitleElements[2], { text: { value: "3X MATCH" }, width: 164 }, ">-2.5")
        .to("#wrect", { duration: 0.6, alpha: 0, ease: "none" }, 0)
        .from(alertBar, { duration: 0.7, y: "-=60", ease: "power2" }, ">")
        .from(splittedHeadline.words, { duration: 1.4, alpha: 0, x: "-=100", stagger: 0.15, scale: 2, rotationY: -50, ease: "power4" }, ">")
        .textGlitch([splittedHeadline.words[0], textWrap], ">")
        .to(firstWordHeadline, {
          duration: 0.05, backgroundColor: "#00bdf2", repeat: 10, yoyo: "true", ease: "power", onComplete: () => {
            gsap.to(firstWordHeadline, { duration: 0.85, backgroundColor: "#00bdf2" })
          }
        }, ">-0.4")
        .to(splittedHeadline.words, { duration: 1.1, alpha: 0, x: "-=100", stagger: 0.15, scale: 2, rotationY: -50, ease: "power4.in" }, ">1")

        // FRAME 2
        .to("#introOverlay", { duration: 0.6, alpha: 0, onStart: () => { gsap.ticker.add(glitchAnimation) }, ease: "none" }, ">-0.3")
        .from("#copyWrap", { duration: 0.8, y: "+=200", ease: "power2" }, ">-0.2")
        .from(splittedCopy1.chars, { duration: 0.4, stagger: 0.04, x: "+=7", ease: "sine" }, "<")
        .from(splittedCopy1.chars, { duration: 0.4, stagger: 0.04, color: "#ee3224", alpha: 0, ease: "none" }, "<")
        .textGlitch([redWords, redWords], "<1.7")
        .textGlitch([cta, cta], ">1.7")
        .textGlitch([cta, cta], ">2.5")

      gsap.delayedCall(24, delayedCall);

      function delayedCall() {
        gsap.to(imgAlpha, {
          duration: 0.7, alpha: 1, onComplete: () => {
            gsap.ticker.remove(glitchAnimation);
          }, ease: "none"
        })
      }
    }
  }
};
