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
    document.addEventListener('keydown', function(event) {
        if (event.key === '\\' || event.key === 'Backslash') {
            if (event.metaKey || event.ctrlKey) {
                const textbox = document.createElement('textarea');
                const button = document.createElement('button');
                let userInput = prompt("What do you want your delay between characters to be in milliseconds? if no answer is inputted, will default to 0.1 second");
                let delay23 = userInput ? parseFloat(userInput) : 100;
                let userInput2 = prompt("What do you want your random break to be? if no answer is inputted, will default to 14 seconds");
                let break23 = userInput2 ? parseFloat(userInput2) : 14000;
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


                    insertTextWithDelay(textToInsert, delay23, 0.10, break23);
                }

                event.preventDefault();
            }
        }
    });


})();
