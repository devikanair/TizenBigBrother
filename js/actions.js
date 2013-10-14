function setBrightnessLevel(level) {
	alert("Brightness");
	//tizen.power.setScreenBrightness(level);
	tizen.power.turnScreenOff();
}
function postData(){
	alert("hello")
	myname = document.getElementById("name").value;
	localStorage.setItem('hello', myname);
}