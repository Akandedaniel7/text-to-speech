const textarea = document.querySelector('textarea'),
// voiceList = document.querySelector('select'),
speechBtn = document.querySelector('button');

// let synth = speechSynthesis;

function textTpSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

speechBtn.addEventListener('click', e => {
    e.preventDefault();
    if(textarea.value !== '') {
        textTpSpeech(textarea.value);
    }
})