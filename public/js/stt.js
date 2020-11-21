// 브라우저의 음성인식 인터페이스 가져오기
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
window.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

let price = [
	["불고기 버거 세트", "새우 버거 세트", "치킨 버거 세트", "와퍼 세트",
	"불고기 버거", "새우 버거", "치킨 버거", "와퍼",
	"감자 튀김", "양념 감자", "치킨 너겟", "어니언 링",
	"콜라", "사이다", "환타", "맥주",],
	[3500 ,3800 ,3300 ,4500 ,2000 ,2300 ,1800 ,3000,
		1000, 1400, 2000, 1600, 1000, 1000, 1000, 2500,]
];

let cart = {
	"불고기버거세트":0,
	"새우버거세트":0,
	"치킨버거세트":0,
	"와퍼세트":0,
	"불고기버거":0,
	"새우버거":0,
	"치킨버거":0,
	"와퍼":0,
	"감자튀김":0,
	"양념감자":0,
	"치킨너겟":0,
	"어니언링":0,
	"콜라":0,
	"사이다":0,
	"환타":0,
	"맥주":0
};

let menus = ['메뉴', '싱글', '세트', '음료', '사이드', '매장', '포장', '주문', '결제', 
'하나', '한', '일', '둘', '두', '이', '셋', '세', '삼', '넷', '네', '사',
'다섯', '오', '여섯', '육', '일곱', '칠', '여덟', '팔', '아홉', '구', '열', '십',
'스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔', '백', '영',
'불고기', '버거', '새우', '치킨', '와퍼', '세트', '감자', '튀김', '너겟', 
'어니언링', '양념', '콜라', '사이다', '환타', '맥주', '취소'];
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
recognition.maxAlternatives = 0;

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
	[`주문 내용이 맞으시면 ${ws}결제${we}라고 말씀해주세요.`, "결제하시려면 IC 카드를 방향에 맞게 꽂아주세요.", "이용해주셔서 감사합니다."],
	[`와 같이 메뉴와 수량을 말씀해주세요.`, `결제하시려면 ${ws}결제${we}, 메뉴 이동을 원하시면 `, " 중에서 말씀해주세요.", " 중에서 원하시는 메뉴를 말씀해주세요."],
];

let orderNum = 1;

let movePage = false;
let orderConfirm = false;
let hotgConfirm = false;
let completed = false;
let cartEmpty = true;
let speechToText = "";
let tmpText = "";
let screen = 1;
let totalPrice = 0;

recognition.onstart = () => {
	document.querySelector(".loading").classList.add("hidden");
	document.querySelector(".recording").classList.remove("hidden");
};
recognition.onspeechend = () => {
	document.querySelector(".loading").classList.remove("hidden");
	document.querySelector(".recording").classList.add("hidden");
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
	document.getElementById("stt").innerHTML = speechToText + interimTranscript + " ";
};

function printAndSpeech(text){
	document.getElementById("tts").innerHTML = text;
	speech(text);
}

function showBox(){
	document.querySelectorAll('.Select_Main').forEach((tag) => {
		tag.classList.add("hidden");
	});
	document.querySelector(`#box-${screen}`).classList.remove("hidden");
}

recognition.onend = async () => {
	let hotg = document.getElementById("here-or-to-go");
	let sttEncoded = encodeURI(speechToText);
	speechToText = " ";
	let nlpRequest = new Request(`/nlp/${sttEncoded}`);
	await fetch(nlpRequest, {headers : { 
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}}).then(async (res) => {
		let sttResult = await res.json();
		let menuResult = sttResult["result"];
		let valueResult = [];

		for (let i = 0; i < sttResult["length"]; i++) {
			valueResult.push(sttResult[i]);
		}

		switch (menuResult) {
		case 0:
			if (screen == 1) printAndSpeech(kioskScenario[1][0]);
			else speech(kioskScenario[0][0]);
			break;
		case 9:
			valueResult.forEach(element => {
				if (element["name"]) {
					cartEmpty = false;
					cart[element["name"]] = element["qty"];
				}
			});
			document.querySelector(".items").innerHTML = "";
			totalPrice = 0;
			price[0].forEach((val, index) => {
				let tmpName = val.replaceAll(" ", "");
				if (cart[tmpName] != 0) {
					let tmpPrice = price[1][price[0].indexOf(val)]*cart[tmpName];
					let tmpString = `<tr><td class="product-name">${price[0][index]}</td><td class="product-qty">${cart[tmpName]}</td><td class="product-price">${tmpPrice}</td><tr>`;
					totalPrice += tmpPrice
					document.querySelector(".items").innerHTML += tmpString;
					document.getElementById("total-price").innerHTML = totalPrice;
				}
			});
			tmpText = kioskScenario[9][1] + "원하시는 메뉴를 말씀해주세요.";
			speech(tmpText);
			break;
		default:
			screen = menuResult;
			switch (screen) {
			case 1:
				totalPrice = 0;
				movePage = false;
				orderConfirm = false;
				hotgConfirm = false;
				completed = false;
				cartEmpty = true;
				hotg.innerHTML = "";
				price[0].forEach((val) => {
					cart[val.replaceAll(" ", "")] = 0;
				})
				document.querySelector(".items").innerHTML = "";
				document.getElementById("total-price").innerHTML = "";
			case 2:
				showBox();
				orderConfirm = false;
				printAndSpeech(kioskScenario[screen][0]);
				break;
			case 3:
				orderConfirm = false;
				if (!cartEmpty) {
					screen = 8;
					orderConfirm = true;
				}
				showBox();
				if (sttResult[0]["name"] == "매장") {
					hotg.innerHTML = "매장";
					hotgConfirm = true;
				}
				else if (sttResult[0]["name"] == "포장") {
					hotg.innerHTML = "포장";
					hotgConfirm = true;
				}
				if (!cartEmpty) printAndSpeech(kioskScenario[screen][0]);
				else {
					tmpText = "<strong>" + kioskScenario[screen].join("</strong>, <strong>") + "</strong>" + kioskScenario[9][3];
					printAndSpeech(tmpText);
				}
				break;
			case 4:
			case 5:
			case 6:
			case 7:
				showBox();
				orderConfirm = false;
				tmpText = "<strong>" + kioskScenario[screen][3] + " 하나</strong>" + kioskScenario[9][0] + "<br>" + kioskScenario[9][1] + "<strong>" + kioskScenario[3].join("</strong>, <strong>") + "</strong>" + kioskScenario[9][2];
				document.getElementById("tts").innerHTML = tmpText;
				tmpText = "<strong>" + kioskScenario[screen][3] + " 하나</strong>" + kioskScenario[9][0];
				speech(tmpText);
				break;
			case 8:
				if (cartEmpty) {
					screen = 3;
					showBox();
					orderConfirm = false;
					tmpText = "<strong>" + kioskScenario[screen].join("</strong>, <strong>") + "</strong>" + kioskScenario[9][0];
					printAndSpeech(tmpText);
				}
				else if (!hotgConfirm) {
					screen = 2;
					showBox();
					orderConfirm = false;
					printAndSpeech(kioskScenario[screen][0]);
				}
				else if (!orderConfirm) {
					showBox();
					orderConfirm = true;
					printAndSpeech(kioskScenario[8][0]);
				}
				else {
					showBox();
					completed = true;
					printAndSpeech(kioskScenario[8][1]);
				}
			}
		}
	});
	setTimeout(()=>{speechToText = "";}, 1000);
};

// 음성 인식 시작
// recognition.start();