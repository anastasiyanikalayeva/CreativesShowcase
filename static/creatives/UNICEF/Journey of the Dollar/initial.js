"use strict"
window.onload = function () {

    if (Enabler.isInitialized()) {
        politeInit();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, politeInit);
    }

    const images = {};

    function politeInit() {
        const select = (s) => document.querySelector(s)
        const selectAll = (s) => document.querySelectorAll(s)

        // Setting variables
        let
            wrect = select('#wrect'),
            logo = select('#logo'),
            cta = select('#cta'),
            deck = select('#deck'),
            ctatext = select('#ctatext'),
            ctaafter = select('#ctaafter'),
            headline = select('#headline'),
            subheadline = select('#subheadline'),
            description = select('#description'),
            text = select('#text'),
            headline2 = select('#headline2'),
            subheadline2 = select('#subheadline2'),
            iconObjs = [
                {
                    description: "$46 can provide 1 large first aid kit", 
                    name: "first aid",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" version=\"1.1\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"M156.3 129.1h-15v-15h-17.9v15h-15v17.8h15v15h17.9v-15h15z\"\/><path d=\"M132.4 180.8c-23.6 0-42.8-19.1-42.8-42.8 0-23.6 19.1-42.8 42.8-42.8 23.6 0 42.7 19.1 42.8 42.7-.1 23.7-19.2 42.9-42.8 42.9zm0-79.4c-20.3 0-36.7 16.4-36.7 36.7 0 20.3 16.4 36.7 36.7 36.7 20.3 0 36.7-16.4 36.7-36.7v-.1c-.1-20.3-16.5-36.6-36.7-36.6z\"\/><path d=\"M228.2 66.5h-39.7V47.1c0-10.1-8.2-18.3-18.3-18.3H94.5c-10.1 0-18.3 8.2-18.3 18.3v19.4H36.5c-7.3 0-13.2 6-13.2 13.3v119.9c0 1.8.3 3.5 1 5.1l4.2 10.2c2.1 4.9 6.9 8.1 12.2 8.1h182.4c5.3 0 10.1-3.2 12.2-8.1l4.5-10.7c.5-1.2.9-2.5 1-3.9l.5-4.7V79.8c.1-7.3-5.8-13.2-13.1-13.3zm-18.1 129.9 25.3-27.3v27.5l-25.3-.2zm25.3-36.1L202.1 196h-18.7l52.1-54.3-.1 18.6zM82.3 47.1c0-6.8 5.5-12.2 12.2-12.2h75.7c6.8 0 12.2 5.5 12.2 12.2v19.4H175V49.4c0-3.7-3-6.6-6.6-6.6H96.3c-3.7 0-6.6 3-6.6 6.6v17.1h-7.5l.1-19.4zM169 66.6H95.8V49.4c0-.3.3-.6.6-.6h72.1c.3 0 .5.3.6.6l-.1 17.2zM36.4 72.7h191.8c4 0 7.2 3.2 7.2 7.2v53.3l-60.5 63.2H29.3V79.8c0-4 3.2-7.1 7.2-7.1h-.1zm193.4 139.8c-1.1 2.6-3.7 4.3-6.6 4.3H40.8c-2.9 0-5.5-1.7-6.6-4.4L30 202.2h204.1l-4.3 10.3z\"\/><\/g><\/svg>"
                },
                {
                    description: "$55 can provide 1 family hygiene kit", 
                    name: "hygiene",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"M146.9 232H65.2c-10.1 0-18.4-8.7-18.4-19.4V73.2l11.4-12.1 19.7-20.7.1-.1c.2-.2.3-.4.4-.7l11.7-12.4H179c10.1 0 18.3 8.7 18.3 19.4v63.9c0 2.3 1.8 4.2 4.1 4.2 2.2 0 4.1-1.9 4.1-4.2v-64c0-15.3-11.9-27.8-26.5-27.8H88.7c-1.1 0-2.2.5-2.9 1.3L75.2 31.2 66 21.6c-.8-.8-1.8-1.3-2.9-1.3-1.1 0-2.1.4-2.9 1.2L40.5 42.3c-1.6 1.6-1.6 4.3 0 5.9l9.3 9.8-9.9 10.5c-.7.8-1.2 1.8-1.1 3v141.1c0 15.3 11.9 27.8 26.5 27.8h81.6c2.2 0 4.1-1.9 4.1-4.2-.1-2.3-1.9-4.2-4.1-4.2zM49.1 45.3l14-14.7 6.3 6.7L55.5 52l-6.4-6.7z\" class=\"st0\"\/><path d=\"M165.7 34.6h-54.1c-5.4.2-9.7 4.9-9.5 10.6v3.7c-.1 5.7 4.1 10.4 9.5 10.6h54.2c5.4-.2 9.7-4.9 9.5-10.6v-3.7c.1-5.7-4.2-10.5-9.6-10.6zm1.4 14.4c.1 1-.6 1.9-1.5 2h-53.9c-.9-.1-1.6-1-1.5-2v-4c-.1-1 .6-1.9 1.5-2h54c.9.1 1.6 1 1.5 2v3.9l-.1.1zM111 111.3c-6.4 0-15.3 14.9-17.9 19.5-7.9 14.1-10.7 25.2-10.7 30.4 0 16.6 12.8 30.1 28.6 30.1s28.6-13.5 28.6-30.1c0-5.2-2.8-16.3-10.7-30.4-2.6-4.6-11.5-19.5-17.9-19.5zm20.7 49.9c0 5.8-2.1 11.2-6 15.3-3.9 4.1-9 6.3-14.4 6.3-11.3 0-20.4-9.7-20.4-21.6 0-5.4 3.4-14.8 9-25.1 5.3-9.6 9.5-14.9 11.1-16.2 4.6 3.3 20.5 29 20.7 41.3z\" class=\"st0\"\/><path d=\"M107 170.2c-2.2.3-3.8 2.4-3.5 4.7.1 1.2.7 2.2 1.6 2.9.7.5 1.6.8 2.4.8h.4c10.9 0 19.8-9.4 19.7-20.8 0-2.3-1.8-4.2-4.1-4.2s-4.1 1.9-4.1 4.2c0 6.8-5.2 12.3-11.6 12.3-.2.1-.5.1-.8.1z\" class=\"st0\"\/><path d=\"M182 114.8c2.2 0 4.1-1.9 4.1-4.2V95.5c0-9.6-7.4-17.3-16.6-17.3H74.7c-9.1 0-16.6 7.8-16.6 17.3v105.7c0 9.6 7.4 17.3 16.6 17.3h63.2c2.2 0 4.1-1.9 4.1-4.2s-1.8-4.2-4.1-4.2H74.7c-4.6 0-8.4-4-8.4-8.9V95.5c0-4.9 3.8-8.9 8.4-8.9h94.8c4.6 0 8.4 4 8.4 8.9v15.1c0 2.3 1.8 4.2 4.1 4.2z\" class=\"st0\"\/><path d=\"M243.4 136.7v-.1c-1.2-5.5-9.1-9.1-24.2-11.2-11.2-1.5-22.3-1.5-22.7-1.5-.5 0-12.4 0-24 1.7-15.7 2.2-23.6 6.4-23.6 12.4v.2c-.1.4 0 .8 0 1.2l13.8 94.1v.1c2.2 8.8 17.2 11.4 25.9 12.1h.1c1 0 2 .1 3.1.1 1.3.1 2.8.2 4.4.2 5.2 0 12.8-.4 19.7-2.3 7.3-2 12-5.2 13.8-9.5l.1-.2v-1.1l13.4-94.3c.1-.3.2-.5.2-.7v-1.2zm-9.5 10.7L222 231.2c-2.5 4-16.4 7.4-32.8 6.1-12.1-1-18.1-4.3-18.5-5.5l-12.2-84.6c12.8 4.7 35.1 4.8 37.8 4.8 7.8.1 26.4-.4 37.6-4.6zm.5-9.5c-1.4.8-4.4 2-10 3.2-5.4 1.1-14.8 2.5-28.2 2.5-13 0-22.4-1.3-28-2.4-5.6-1.1-8.9-2.3-10.3-3.1 1.3-.8 4.2-2 9.9-3.2 5.5-1.1 14.9-2.5 28.4-2.5 21.8 0 34.5 3.4 38.2 5.5z\" class=\"st0\"\/><path d=\"M174.5 225.3v.1c1.4 5.3 11.9 6.8 16.3 7.2 1.6.1 3.4.2 5.2.2 8.8 0 19.4-1.8 21.8-7.2l.1-.2 4.6-32v-.2c0-2.2-2.7-3.7-8.4-4.8-4.8-.9-11.1-1.4-18-1.4-6.8 0-13.2.5-18 1.4-5.7 1.1-8.4 2.6-8.4 4.8v.1l4.8 32z\" class=\"st0\"\/><\/g><\/svg>"
                },
                {
                    description: "$13 can provide 5 school backpacks", 
                    name: "bag",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"M176.8 76.8c.1-7.1-5.5-13-12.6-13.2l-60.3-1.3c-3.4 0-6.7 1.2-9.2 3.5-2.5 2.4-3.9 5.7-4 9.1l-.4 27.9c-.1 4.1 1.7 7.7 4.6 10.1 2.2 1.8 4.9 2.9 8 3l60.3 1.3c7.1.1 13-5.5 13.2-12.6l.4-27.8zm-73-7.1v1.6l60.1 1.4c2.2.1 4 1.9 3.9 4.1l-.4 27.9c-.1 2.1-1.9 3.8-4.1 3.7l-60.2-1.3c-2.1-.1-3.7-1.8-3.8-3.8l.4-28c0-2.2 1.8-4 4-3.9l.1-1.7zm-27.6 98.4c.8.6 1.7 1 2.8 1l106.7 1.7c2.4 0 4.5-1.9 4.5-4.4 0-1.2-.4-2.3-1.3-3.2-.8-.8-1.9-1.3-3.1-1.3l-106.7-1.7c-2.4 0-4.5 1.9-4.5 4.4 0 1.4.6 2.7 1.6 3.5z\"\/><path d=\"m238.3 214.7 1.1-67.9c.2-6.3-2.1-12.3-6.4-16.9-4-4.3-9.3-6.8-15.1-7.3l.3-20.3c.7-31.4-22-57.8-53-61.9l.1-5.7c.2-9.8-7.6-18-17.5-18.2l-26.3-.5c-9.8-.1-17.9 7.7-18.1 17.5l-.1 5.7C72.9 42.6 49.7 67.9 49 98.6l-.3 21.4c-12.2.7-22.1 10.8-22.3 23.2L25.3 211c-.4 12.6 9.2 23.2 21.8 24.2 1.2 7.1 5 13.3 10.3 17.8 5.1 4.3 11.6 6.9 18.6 7l109.7 1.7c14.2.2 26.7-10 29.6-23.8 12.6-.3 22.8-10.5 23-23.2zm-50.5-84.8-109.7-1.7c-8-.1-15.7 3-21.3 8.5l.6-37.9C58 70 82 47.1 110.7 47.7l47.6 1c28.8.6 51.7 24.6 51.1 53.4l-.8 36.8c-5.4-5.6-12.9-8.9-20.8-9zm-110 7.2 109.9 1.7c4.9 0 9.6 1.8 13.3 4.9.5.4 1 .9 1.5 1.4 3.9 4 6.1 9.3 6 15l-1.1 71.9c-.2 11.6-9.8 20.8-21.3 20.7l-110-1.7c-5.6-.1-10.9-2.3-14.8-6.3-3.9-4-6.1-9.3-6-15l1.1-71.9c.2-11.6 9.8-20.9 21.4-20.7zm138.9 17.1c.3-.6.6-1.3.6-2l.3-20.5c7.3 1 12.9 7.3 12.8 14.8l-.9 67.9c-.1 7.5-5.9 13.6-13.2 14.4l1.1-68.6c0-2-.3-4-.7-6zM156.6 34.3l-.1 5.5-44.2-1 .1-5.4c.1-4.9 4.2-8.9 9.1-8.8l26.2.4c5.1.2 9 4.4 8.9 9.3zM48.2 128.7l-.5 35.7c-.1.4-.1.8 0 1l-1 60.8c-7.3-1-12.9-7.3-12.8-14.8l1.1-67.9c0-3.9 1.5-7.7 4.3-10.5 2.3-2.5 5.5-4 8.9-4.3z\"\/><path d=\"M180.6 36c-.4 1.1-.4 2.3 0 3.4.5 1.1 1.3 1.9 2.4 2.4 1.1.4 2.3.4 3.4 0 1.1-.5 1.9-1.3 2.4-2.4l9.6-24.1 15.6 6.2-12.8 32c-.2.5-.3 1-.3 1.5 0 1.4.6 2.7 1.6 3.5.8.6 1.7 1 2.8 1 1.8 0 3.5-1.1 4.1-2.8l12.8-32.1c1.8-4.5-.4-9.6-4.9-11.4L201.7 7c-4.5-1.8-9.6.4-11.4 4.9L180.6 36zM80 36.2c.8 2.3 3.4 3.5 5.7 2.6 2.3-.8 3.5-3.4 2.6-5.7L79.4 8.7c-1.7-4.5-6.7-6.9-11.3-5.2L52.3 9.2l-.3.1c-4.5 1.8-6.8 6.9-5 11.4l11.8 32.4c.3.7.7 1.4 1.3 1.9.8.7 1.8 1 2.8 1l1.9-.2-.1-.4c2.1-.9 3.1-3.4 2.4-5.6L55.3 17.5 71 11.7l9 24.5z\"\/><\/g><\/svg>"
                },
                {
                    description: "$19 can provide 1 tarpaulin to shelter families", 
                    name: "shelter",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"M266 203c0-2.2-1.8-3.9-3.9-3.9h-16.8l-19-114.8 26.5 12.5c1 .4 2 .5 3 .1s1.8-1.1 2.2-2c.3-.5.4-1.1.4-1.7 0-.5 0-1.1-.2-1.6-.4-1-1.1-1.8-2-2.2L132.7 31.2c-1.1-.5-2.3-.5-3.4 0L8.5 89.8c-.9.5-1.6 1.3-2 2.2-.2.5-.2 1-.2 1.6 0 .6.1 1.1.4 1.6.9 1.9 3.3 2.8 5.2 1.8l23.4-11.3-18.1 113.4H2.6c-2.2 0-3.9 1.8-3.9 3.9v.2c0 2.2 1.8 3.9 3.9 3.9H262c2.2 0 3.9-1.8 3.9-3.9v-.1c.1 0 .1-.1.1-.1zm-95.5-35.2 7 26.8c-7.2-3.9-13.5-9.4-18.1-16.2l11.1-10.6zm-5-20 2.9 11-13.3 12.7c-1.7-2.9-3.2-6-4.5-9.1l14.9-14.6zm-82.7 51.3 17.6-88.5 26.9-8.1c1.8 18.8 10 75.6 42 96.6H82.8zm93.7-40.6-13.7-52.2c-.3-1.3-1.2-2.3-2.4-2.7l-28.2-10.3h-.1c-.4-.1-.9-.1-1.2 0h-.5L96 103.7c-1.4.4-2.4 1.6-2.7 3l-18.6 92.5H25.1L43.7 81.6l87.1-42.3 86.8 40.8L237.3 199H187l-10.5-39.6v-.9zm-20.9-47.9 7.5 28.6-16 15.2c-6-16.5-9.9-33.7-11.8-51.2l20.3 7.4z\"\/><path d=\"M137 54.2V54h-12.4v9.1h-9.1v12.6h9.1v9.1H137v-9.1h9.1V63.1H137z\"\/><\/g><\/svg>"
                },
                {
                    description: "$29 can provide 100 bars of soap", 
                    name: "soap",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"M180.2 186.3c-.8 0-1.5 0-2.3-.1l-134.3-9.1c-2.7-.2-11-2.2-12.8-8.6-.4-1.5.4-3.1 1.9-3.5 1.5-.4 3.1.4 3.5 2 .9 3.1 6.3 4.4 7.7 4.5l134.3 9.1c9.3.6 18.5-3.7 23.8-11.4l19.2-27.5c.9-1.3 2.7-1.6 4-.7 1.3.9 1.6 2.7.7 4l-19.2 27.5c-5.9 8.7-16 13.8-26.5 13.8z\" class=\"st0\"\/><path d=\"M176.7 160.8h-.9L66.1 153c-3.2-.2-6-2.1-7.3-5-1.4-2.9-1.1-6.2.7-8.9L73 119.8c2.4-3.5 6.6-5.5 10.9-5.2l12.6.9c1.6.1 2.7 1.5 2.6 3-.1 1.6-1.5 2.8-3 2.6l-12.6-.9c-2.3-.2-4.5.9-5.8 2.8l-13.5 19.4c-.9 1.4-.5 2.7-.3 3.2s1 1.7 2.6 1.8l109.8 7.8c2.2.2 4.5-.9 5.8-2.8l13.5-19.4c.9-1.4.5-2.7.3-3.2s-1-1.7-2.6-1.8l-12.1-.9c-1.6-.1-2.7-1.5-2.6-3 .1-1.6 1.5-2.8 3-2.6l12.1.9c3.2.2 6 2.1 7.3 5 1.4 2.9 1.1 6.2-.7 8.8l-13.5 19.4c-2.3 3.3-6.1 5.2-10.1 5.2zM159.1 90.7c-1.1 0-2.2-.6-2.6-1.7-1.4-3.2-4.5-5.3-8-5.3-1.5 0-2.9.4-4.2 1.1-1.4.8-3.1.3-3.9-1.1-.8-1.4-.3-3.1 1.1-3.9 2.1-1.2 4.6-1.8 7-1.8 5.8 0 11 3.4 13.2 8.8.6 1.4-.1 3.1-1.5 3.7-.3.1-.7.2-1.1.2zM90 47.9c-10.1 0-18.2-8.2-18.2-18.2S79.9 11.4 90 11.4s18.2 8.2 18.2 18.2S100 47.9 90 47.9zm0-30.8c-6.9 0-12.6 5.6-12.6 12.6S83 42.2 90 42.2c6.9 0 12.6-5.6 12.6-12.6S96.9 17.1 90 17.1zM220 76.2c-1.3 0-2.5-.9-2.8-2.3-2-9.9-10.9-17.1-21-17.1-3.4 0-6.6.8-9.7 2.3-1.4.7-3.1.1-3.8-1.3-.7-1.4-.1-3.1 1.3-3.8 3.8-1.9 7.9-2.9 12.2-2.9 12.8 0 24 9.1 26.6 21.7.3 1.5-.7 3-2.2 3.4h-.6zM73.1 213c-1.3 0-2.5-.9-2.8-2.2-.9-3.7-4.1-6.3-7.9-6.3-2.2 0-4.2.8-5.7 2.4-1.1 1.1-2.9 1.1-4 0s-1.1-2.9 0-4c2.6-2.6 6.1-4 9.7-4 6.5 0 12 4.4 13.4 10.7.4 1.5-.6 3.1-2.1 3.4h-.6z\" class=\"st0\"\/><path d=\"M237 122.1v-1.5c-.8-7.1-5.2-13-11.3-16 6.3-7 10.1-16.2 10.1-26.3 0-21.8-17.8-39.6-39.6-39.6-18.5 0-34.4 12.9-38.5 30.7-2.8-1.1-5.9-1.8-9.1-1.8-13.7 0-24.8 11.1-24.8 24.8 0 1.2.1 2.3.3 3.5l-37.9-2.7V93c0-13.7-11.1-24.8-24.8-24.8S36.6 79.3 36.6 93c0 7.9 3.8 15.3 10.1 19.9L28.1 139c-4.5 6.4-7.2 15.5-7.2 24.4v26.7c0 11.9 6.9 21.5 16.9 24.3.9 12.9 11.6 23.1 24.7 23.1 8.2 0 15.4-4 19.9-10.1 1.9 8 9.1 13.9 17.7 13.9 10.1 0 18.2-8.2 18.2-18.2 0-.8-.1-1.6-.2-2.3l59.9 4.4c.8.1 1.5.1 2.3.1 10.5 0 20.6-5.2 26.6-13.8l24.9-34.5c4.9-7.3 5.4-15.6 5.4-21.3l-.2-33.6zm-74.1-49.9c2.9-16 16.9-27.8 33.3-27.8 18.7 0 33.9 15.2 33.9 33.9 0 10.2-4.5 19.3-11.6 25.5-.6.6-1.3 1.1-2 1.6-.2.1-.3.3-.5.4-.7.5-1.3.9-2 1.3-.2.1-.4.3-.6.4-.7.4-1.3.8-2 1.1-.3.1-.5.2-.8.4-.7.3-1.3.6-2 .9l-.9.3c-.7.2-1.3.5-2 .7l-1.2.3c-.6.2-1.2.3-1.8.4-.5.1-1.1.2-1.7.3-.5.1-1 .2-1.5.2-1.1.1-2.2.2-3.2.2-1.2 0-2.4-.1-3.6-.2-.4 0-.8-.1-1.2-.2-.8-.1-1.6-.2-2.3-.4-.5-.1-.9-.2-1.4-.4-.7-.2-1.4-.3-2-.6-.5-.2-.9-.4-1.4-.5-.6-.2-1.3-.5-1.9-.7-.5-.2-.9-.5-1.4-.7-.6-.3-1.2-.6-1.7-.9-.5-.3-.9-.6-1.3-.8-.6-.4-1.1-.7-1.6-1.1-.4-.3-.8-.6-1.3-1s-1-.8-1.5-1.3c-.4-.4-.8-.7-1.1-1.1l-.8-.8c0-.1 0-.1.1-.2.2-.6.5-1.2.7-1.9.1-.3.2-.6.2-.9.1-.4.2-.9.3-1.3.1-.6.2-1.1.3-1.7 0-.2.1-.4.1-.7.1-.8.1-1.6.1-2.5V92c0-.8-.1-1.5-.1-2.3 0-.4-.1-.8-.2-1.2-.1-.5-.2-1-.3-1.4-.1-.5-.2-.9-.4-1.4-.1-.4-.2-.7-.3-1.1-.2-.5-.3-1-.6-1.5-.1-.3-.2-.5-.4-.8-.2-.5-.5-1.1-.8-1.6 0-.1-.1-.1-.1-.2-.6-1.1-1.3-2.1-2.1-3.1-.2-.3-.4-.5-.6-.8l-.9-.9c-.4-.4-.7-.8-1.1-1.1-.2-.2-.5-.4-.7-.6-.6-.5-1.2-1-1.8-1.4-.2-.3-.2-.4-.3-.4zm-14.4 1.1c3.8 0 7.2 1.1 10.2 3 .3.2.6.4 1 .7.7.5 1.4 1 2 1.6.1.1.3.2.4.4.8.8 1.5 1.6 2.1 2.6.1.1.2.3.3.4 1.2 1.9 2.1 4 2.6 6.3 0 .2.1.4.1.6.2 1.1.4 2.3.4 3.5 0 1.2-.1 2.4-.4 3.5 0 .2-.1.3-.1.5-.2 1-.5 2-.9 2.9-.1.3-.2.6-.4.9-.3.8-.8 1.5-1.2 2.2-.2.3-.4.6-.6 1-.6.8-1.2 1.5-1.8 2.2l-.6.6c-.7.7-1.4 1.3-2.2 1.8-.1.1-.3.2-.4.3-1 .6-2 1.2-3 1.6-.1 0-.2.1-.3.1-.9.4-1.9.7-2.9.9-.3.1-.5.1-.8.2-1.1.2-2.3.4-3.5.4-1.2 0-2.4-.1-3.5-.4-.3-.1-.6-.2-.9-.2-.9-.2-1.7-.5-2.5-.8-.3-.1-.5-.2-.8-.3-.9-.4-1.8-.9-2.6-1.4-.1-.1-.3-.1-.4-.2-1.9-1.3-3.6-3-5-5-.1-.2-.2-.3-.3-.5-.5-.8-.9-1.6-1.3-2.4-.2-.4-.3-.7-.4-1.1-.8-2.1-1.3-4.4-1.3-6.8-.1-10.6 8.5-19.1 19-19.1zm-98.6 34.9c-4.8-3.6-7.7-9.2-7.7-15.3 0-10.5 8.6-19.1 19.1-19.1 10.5 0 19 8.4 19.1 18.9h-.3c-11.3-.8-22.4 4.5-28.9 13.8l-1.3 1.7zm12.6 123.6c-10.5 0-19-8.5-19.1-19v-.3c0-.4.1-.8.1-1.2.1-.9.1-1.9.3-2.8 0-.2.1-.3.1-.5 1.8-7.1 7.5-12.6 14.7-14.1 1.2-.2 2.5-.4 3.8-.4 10.5 0 19.1 8.6 19.1 19.1v.1c0 10.6-8.5 19.1-19 19.1zm37.5 3.8c-6.9 0-12.6-5.6-12.6-12.6 0-2 .5-4 1.4-5.7l.2-.4c.8-1.4 1.9-2.7 3.1-3.7l.2-.2c.4-.3.8-.5 1.1-.8.2-.1.5-.3.7-.4.5-.2.9-.4 1.4-.6.5-.2.9-.3 1.4-.4.2-.1.5-.1.7-.1.7-.1 1.4-.2 2.2-.2.8 0 1.5.1 2.3.2.2 0 .4.1.6.1.6.1 1.1.3 1.6.5.2.1.4.1.6.2.6.3 1.2.6 1.8 1 .1 0 .1.1.2.1.6.4 1.1.9 1.6 1.4.2.2.4.5.6.7.2.3.5.6.7.9.3.3.5.7.7 1.1.1.2.2.4.3.5.2.5.5.9.7 1.4v.1c.5 1.4.8 2.8.8 4.4.3 6.9-5.3 12.5-12.3 12.5zm127-62L202.2 208c-5.4 7.7-14.5 12-23.8 11.4l-62.1-4.5c-.1-.3-.3-.5-.5-.8-.5-.8-1-1.6-1.6-2.4-.3-.4-.6-.7-.9-1.1l-1.2-1.2c-.3-.3-.7-.6-1-.9-.4-.3-.9-.7-1.3-1-.7-.5-1.5-.9-2.2-1.2-.4-.2-.8-.3-1.2-.5-.7-.2-1.3-.5-2-.6-.4-.1-.7-.2-1.1-.2-1-.2-2.1-.3-3.2-.3-5 0-9.6 2.1-12.9 5.4 0-.5-.1-.9-.2-1.4 0-.3-.1-.6-.1-.9-.1-.4-.2-.9-.3-1.3-.1-.3-.2-.7-.3-1-.1-.4-.3-.8-.4-1.2-.1-.3-.2-.7-.4-1-.2-.4-.3-.8-.5-1.2-.2-.3-.3-.7-.5-1-.2-.4-.4-.7-.6-1.1l-.6-.9c-.2-.3-.5-.7-.7-1-.2-.3-.4-.6-.7-.9-.2-.3-.5-.6-.8-.9-.2-.3-.5-.6-.8-.8-.3-.3-.5-.6-.8-.8-.3-.3-.6-.5-.9-.8-.3-.3-.6-.5-.9-.7-.3-.2-.6-.5-.9-.7l-.9-.6c-.3-.2-.7-.4-1-.6-.3-.2-.6-.4-1-.5-.4-.2-.8-.4-1.1-.5-.3-.2-.6-.3-1-.4-.4-.2-.8-.3-1.2-.5-.3-.1-.7-.2-1-.3-.4-.1-.9-.2-1.3-.3-.3-.1-.6-.2-1-.2-.5-.1-1-.2-1.6-.2-.3 0-.5-.1-.8-.1-.8-.1-1.6-.1-2.5-.1-1.4 0-2.9.2-4.2.4-.1 0-.2 0-.3.1-1.4.3-2.7.6-4 1.1h-.1c-8.1 3.1-14.2 10.2-15.7 19v.1c-6-2.3-11.5-8.5-11.5-18.5v-26.7c0-5.9 1.6-14.6 6.2-21.1L55.9 110c5.4-7.7 14.5-12 23.8-11.4l45.9 3.2c0 .1.1.1.1.2.4.9.8 1.8 1.3 2.7.2.4.4.7.7 1.1.3.5.7 1 1 1.5.5.7 1 1.3 1.6 1.9.3.3.6.7.9 1 .4.4.9.8 1.3 1.2.3.3.6.5 1 .8.7.5 1.5 1.1 2.2 1.5.5.3.9.5 1.4.8.4.2.9.4 1.3.6.7.3 1.4.6 2.2.8.3.1.7.2 1 .3.9.3 1.8.5 2.7.6.3.1.6.1.9.1 1.1.1 2.2.2 3.3.2.9 0 1.9-.1 2.8-.2.3 0 .7-.1 1-.2.5-.1 1.1-.2 1.6-.3.4-.1.8-.2 1.3-.3.4-.1.8-.2 1.2-.4.5-.2.9-.3 1.4-.5.3-.1.6-.3.9-.4.5-.2 1-.5 1.5-.7h.1c1.2-.6 2.3-1.4 3.4-2.2.2-.2.4-.3.6-.5.4-.3.7-.6 1.1-1 .3-.3.6-.6 1-.9.3-.3.5-.6.8-.9.4-.5.9-1 1.3-1.6l.3-.3c.1.1.1.1.2.1.3.3.7.6 1.1.9.7.6 1.3 1.2 2 1.7.4.3.9.6 1.3 1 .7.5 1.3.9 2 1.4l1.5.9c.7.4 1.4.8 2.1 1.1.5.2 1 .5 1.5.7.7.3 1.5.6 2.2.9.5.2 1 .4 1.6.6.8.2 1.6.5 2.4.7.5.1 1 .3 1.5.4.9.2 1.8.3 2.7.4.4.1.9.1 1.3.2 1.4.1 2.7.2 4.1.2 1.2 0 2.5-.1 3.7-.2.5 0 1-.1 1.5-.2l2.1-.3c.6-.1 1.2-.3 1.8-.4.5-.1 1.1-.3 1.6-.4.7-.2 1.3-.4 2-.6.4-.2.9-.3 1.3-.5.7-.3 1.4-.5 2.1-.8.3-.2.7-.3 1-.5.7-.4 1.5-.7 2.2-1.1.2-.1.4-.2.5-.3 1.8-1.1 3.6-2.2 5.2-3.6 5.5 1.7 9.4 6.5 10.1 12l.1 34.7c-.1 7.7-1.4 13.3-4.5 17.9z\" class=\"st0\"\/><\/g><\/svg>"
                },
                {
                    description: "$22 can provide 100 polio vaccine doses", 
                    name: "vaccine",
                    svgstring: "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" viewBox=\"0 0 264.7 264.7\"><g fill=\"#00aeef\"><path d=\"m130.3 123.3-12.7-17.6c-.7-.9-2-1.2-2.9-.5l-6 4.3 7.4 10.5c1 1 .9 2.6-.1 3.5-1 1-2.6.9-3.5-.1-.1-.2-.3-.3-.4-.5l-7.4-10.5-8.2 5.9 7.4 10.5c1 1 .9 2.6-.1 3.5-1 1-2.6.9-3.5-.1-.1-.2-.3-.3-.4-.5l-7.4-10.5-8.3 5.9 7.4 10.5c1 1 .9 2.6-.1 3.5-1 1-2.6.9-3.5-.1-.1-.2-.3-.3-.4-.5L80.2 130l-8.2 5.9 7.4 10.5c1 1 .9 2.6-.1 3.5-1 1-2.6.9-3.5-.1-.1-.2-.3-.3-.4-.5L68 139l-6 4.3c-.9.7-1.2 2-.5 2.9l12.7 17.6c.7.9 2 1.2 2.9.5l52.7-38c1-.7 1.2-2 .5-3 0 .1 0 0 0 0z\"\/><path d=\"M254.9 20.3c-5-7-12.5-11.6-20.9-13-1 0-2-.3-3-.4-7.5-.4-14.8 1.7-20.9 6.1l-58.2 41.8c-4.9-3.8-11.8-4-16.8-.3l-4.5 3.3c-6.4 4.6-7.9 13.5-3.3 19.9l1.6 2.2-77.2 55.4c-5.5 5-9.5 11.4-11.6 18.5v.7c-.2 1.2-.5 2.4-.8 3.6-.4 1.3-1 2.5-1.8 3.7l-6.1 4.3c-1.3 1-1.6 2.9-.7 4.2l9.8 13.6.9 1.4c.5.7 1.2 1.2 2 1.4h.6c.6 0 1.1-.2 1.6-.6l1.5-1 4.5-3.3c1.3-.4 2.7-.6 4.1-.5 1.5 0 3 .2 4.4.4 7.3.3 14.5-1.4 20.9-4.9l.7-.4 76.9-55.4.7 1 .9 1.3c4.6 6.4 13.6 7.8 20 3.2l4.4-3.2c5.2-3.6 7.3-10.2 5.2-16.2l58.1-41.8c14.2-10.7 17.3-30.7 7-45zM78.3 171h-.5c-5.3 3-11.3 4.5-17.4 4.2-1.6-.2-3.1-.3-4.7-.4-2.7-.1-5.3.4-7.7 1.6l-3.5 2.5-7.4-9.8 3.5-2.5c2-1.8 3.4-4.2 4.1-6.8.5-1.4.8-2.9 1-4.4 1.7-6 5-11.4 9.5-15.7l76.9-55.3 22.4 31.4L78.3 171zM243.9 60.2l-60.4 43.2c-1.3.9-1.7 2.7-.9 4.1 2.1 3.5 1.1 8-2.1 10.5l-4.4 3.2c-3.6 2.6-8.7 1.8-11.3-1.8l-3.3-4.8-26.1-36-3.4-4.8c-2.6-3.6-1.7-8.6 1.9-11.2l4.5-3.3c3.3-2.3 7.8-1.7 10.5 1.4 1.1 1.2 2.8 1.4 4.1.5L213.1 18c5.1-3.7 11.3-5.5 17.5-5l2.5.3c14.2 2.5 23.7 16.1 21.2 30.3-1.2 6.6-4.8 12.5-10.2 16.5l-.2.1z\"\/><path d=\"M173.4 93.2c-1 0-1.9-.5-2.5-1.3l-11.6-16.2c-1-1.4-.6-3.4.8-4.4 1.4-1 3.4-.6 4.4.8l11.6 16.2c1 1.4.6 3.4-.8 4.4-.5.3-1.1.5-1.7.6h-.2zM27.5 258.9c-13.4 0-24.3-10.9-24.3-24.3 0-11.5 16.2-40.6 24.3-40.6s24.3 29.1 24.3 40.6c-.1 13.4-10.9 24.3-24.3 24.3zm0-58.5c-4.4 2.8-18 24.4-18 34.2 0 10 8.1 18 18 18s18-8.1 18-18c0-9.8-13.6-31.3-18-34.2z\"\/><path d=\"M26.1 246.4c-1.7.1-3.2-1.1-3.3-2.9-.1-1.7 1.1-3.2 2.9-3.3 3.7-.6 6.7-3.4 7.5-7.1.4-1.7 2.1-2.7 3.8-2.3 1.7.4 2.7 2.1 2.3 3.8-1.4 6.1-6.3 10.7-12.4 11.7l-.8.1z\"\/><\/g><\/svg>"
                }
            ]
        
        let
            iconsFront,
            iconWrappers,
            iconsBack,
            openItems = 0,
            iconScale = 1.08,
            matchedColor = "#A5CF4D",
            mistakeColor = "#EE3224",
            matchedPairCount = 0,
            firstElem,
            startInteractive = false,
            icons = iconObjs.concat(iconObjs),
            imageWrapper = select('#imageWrapper'),
            tl = gsap.timeline(),
            delayedCall;

        ctatext.innerHTML = "Brighten Futures";
        headline.innerHTML = "SEE WHERE YOUR<br> <span class=\'blue\'>DONATIONS GO<\/span>";
        subheadline.innerHTML = "Match the cards to see the supplies your<br>help provides children worldwide.";
        headline2.innerHTML = "DONATE TO<br> HELP CHILDREN<br> <span class=\'blue\'>WORLDWIDE<\/span>";
        subheadline2.innerHTML = "Help provide lifesaving supplies to<br> children and families in need.";

        icons.shuffle();

        // Loading images
        const imagesSrc = [
            {
                name: 'frame1',
                src: "img1.jpg"
            },
            {
                name: 'frame2',
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

        loadImages(imagesSrc)

        imageWrapper.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <clipPath id="clip-0">
            <ellipse  cx="58" cy="58" rx="1" ry="1" id='light1'></ellipse>
          </clipPath>
          <clipPath id="clip-1">
            <ellipse cx="58" cy="58" rx="1" ry="1" id='light2'></ellipse>
          </clipPath>
        </defs>
        <image width="300" height="600" style="clip-path: url(#clip-0);" xlink:href="${imagesSrc[0].src}" id="smImage"></image>
        <image width="300" height="600" style="clip-path: url(#clip-1);" xlink:href="${imagesSrc[1].src}" id="bgImage"></image>
      </svg>`)

        const smImage = select('#smImage')

        for (let i = 0; i < icons.length; i++) {
            let iconWrapper = document.createElement("div"),
                iconBack = document.createElement("div"),
                iconFront = document.createElement("div"),
                spanIcon = document.createElement("div"),
                spanName = document.createElement("span");

            iconBack.classList.add("iconBack");

            iconFront.classList.add("iconFront");

            spanIcon.classList.add("spanIcon");

            spanIcon.innerHTML = icons[i].svgstring;
            spanIcon.style.backgroundPosition = "center center";
            spanIcon.style.backgroundSize = "auto 90%";
            spanIcon.style.backgroundRepeat = "no-repeat";

            spanName.classList.add("spanName");
            spanName.innerHTML = icons[i].name;

            iconFront.appendChild(spanIcon);
            iconFront.appendChild(spanName);
            iconWrapper.appendChild(iconBack);
            iconWrapper.appendChild(iconFront);
            iconWrapper.classList.add("iconWrapper");
            iconWrapper.classList.add(icons[i].name.split(' ')[0]);
            deck.appendChild(iconWrapper);
        }

        let iconsFrontNL = selectAll(".iconFront"),
            iconWrappersNL = selectAll(".iconWrapper"),
            iconsBackNL = selectAll(".iconBack");

        iconsFront = [...iconsFrontNL];
        iconWrappers = [...iconWrappersNL];
        iconsBack = [...iconsBackNL];

        gsap.set(iconsFront, { backfaceVisibility: "hidden" });
        gsap.set(iconsBack, { backfaceVisibility: "hidden", rotationY: -180 });
        gsap.set(iconWrappers, { perspective: 200 });
        gsap.set(iconsFront, { transformStyle: "preserve-3d" });
        gsap.set(iconsBack, { transformStyle: "preserve-3d" });

        animate();

        function setDescription(item, elem) {
            if (elem.classList.contains(item.name.split(' ')[0])) {
                description.innerHTML = item.description;
                let splitDesc = new SplitText(description, { type: "words,chars" });
                gsap.from(splitDesc.chars, { duration: 0.3, stagger: 0.03, x: "+=20", alpha: 0, ease: "power2", delay: 0.3 })
                gsap.fromTo(description, { duration: 0.3, scale: 0 }, { scale: 1, ease: "back" }, "<")
            }
        }

        function checkMatch() {
            let elem = this.targets()[0],
                winColor;
            if (firstElem != elem) {

                if (firstElem.children[1].children[1].innerHTML == elem.children[1].children[1].innerHTML) {
                    winColor = matchedColor;
                    if (++matchedPairCount > iconObjs.length - 1) {
                        tl.play();
                        delayedCall.kill();
                    }
                    iconWrappers = iconWrappers.remByVal(firstElem);
                    iconWrappers = iconWrappers.remByVal(elem);
                    gsap.to([firstElem, elem], { duration: 0.4, scaleX: 1.2, scaleY: 1.1, yoyo: true, repeat: 1, ease: "power.in", yoyoEase: "elastic" });

                    for (let j = 0; j < icons.length; j++) {
                        setDescription(icons[j], elem);
                    }

                } else {
                    winColor = mistakeColor;
                    gsap.to(elem.children, { duration: 0.7, rotationY: "+=180", ease: "back", delay: 0.9 });
                    gsap.to(firstElem.children, { duration: 0.7, rotationY: "+=180", ease: "back", delay: 0.9, onComplete: setAllEvents });
                    gsap.to([firstElem, elem], { duration: 0.4, scale: iconScale, yoyo: true, repeat: 1, ease: "sine" });
                }

                gsap.to([firstElem.children[1], elem.children[1]], { duration: 0.1, backgroundColor: winColor, yoyo: true, repeat: 1, ease: "none", repeatDelay: 0.6 });
                gsap.to([firstElem.getElementsByTagName("g"), elem.getElementsByTagName("g")], { duration: 0.1, fill: "white", yoyo: true, repeat: 1, ease: "none", repeatDelay: 0.6 });
                gsap.to([firstElem.getElementsByTagName("span"), elem.getElementsByTagName("span")], { duration: 0.1, color: "white", yoyo: true, repeat: 1, ease: "none", repeatDelay: 0.6 });

                gsap.delayedCall(1.4, setAllEvents);
                openItems = 0;
            } else {
                setAllEvents();
                removeEvents(elem);
            }
        }

        function iconOver(e) {
            gsap.to(e.target, { duration: 0.4, scale: iconScale, ease: "back" });
        }

        function iconOut(e) {
            gsap.to(e.target, { duration: 0.4, scale: 1, ease: "back" });
        }

        function iconClick(e) {
            if (!startInteractive) startInteractive = true;

            delayedCall.kill();

            if (openItems++ < 1) {
                firstElem = e.target;
            }

            gsap.to(e.target.children, { duration: 0.5, rotationY: "+=180", ease: "back" });
            gsap.to(e.target, { duration: 0.5, scale: 1, ease: "sine", onComplete: checkMatch });

            removeAllEvents();
        }

        function setAllEvents() {
            iconWrappers.forEach(setEvents);
        }

        function removeAllEvents() {
            iconWrappers.forEach(removeEvents);
        }

        function setEvents(element) {
            element.addEventListener("mouseover", iconOver, false);
            element.addEventListener("mouseout", iconOut, false);
            element.addEventListener("click", iconClick, false);
        }

        function removeEvents(element) {
            element.removeEventListener("mouseover", iconOver, false);
            element.removeEventListener("mouseout", iconOut, false);
            element.removeEventListener("click", iconClick, false);
        }

        // Animation
        function autoClick() {
            let secondElem;
            //get random icon
            firstElem = iconWrappers[Math.floor(iconWrappers.length * Math.random())];

            //find the same icon with random
            for (let i = 0; i < iconWrappers.length; i++) {
                if (iconWrappers[i] != firstElem && firstElem.children[1].children[1].innerHTML == iconWrappers[i].children[1].children[1].innerHTML) {
                    secondElem = iconWrappers[i];
                }
            }

            gsap.to([firstElem.children, secondElem.children], { duration: 0.7, rotationY: "+=180", ease: "back" });
            gsap.to(secondElem, { duration: 0.3, scale: 1, ease: "sine", onComplete: checkMatch });

            removeEvents(firstElem);
            removeEvents(secondElem);

            delayedCall = gsap.delayedCall(4, autoClick);
        }

        function animate() {

            tl
                .to(wrect, { duration: 0.7, alpha: 0, ease: "none" })

                .from(logo, { duration: 0.7, scale: 2, alpha: 0, ease: "back" }, "<0.5")

                .from(imageWrapper, { opacity: 0 }, "<")

                .to("#light1", { scale: 250, duration: 1.5, transformOrigin: "30% 60%", ease: "power2.inOut" }, "<0.2")

                .from(headline, { duration: 0.8, y: "-=70", alpha: 0, ease: "back" }, "<0.8")

                .from(iconWrappers, { duration: 0.7, stagger: { each: 0.1, from: "random" }, ease: "back", scale: 0 }, "<0.5")

                .from(cta, { duration: 0.5, y: "+=50", alpha: 0, ease: "back" }, ">-0.5")

                .to([iconsFront, iconsBack], { duration: 1.2, rotationY: "+=180", ease: "back.inOut", onComplete: setAllEvents }, ">1.5")

                .to(headline, {
                    duration: 0.5, alpha: 0, scale: 0, ease: "back.in", onComplete: function () {
                        subheadline.style.display = "inline-block";
                        description.style.display = "inline-block";
                        headline.style.fontSize = "39px";
                        text.style.top = "184px";
                    }
                }, "<")

                .to(headline, { duration: 0.8, alpha: 1, scale: 1, ease: "back" }, ">")
                .from(subheadline, { duration: 0.8, alpha: 0, scale: 0, ease: "back" }, "<0.1")

                .call(function () {
                    tl.pause();
                    delayedCall = gsap.delayedCall(3, autoClick);
                })

                .to(iconWrappers, {
                    duration: 0.5, stagger: { each: 0.05, from: "random", },
                    onComplete: function () { deck.style.display = "none" },
                    ease: "back.in",
                    scale: 0
                }, ">2.5")

                .to(cta, { duration: 0.5, scale: 0, ease: "back.in" }, ">-0.4")

                .to(text, { duration: 1, y: "+=175", alpha: 0, ease: "power2.inOut" }, ">-0.4")

                .to(logo, { duration: 0.5, scale: 0.8, repeat: 1, yoyo: true, force3D: true, rotation: 0.001, ease: "power2.inOut" }, "<")

                .to(smImage, { duration: 0.7, alpha: 0 }, "<")

                .to("#light2", { scale: 450, duration: 1.4, transformOrigin: "40% 60%", ease: "power2.inOut" }, "<0.2")

                .from([headline2, subheadline2], { duration: 0.5, stagger: 0.1, scale: 0, ease: "back" }, "<0.3")

                .to(cta, { duration: 0.5, scale: 1, ease: "back" }, ">-0.1")

                .to(ctaafter, { x: "+=600", duration: 1, ease: "none", yoyo: true, repeat: 1 }, ">0.2")
        }

    }

    // Helpers
    Array.prototype.remByVal = function (val) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === val) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    }

    Array.prototype.shuffle = function () {
        let i = this.length, j, temp;
        if (i == 0) return this;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
        return this;
    }

}