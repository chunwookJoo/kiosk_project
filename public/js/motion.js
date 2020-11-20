let progress = 0;
let itemsInMenu = [1,4,4,4,4,2,1,1];
let menuIndex = 0;
let itemIndex = 0;
let itemBoxWidth = 450;
let itemBoxHeight = 270;
let menuPageHeight = 540;
let focusedStartY = (menuPageHeight - itemBoxHeight) / 2;
let cartPageIndex = 6;

let price = [
	["불고기 버거 세트", "새우 버거 세트", "치킨 버거 세트", "와퍼 세트",
	"불고기 버거", "새우 버거", "치킨 버거", "와퍼",
	"감자 튀김", "양념 감자", "치킨 너겟", "어니언 링",
	"콜라", "사이다", "환타", "맥주",],
	[3500, 3800, 3300, 4500, 2000, 2300, 1800, 3000,
	1000, 1400, 2000, 1600, 1000, 1000, 1000, 2500,],
	["/static/Img/Combo_Bulgogi.jpg",
	"/static/Img/Combo_Shrimp.jpg",
	"/static/Img/Combo_Chicken.jpg",
	"/static/Img/Combo_Wafer.jpg",
	
	"/static/Img/Single_Bulgogi.jpg",
	"/static/Img/Single_Shrimp.jpg",
	"/static/Img/Single_Chicken.jpg",
	"/static/Img/Single_Wafer.jpg",
	
	"/static/Img/Side_FrenchFry.jpg",
	"/static/Img/Side.jpg",
	"/static/Img/Side_Chicken.jpg",
	"/static/Img/Side_Onion.jpg",
	
	"/static/Img/Drink_Coke.jpg",
	"/static/Img/Drink_Sprite.jpg",
	"/static/Img/Drink_Fanta.jpg",
	"/static/Img/Drink_Beer.jpg"],
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

function getItem(menu, item) {
	let hotg = document.getElementById("here-or-to-go");
	if (menu > 0 && menu < 5) {
		let tmpCount = 0;
		cart[price[0][(menu - 1) * 4 + item].replaceAll(" ","")]++;
		document.querySelector(".items").innerHTML = "";
		totalPrice = 0;
		let tmpDiv = document.querySelector(`#menu-${cartPageIndex}>div`);
		tmpDiv.innerHTML = "";
		price[0].forEach((val, index) => {
			let tmpName = val.replaceAll(" ", "");
			if (cart[tmpName] != 0) {
				let tmpPrice = price[1][price[0].indexOf(val)]*cart[tmpName];
				let tmpString = `<tr><td class="product-name">${price[0][index]}</td><td class="product-qty">${cart[tmpName]}</td><td class="product-price">${tmpPrice}</td><tr>`;
				totalPrice += tmpPrice;
				document.querySelector(".items").innerHTML += tmpString;
				let tmpItem = document.createElement("div");
				tmpDiv.appendChild(tmpItem);
				tmpItem.classList.add("item-box");
				tmpItem.id = `item-${tmpCount++}`;
				let tmpImage = document.createElement("img");
				tmpItem.appendChild(tmpImage);
				tmpImage.classList.add("item-image")
				let tmpText = document.createElement("h4");
				tmpItem.appendChild(tmpText);
				tmpImage.src = price[2][index];
				tmpText.innerHTML = price[0][index];
				tmpText.innerHTML += ": " + cart[tmpName];
			}
		});
		document.getElementById("total-price").innerHTML = totalPrice;
		itemsInMenu[cartPageIndex] = tmpCount;
	}
	else if (menu == 5) {
		if (item == 0) hotg.innerHTML = "매장";
		else if (item == 1) hotg.innerHTML = "포장";							
	}
	else if (menu == 6) {
		let tmpCount = 0;
		let thisItem = document.querySelector(`#menu-${menu}>div>#item-${item}`);
		let tmpString = thisItem.querySelector("h4").innerHTML.split(":")[0].replaceAll(" ", "");
		cart[tmpString] -= (cart[tmpString] > 0)?(1):(0);
		document.querySelector(".items").innerHTML = "";
		totalPrice = 0;
		let tmpDiv = document.querySelector(`#menu-${cartPageIndex}>div`);
		tmpDiv.innerHTML = "";
		price[0].forEach((val, index) => {
			let tmpName = val.replaceAll(" ", "");
			if (cart[tmpName] != 0) {
				let tmpPrice = price[1][price[0].indexOf(val)]*cart[tmpName];
				let tmpString = `<tr><td class="product-name">${price[0][index]}</td><td class="product-qty">${cart[tmpName]}</td><td class="product-price">${tmpPrice}</td><tr>`;
				totalPrice += tmpPrice;
				document.querySelector(".items").innerHTML += tmpString;
				let tmpItem = document.createElement("div");
				tmpDiv.appendChild(tmpItem);
				tmpItem.classList.add("item-box");
				tmpItem.id = `item-${tmpCount++}`;
				let tmpImage = document.createElement("img");
				tmpItem.appendChild(tmpImage);
				tmpImage.classList.add("item-image")
				let tmpText = document.createElement("h4");
				tmpItem.appendChild(tmpText);
				tmpImage.src = price[2][index];
				tmpText.innerHTML = price[0][index];
				tmpText.innerHTML += ": " + cart[tmpName];
			}
		});
		if (tmpCount == 0) {
			tmpDiv = document.querySelector(`#menu-${cartPageIndex}>div`);
			tmpDiv.innerHTML = '<div><div class="item-box" id="item-0"><img class="item-image" src="" /><h4>주문 내역이 없습니다.</h4></div></div>';
			tmpCount = 1;
		}
		itemsInMenu[cartPageIndex] = tmpCount;
		document.getElementById("total-price").innerHTML = totalPrice;
		item = (item < itemsInMenu[cartPageIndex])?(item):(itemsInMenu[cartPageIndex] - 1);
		--itemIndex;

		setFocus(menu, item);
	}
}

function setFocus(menu, item) {
	let menuSlider = document.querySelector(`.menu-page>div`);
	let menuX = -menu * itemBoxWidth;
	let itemSlider = document.querySelector(`#menu-${menu}>div`);
	let itemY = focusedStartY - item * itemBoxHeight;
	menuSlider.style.transform = `translate(${menuX}px,0)`;
	itemSlider.style.transform = `translate(0,${itemY}px)`;
	document.querySelectorAll(".item-box").forEach(
		(box) => {
			box.classList.remove("focused");
		}
	)
	document.querySelector(`#menu-${menu}>div>#item-${item}`).classList.add("focused");
	document.querySelector(".progress").value = menuIndex;
}

