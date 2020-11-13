// 브라우저의 음성인식 인터페이스 가져오기
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

let screen = 1;
let order_id = document.getElementById("order-id");
let order_confirm = false;

let menus = ['메뉴', '싱글', '세트', '음료', '사이드', '매장', '포장', '주문', '결제', 
'하나', '한', '일', '둘', '두', '이', '셋', '세', '삼', '넷', '네', '사',
'다섯', '오', '여섯', '육', '일곱', '칠', '여덟', '팔', '아홉', '구', '열', '십',
'스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔', '백', '영',
'불고기', '버거', '새우', '치킨', '와퍼', '세트', '감자', '튀김', '너겟', 
'어니언링', '양념', '콜라', '사이다', '환타', '맥주'];
let grammarMenu = '#JSGF V1.0; grammar menus; ' + 'public <menu> = ' + menus.join(' | ') + ' ;';

let recognition = new SpeechRecognition();
let grammarList = new SpeechGrammarList();
grammarList.addFromString(grammarMenu, 1);

recognition.grammars = grammarList;

// true: 연속으로 인식, false: 한 번만 인식
recognition.continuous = false;

// 값이 없으면 HTML의 <html lang="en">을 참고; "ko-KR", "en-US" 등 사용
recognition.lang = "ko-KR";

// true: 연속된 음절 인식, false: 한 음절만 기록
recognition.interimResults = true;

// 작을수록 발음에 근접한 결과, 클수록 문장에 적합한 단어로 대체한 결과
// maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
recognition.maxAlternatives = 10;

ws = "<strong>";
we = "</strong>";

kioskScenario = [
	["다시 말씀해주시길 바랍니다.",],
	[`반갑습니다. 다산리아입니다. 주문하시려면 ${ws}주문${we}이라고 말씀해주세요.`,],
	[`매장을 이용하시려면 ${ws}매장${we}, 포장하시려면 ${ws}포장${we}이라고 말씀해주세요.`,],
	["세트 메뉴", "싱글 메뉴", "사이드 메뉴", "음료"],
	["불고기 버거 세트", "새우 버거 세트", "치킨 버거 세트", "와퍼 세트"],
	["불고기 버거", "새우 버거", "치킨 버거", "와퍼"],
	["감자 튀김", "양념 감자", "치킨 너겟", "어니언 링"],
	["콜라", "사이다", "환타", "맥주"],
	[`주문 내용이 맞으시면 ${ws}결제${we}라고 말씀해주세요.`, "결제하시려면 IC 카드를 방향에 맞게 꽂아주세요.",],
	[" 중에서 원하시는 걸 말씀해주세요.", `${ws}와퍼 하나${we}와 같이 메뉴와 수량을 말씀해주세요.`, `결제하시려면 ${ws}결제${we}라고 말씀해주세요.`,],
];



let texts = document.querySelector(".stt");
let speechToText = "";

recognition.onstart = () => {
	document.querySelector(".loading").style.visibility = "hidden";
	document.querySelector(".recording").style.visibility = "visible";
};
recognition.onspeechend = () => {
	document.querySelector(".loading").style.visibility = "visible";
	document.querySelector(".recording").style.visibility = "hidden";
	recognition.stop();
};

recognition.onresult = (event) => {
	let interimTranscript = " ";
	let resultLength = event.results.length;
	console.log(event.results);
	for (let i = event.resultIndex; i < resultLength; i++) {
		let transcript = event.results[i][0].transcript;
		if (event.results[i].isFinal) {
			speechToText += transcript;
		} else {
			interimTranscript += transcript;
		}
	}
	document.getElementById("stt").innerHTML = speechToText + interimTranscript;
};


recognition.onend = async () => {
	let sttEncoded = encodeURI(speechToText);
	let nlpRequest = new Request(`/nlp/${sttEncoded}`);
	await fetch(nlpRequest, {headers : { 
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}}).then(async (res) => {
		sttResult = await res.json();
		menuResult = sttResult["result"];
		if (menuResult == 0) {
			if (screen == 1) speech(kioskScenario[1][0]);
			else speech(kioskScenario[0][0]);
		}
		else if (menuResult == 9) {
		}
		else {
			screen = menuResult;
			document.querySelectorAll('.box').forEach((tag) => {
				tag.classList.add("hidden");
			});
			document.querySelector(`#box-${menuResult}`).classList.remove("hidden");
			if (screen == 1 || screen == 2) {
				order_confirm = false;
				speech(kioskScenario[screen]);
			} else if (screen == 8) {
				if (!order_confirm) {
					order_confirm = true;
					speech(kioskScenario[8][0]);
				}
				else {
					order_confirm = false;
					speech(kioskScenario[8][1]);
				}
			} else if (screen == 3) {
				order_confirm = false;
				let hotg = document.getElementById("here-or-to-go");
				if (sttResult[0]["name"] == "매장")
					hotg.innerHTML = "매장";
				else if (sttResult[0]["name"] == "포장")
					hotg.innerHTML = "포장";
				let tmp_text = "<strong>" + kioskScenario[screen].join("</strong>, <strong>") + "</strong>" + kioskScenario[9][0];
				speech(tmp_text);
			} else {
				order_confirm = false;
				let tmp_text = "<strong>" + kioskScenario[screen].join("</strong>, <strong>") + "</strong>" + kioskScenario[9].join(" <br>");
				speech(tmp_text);
			}
		}
	}).then(msg => {console.log(msg)});
	setTimeout(()=>{speechToText = "";}, 1000);
};

// 음성 인식 시작
// recognition.start();