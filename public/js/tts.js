let voices = [];
let kor_voices = [];
let lang = 'ko-KR';
let utterThis = new SpeechSynthesisUtterance();

utterThis.onend = function (event) {
	recognition.start();
};

utterThis.onerror = function(event) {
	console.log(event);
};

if (window.speechSynthesis.onvoiceschanged !== undefined) {
	window.speechSynthesis.onvoiceschanged = () => {
		voices = window.speechSynthesis.getVoices();
	}
}

for(let i = 0; i < voices.length ; i++) {
	if (voices[i].lang == lang || voices[i].lang == lang.replace('-', '_')) {
		kor_voices.push(voices[i]);alert("verified");
	}
	if (kor_voices.length == 0) console.log('음성 미발견');
}


utterThis.voice = kor_voices[0];
utterThis.lang = lang;
utterThis.pitch = 1;
utterThis.rate = 1; //속도


function speech(text) {
	utterThis.text = text;
	if(!window.speechSynthesis) {
		console.log("음성 재생 미지원");
		return;
	}
	document.getElementById("tts").innerHTML = text;
	window.speechSynthesis.speak(utterThis);
}