function setBrightnessLevel(level) {
	alert("Brightness");
	//tizen.power.setScreenBrightness(level);
	tizen.power.turnScreenOff();
}
function postData(){
	myname = document.getElementById("name").value;
	localStorage.setItem('hello', myname);
}