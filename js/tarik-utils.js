const white = "#FFF";
const mobile = "mobile";
const active = "active";

function show(id) {
	$(id).removeClass('hide');
	$(id).addClass('fadeAnim');
}

function toast(html) {
	M.toast({ html: html, classes: "blue-grey darken-1 rounded right" });
}

function loadProgress(bool) {
	if (bool == true || bool == 1) {
		const loader = "#loader";
		$(loader).removeClass("load-finish");
		$(loader).addClass("load");
	} else {
		$(loader).removeClass("load");
		$(loader).addClass("load-finish");
	}
}

function hideMenu() {
	document.getElementById(
		"contextMenu").style.display = "none"
}

function rightClick(e) {
	e.preventDefault();

	var x = e.clientX, y = e.clientY;
	var selectedElement = document.elementFromPoint(x, y);
	if (selectedElement) {
		if (!selectedElement.id.startsWith("_")) return;
	} else {
		return;
	}
	log("selectedElement: " + selectedEl);
	$("#contextMenuElId").text("Selected EL: " + selectedElement.id);
	selectEl(selectedElement.id.substr(1));

	var menu = document.getElementById("contextMenu")

	menu.style.display = 'block';
	menu.style.left = e.pageX + "px";
	menu.style.top = e.pageY + "px";
}

$(document).ready(function () {
	//document.onclick = hideMenu;
	//document.oncontextmenu = rightClick;
	$('.tooltipped').tooltip();
	$('.modal').modal();
	$('.collapsible').collapsible({
		accordion: false
	});
	$('.tabs').tabs();
});

function log(text) {
	console.log(text);
}