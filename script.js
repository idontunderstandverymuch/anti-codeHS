// ==UserScript==
// @name         anti-codehs
// @namespace    http://tampermonkey.net/
// @version      2024-08-05
// @description  i hate codehs
// @author       eshaaneshaan
// @match        https://codehs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const textbox = document.createElement('textarea');
    const button = document.createElement('button');
    let textToInsert = ``;

    textbox.style.position = 'fixed';
    textbox.style.bottom = '50px';
    textbox.style.left = '50%';
    textbox.style.transform = 'translateX(-50%)';
    textbox.style.width = '80%';
    textbox.style.height = '100px';
    textbox.style.zIndex = '10000';

    button.innerText = 'Enter';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.width = '80%';
    button.style.zIndex = '10000';


    document.body.appendChild(textbox);
    document.body.appendChild(button);

    const targetTextarea = document.getElementById('ace_text-input-textarea');
    if (!targetTextarea) {
        console.error('Target textarea not found.');
        return;
    }

    button.addEventListener('click', () => {
        if (targetTextarea) {
            textToInsert = textbox.value;
            const event = new Event('input', { bubbles: true });
            targetTextarea.dispatchEvent(event);

            textbox.style.display = 'none';
            button.style.display = 'none';

            executeCustomScript();
        }
    });

    function executeCustomScript() {
        function insertTextWithDelay(text, delay, randomDelayChance, randomDelay) {
            let index = 0;

            if (window.textInterval) {
                clearInterval(window.textInterval);
            }

            window.textInterval = setInterval(() => {
                if (index < text.length) {
                    targetTextarea.value += text.charAt(index);
                    index++;

                    if (text.charAt(index - 1) === '\n') {
                        if (Math.random() < randomDelayChance) {
                            clearInterval(window.textInterval);
                            window.textInterval = setTimeout(() => {
                                insertTextWithDelay(text.substring(index), delay, randomDelayChance, randomDelay);
                            }, randomDelay);
                            return;
                        }
                    }

                    const event = new Event('input', { bubbles: true });
                    targetTextarea.dispatchEvent(event);
                } else {
                    clearInterval(window.textInterval);
                }
            }, delay);
        }


        insertTextWithDelay(textToInsert, 100, 0.10, 14000);
    }

})();
