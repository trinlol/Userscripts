// ==UserScript==
// @name         Twitch Video Controls
// @namespace    https://twitch.tv
// @version      1.12
// @description  Add play/pause and mute/volume controls to Twitch
// @author       trinlol
// @match        https://www.twitch.tv/*
// @icon         https://raw.githubusercontent.com/trinlol/Userscripts/main/twitch-video-controls.png
// @license MIT
// @homepage     https://github.com/trinlol/Userscripts/blob/main/twitch-video-controls.js
// @downloadURL  https://update.greasyfork.org/scripts/483649/Twitch%20Video%20Controls.user.js
// @updateURL    https://update.greasyfork.org/scripts/483649/Twitch%20Video%20Controls.meta.js
// ==/UserScript==

function $(selector) {
    return document.querySelector(selector);
}


function on(el, event, callback) {
    el.addEventListener(event, callback);
}

on(window, 'load', () => {

    const overlay = document.createElement('div');

    // Change the top & left values to adjust the position of the controls. As per monitor size, windows size etc.
    overlay.style.cssText = `
    position: fixed;
    top: 92%;
    left: 35%;
    transform: translate(-50%, -50%);
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1000;
  `;

    const playPauseText = document.createElement('a');
    playPauseText.textContent = 'Play/Pause';
    playPauseText.style.cssText = `
    color: white;
    cursor: pointer;
    margin-right: 10px;
  `;

    on(playPauseText, 'click', () => {
        const playPauseButton = $('button[data-a-target="player-play-pause-button"]');
        if (playPauseButton) playPauseButton.click();
    });

    const observer = new MutationObserver(() => {
        const playPauseButton = $('button[data-a-target="player-play-pause-button"]');
        if (playPauseButton) {
            playPauseText.textContent = playPauseButton.getAttribute('aria-label') === 'Play (space/k)' ? 'Play' : 'Pause';
        }
    });

    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-label']
    });

    const muteText = document.createElement('a');
    muteText.textContent = 'Mute';
    muteText.style.cssText = `
    color: white;
    cursor: pointer;
    margin-right: 10px;
  `;

    on(muteText, 'click', () => {
        const muteButton = $('button[data-a-target="player-mute-unmute-button"]');
        if (muteButton) muteButton.click();
    });

    const muteObserver = new MutationObserver(() => {
        const muteButton = $('button[data-a-target="player-mute-unmute-button"]');
        if (muteButton) {
            muteText.textContent = muteButton.getAttribute('aria-label') === 'Mute (m)' ? 'Mute' : 'Unmute';
        }
    });

    muteObserver.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-label']
    });

    overlay.appendChild(playPauseText);
    overlay.appendChild(muteText);
    document.body.appendChild(overlay);

});
