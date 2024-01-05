// ==UserScript==
// @name         Twitch video controls fixer
// @namespace    https://twitch.tv
// @version      1.2
// @description  Fix twitch.tv video controls
// @author       trinlol
// @match        https://www.twitch.tv/*
// @icon         https://raw.githubusercontent.com/trinlol/Userscripts/main/twitch-video-controls.png
// @license MIT
// @homepage     https://github.com/trinlol/Userscripts/blob/main/twitch-video-controls.js
// @downloadURL  https://update.greasyfork.org/scripts/483649/Twitch%20Video%20Controls.user.js
// @updateURL    https://update.greasyfork.org/scripts/483649/Twitch%20Video%20Controls.meta.js
// ==/UserScript==

(function() {
    'use strict';

    function $(selector) {
        return document.querySelector(selector);
    }

    function on(el, event, callback) {
        el.addEventListener(event, callback);
    }

    on(window, 'load', () => {
        const adObserver = new MutationObserver(function(mutations) {
            const adElement = $('div[data-test-selector="sda-wrapper"].stream-display-ad__wrapper.stream-display-ad__wrapper_lower-third.stream-display-ad__wrapper-visible');
            if (adElement) {
                adElement.remove();
            }
        });

        const config = { attributes: true, childList: true, subtree: true };

        adObserver.observe(document.body, config);

    });

})();
 
