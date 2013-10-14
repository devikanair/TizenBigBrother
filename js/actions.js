function setBrightnessLevel(level) {
	alert("Brightness");
	//tizen.power.setScreenBrightness(level);
	tizen.power.turnScreenOff();
}
function postData(){

	alert("HERE");
	
	//myEvent.name = $("#name").html();
	name = document.myform.name.value;
	active="Yes";
	type = document.myform.type.value;
	extra = document.myform.filters.value;
	atype = document.myform.action.value;
	aextra = document.myform.actionfilter.value;
	
	//myEvent.type = document.getElementById("type").value;
	//myEvent.extr = document.getElementById("filters").value;
	//myEvent.action = document.getElementById("action").value;
	//myactionfilter = document.getElementById("actionfilter").value;

	
	//alert("Got "+ name + active + type + extra + atype + aextra);// + myEvent.extr);
alert("Setting "+ name + active + type + extra + atype + aextra);		
	action = setAction(atype, aextra);
	trigger = setEvent(name, active, extra, atype, aextra); 
	storeEvent(trigger);

}