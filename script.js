var textarea = document.getElementById('ace_text-input-textarea');
var textToInsert = `test1
test2
test3`;

function insertTextWithDelay(text, delay, randomDelayChance, randomDelay) {
    let index = 0;

    if (window.textInterval) {
        clearInterval(window.textInterval);
    }

    window.textInterval = setInterval(() => {
        if (index < text.length) {
            textarea.value += text.charAt(index);
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

            var event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
        } else {
            clearInterval(window.textInterval);
        }
    }, delay);
}

insertTextWithDelay(textToInsert, 100, 0.10, 14000);
