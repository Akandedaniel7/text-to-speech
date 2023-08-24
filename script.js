const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speakButton = document.getElementById("speak-btn");
const synth = window.speechSynthesis;

window.speechSynthesis.onvoiceschanged = function () {
  populateVoiceList();
};

function populateVoiceList() {
  const voices = synth.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

let utterance = new SpeechSynthesisUtterance();

voiceSelect.addEventListener("change", () => {
  const selectedVoice = voiceSelect.value;
  utterance.voice = synth
    .getVoices()
    .find((voice) => voice.name === selectedVoice);
});

speakButton.addEventListener("click", () => {
  const text = textInput.value;
  if (text !== "") {
    utterance.text = text;
    synth.speak(utterance);
  }
});

utterance.onend = () => {
  // After speech synthesis is done, generate an MP3 file
  const text = textInput.value;
  if (text !== "") {
    const audioBlob = new Blob([text], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "speech.mp3";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(audioUrl);
  }
};

