let progress = 0;
let firstIndex = 0;
let itemLength = 4;
let prevItem;
let focusedItem;
let nextItem;

function setFocus(index) {
	document.querySelectorAll(".item-box").forEach((tag) => {
			tag.classList.add("hidden");
			tag.classList.remove("item-box-shade");
			tag.classList.id = "";
		}
	)
	document.getElementById(`item-${index}`).classList.remove("hidden");
	if (index == firstIndex) {
		document.getElementById(`item-${index+1}`).classList.remove("hidden");
		document.getElementById(`item-${index+1}`).classList.add("item-box-shade");
		document.getElementById(`item-${index+1}`).classList.add("item-down");

	}
	else if (index == itemLength - 1) {
		document.getElementById(`item-${index-1}`).classList.remove("hidden");
		document.getElementById(`item-${index-1}`).classList.add("item-box-shade");
		document.getElementById(`item-${index-1}`).classList.add("item-up");
	}
	else {
		document.getElementById(`item-${index-1}`).classList.remove("hidden");
		document.getElementById(`item-${index-1}`).classList.add("item-box-shade");
		document.getElementById(`item-${index-1}`).classList.add("item-up");
		document.getElementById(`item-${index+1}`).classList.remove("hidden");
		document.getElementById(`item-${index+1}`).classList.add("item-box-shade");
		document.getElementById(`item-${index+1}`).classList.add("item-down");
	}
}

