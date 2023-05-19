"use strict";
window.onload = function () {
  politeInit();

  // Setting variables
  async function politeInit() {
    const select = (s) => document.querySelector(s);
    const selectAll = (s) => document.querySelectorAll(s);
    const textWrap = select('#textWrap');
    const headline = select('#headline');
    const subheadline = select("#subheadline")
    const cta = select('#cta');
    const alertBar = select('#alertBar');
    const alertTitle = select("#alertTitle");
    const tl = gsap.timeline();
    const alertTitleWord = "Alert";
    const alertTitleHeightInPercent = 59;
    headline.innerHTML = "UNICEF Responds to Earthquake in Turkey";
    subheadline.innerHTML = "Rush Emergency<br>Relief Now!";
    cta.innerHTML = "Contribute Now";
    gsap.set(alertTitle, { height: `${alertTitleHeightInPercent}%` })

    const firstAlertWord = document.createElement('div');
    const secondAlertWord = document.createElement('div');
    const alertTitleWidth = alertTitle.getBoundingClientRect().width;

    firstAlertWord.innerHTML = secondAlertWord.innerHTML = alertTitleWord;
    firstAlertWord.classList.add('alertTitle_firstWord', 'alertWord');
    secondAlertWord.classList.add('alertTitle_secondWord', 'alertWord');

    gsap.set(secondAlertWord, { left: `${alertTitleWidth}px` });
    alertTitle.append(firstAlertWord, secondAlertWord);

    // Animation
    gsap.set(textWrap, { alpha: 1 });
    gsap.set(alertBar, { alpha: 0, y: "-=60" })

    const alertWords = selectAll('.alertWord');
    const splittedHeadline = new SplitText(headline, { type: "words" })
    const subheadlineSplitted = new SplitText(subheadline, { type: "words" })


    tl
      // FRAME 1
      .to(alertWords, { duration: 3, x: `-=${alertTitleWidth}`, rotationX: 0.01, force3D: true, ease: "none", repeat: 3 })
      .to("#wrect", { duration: 0.6, alpha: 0, ease: "none" }, 0)
      .to(alertBar, { duration: 1, y: "0", alpha: 1, ease: "power2" }, ">")
      .from(cta, { duration: 1, y: "+=60", ease: "power2" }, "<")
      .from(splittedHeadline.words, { duration: 2, alpha: 0, x: "+=30", stagger: { amount: 0.95, from: "random" }, filter: "blur(8px)", ease: "power2" }, ">-0.3")
      .from(subheadlineSplitted.words, { duration: 1.8, alpha: 0, ease: "none" }, ">-1.2")
  }

  animate();
}

