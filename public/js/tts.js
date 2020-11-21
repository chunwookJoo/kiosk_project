let voices = [];
let kor_voices = [];
let lang = 'ko-KR';

function getVoiceList() {
	voices = window.speechSynthesis.getVoices();
	for(i = 0; i < voices.length ; i++) {
		if (voices[i].lang == lang || voices[i].lang == lang.replace("-", "_"))
			kor_voices.push(voices[i]);
	}
}

getVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
	speechSynthesis.onvoiceschanged = getVoiceList;
}

let utterThis = new SpeechSynthesisUtterance();

utterThis.onend = function(event) {
	if (movePage) {
		screen = 1;
		totalPrice = 0;
		movePage = false;
		orderConfirm = false;
		hotgConfirm = false;
		completed = false;
		cartEmpty = true;

		price[0].forEach((val) => {
			cart[val.replaceAll(" ", "")] = 0;
		})
		document.querySelector("#here-or-to-go").innerHTML = "";
		document.querySelector(".items").innerHTML = "";
		document.getElementById("total-price").innerHTML = "";
		document.getElementById("order-id").innerHTML = ++orderNum;

		showBox();
		orderConfirm = false;
		printAndSpeech(kioskScenario[screen][0]);
	}
	else if (completed) {
		movePage = true;
		printAndSpeech(kioskScenario[8][2]);
	}
	else recognition.start();
};

utterThis.onerror = function(event) {
	if (movePage) location.href = `/voice/${Number(document.getElementById("order-id").innerHTML) + 1}`;
	else if (completed) {
		movePage = true;
		printAndSpeech(kioskScenario[8][2]);
	}
	else {
		recognition.start();
		console.log(event);
	}
};

utterThis.voice = kor_voices[1];
utterThis.lang = lang;

function speech(text) {
	if (utterThis.voice == null) {
		utterThis.voice = kor_voices[0];
		if (utterThis.voice.name.substr(0, 6) == "Google") {
			utterThis.pitch = 1;
			utterThis.rate = 1.05; //속도
		} else if (utterThis.voice.name.substr(0, 9) == "Microsoft") {
			utterThis.pitch = 1.2;
			utterThis.rate = 1.6; //속도
		}
	}
	utterThis.text = text.replaceAll("<strong>", "").replaceAll("</strong>", "").replaceAll("<br>", "");
	if(!window.speechSynthesis) {
		console.log("음성 재생 미지원");
		return;
	}
	speechSynthesis.speak(utterThis);
}
