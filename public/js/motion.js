let progress = 0;
let itemsInMenu = [2,4,4,4,4];
let menuIndex = 0;
let itemIndex = 0;


function setFocus(menu, item) {
	let menuSlider = document.querySelector(`.menu-page>div`);
	let menuX = -menu * 450;
	let itemSlider = document.querySelector(`#menu-${menu}>div`);
	let itemY = 240 - item * 270;
	menuSlider.style.transform = `translate(${menuX}px,0)`;
	itemSlider.style.transform = `translate(0,${itemY}px)`;
}

