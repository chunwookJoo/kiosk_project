// 브라우저의 음성인식 인터페이스 가져오기
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// true: 연속된 음절 인식, false: 한 음절만 기록
recognition.interimResults = true;

// 값이 없으면 HTML의 <html lang="en">을 참고; "ko-KR", "en-US" 등 사용
recognition.lang = "ko-KR";

// true: 연속으로 인식, false: 한 번만 인식
recognition.continuous = false;

// 작을수록 발음에 근접한 결과, 클수록 문장에 적합한 단어로 대체한 결과
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
recognition.maxAlternatives = 10000;

let p = document.createElement("p");
p.classList.add("para");
let words = document.querySelector(".stt");
words.appendChild(p);
let speechToText = "";
recognition.addEventListener("result", (e) => {
	let interimTranscript = "";
	for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
		let transcript = e.results[i][0].transcript;
		console.log(transcript);
		if (e.results[i].isFinal) {
			speechToText += transcript;
		} else {
			interimTranscript += transcript + "...";
		}
	}
	document.querySelector(".para").innerHTML = speechToText + interimTranscript;
});
// 음성인식이 끝나면 자동으로 재시작합니다.
recognition.addEventListener("end", async () => {
	document.querySelector(".recording").style.visibility = "hidden";
	document.querySelector(".loading").style.visibility = "visible";
	let order_str = encodeURI(speechToText);
	let nlpRequest = new Request(`/nlp/${order_str}`);
	await fetch(nlpRequest, {headers : { 
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	   }}).then(async (res) => {
		stt_result = await res.json();
		console.log(stt_result["result"]);
		document.querySelector(".id").innerHTML += stt_result["result"]
	}).then(msg => {console.log(msg)});
	setTimeout(()=>{speechToText = "";}, 3000);
	document.querySelector(".loading").style.visibility = "hidden";
	document.querySelector(".recording").style.visibility = "visible";
	recognition.start();
});
// 음성 인식 시작
recognition.start();