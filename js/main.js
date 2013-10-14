/*
 *      Copyright 2012  Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */
var loop=true;
/* ======================= Local storage (Event) ======================= */

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

//Store "myEvent" into offline storage
function storeEvent(myEvent) {	
  eventHash = localStorage.getObj('eventHash');
  if (eventHash == null) {
    eventHash = {};
    eventHash[myEvent.name] = myEvent;
  } else {
    eventHash[myEvent.name] = myEvent;
  }

  localStorage.setObj('eventHash',eventHash)
}

function setAction(type, extra) {
	myAction=new Object();
	myAction.type=type;
	myAction.extra=extra;
	return myAction;
}

function setEvent(name, active, type, extra, action) {
	myEvent=new Object();
	myEvent.name = name;
	myEvent.active=active;
	myEvent.type=type;
	myEvent.extra=extra;
	myEvent.action=action;
	return myEvent;
}

window.setInterval(function(){
	  /// call your function here
//$(document).ready(function(){
//function getAllTriggers(){
//	alert("Call get all triggers");
	//localStorage.clear();
	//action = setAction("Tweet", "Hello I am hacking");
	//trigger = setEvent("Tweet for CMUSV", "Yes", "Wifi", "SSID 50", action);
		
	//storeEvent(trigger);

	//Sample html
	//var x=document.getElementById("active");
	//x.innerHTML="<b><i>Hello world</i></b>";
	
	//Loop through all localStorage?
	$("#active").empty();//="";
	for (i=0; i<=localStorage.length-1; i++) { // i<100 works perfectly
	//	alert("Element "+ i);
		key = localStorage.key(i);
		val = localStorage.getItem(key);
		$('#active').append(key + val);
			
		//value = val.split(","); //splitting string inside array to get name
		//name[i] = value[1]; // getting name from split string
	}
	//alert("Ended call triggers");

//});
}, 1000);



//infinite loop
function infinite() {

	if (loop)
	{	getSystemProperty("WIFI_NETWORK", onWifiSuccess);

	function onWifiSuccess(wifi) {
		
		if(wifi.status == "ON") {
			alert("s");
/*
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://zapier.com/hooks/catch/n/tr8ng/", true);
			xhr.send(); */
			loop =false;
			alert("t");
		}
	}
	
	  setTimeout(infinite, 1000);}


}

var gInfoTitle = "", gInfo = "", gBatteryListener;

function errorCallback(message) {

	alert("some error");
}

$(document).delegate("#main", "pageinit", function() {
	$("#calendar").bind("vclick", function() {

		verifyCalendar();

		return false;
	});

	$("#newcalendar").bind("vclick", function() {

		newCalendar();

		return false;
	});

	$("#storage-info").bind("vclick", function() {

		verifyCalendar();

		return false;
	});
	$("#battery-info").bind("vclick", function() {

		return false;
	});
	$("#cpu-info").bind("vclick", function() {
		getSystemProperty("CPU", onCpuInfoSuccess);
		return false;
	});
	$("#display-info").bind("vclick", function() {
		getSystemProperty("DISPLAY", onDisplaySuccess);
		return false;
	});

	$("#orientation-info").bind("vclick", function() {
		getSystemProperty("DEVICE_ORIENTATION", onOrientationSuccess);
		return false;
	});
	$("#perform-action").bind("vclick", function() {
		setBrightnessLevel(0.4);
		return false;
	});
	$(window).on('tizenhwkey', function(e) {
		if (e.originalEvent.keyName === "back") {
			if ($.mobile.activePage.attr('id') === 'main') {
				tizen.application.getCurrentApplication().exit();
			} else {
				history.back();
			}
		}
	});
});

$(document).delegate("#info", "pageinit", function() {
	$("#info").bind("pagebeforeshow", function() {
		$("#info-title").html(gInfoTitle);
		$("#info-list").html(gInfo).trigger("create").listview("refresh");
	});
});

function onError(e) {
	alert("Error: " + e.message);
}

function make2lineListItem(title, value) {
	return '<li class="ui-li-has-multiline ui-li-text-ellipsis">' + title
			+ '<span class="ui-li-text-sub">' + value + '</span></li>';
}

function make1lineListItem(value) {
	return '<li>' + value + '</li>';
}

function makeDividerListItem(value) {
	return '<li data-role="list-divider">' + value + '</li>';
}

function onStorageSuccess(storages) {
	gInfoTitle = "Storages (" + storages.units.length + ")";
	gInfo = "";
	for ( var i = 0; i < storages.units.length; i++) {
		gInfo += makeDividerListItem("Storage " + (i + 1))
				+ make2lineListItem("Type", storages.units[i].type)
				+ make2lineListItem("Capacity", Math
						.floor(storages.units[i].capacity / 1000000)
						+ " MB")
				+ make2lineListItem("Available capacity", Math
						.floor(storages.units[i].availableCapacity / 1000000)
						+ " MB")
				+ make2lineListItem("Removable",
						(storages.units[i].isRemoveable == true ? "Yes" : "No"));
	}

	$.mobile.changePage("#info");
}

function onBatterySuccess(battery) {
	gInfoTitle = "Battery";
	gInfo = make2lineListItem("Level", battery.level)
			+ make2lineListItem("Charging", (battery.isCharging == true ? "Yes"
					: "No"));

	$.mobile.changePage("#info");
}

function onCpuInfoSuccess(cpu) {
	gInfoTitle = "CPU";
	gInfo = make2lineListItem("Load", cpu.load);

	$.mobile.changePage("#info");
}

function onDisplaySuccess(display) {
	gInfoTitle = "Display";
	gInfo = makeDividerListItem("Resolution")
			+ make2lineListItem("Width", display.resolutionWidth)
			+ make2lineListItem("Height", display.resolutionHeight)
			+ makeDividerListItem("Dots per inch")
			+ make2lineListItem("Horizontal", display.dotsPerInchWidth)
			+ make2lineListItem("Vertical", display.dotsPerInchHeight)
			+ makeDividerListItem("Physical size")
			+ make2lineListItem("Width", display.physicalWidth)
			+ make2lineListItem("Height", display.physicalHeight)
			+ makeDividerListItem("Brightness")
			+ make1lineListItem(display.brightness);

	$.mobile.changePage("#info");
}

function onDeviceSuccess(device) {
	gInfoTitle = "Device";
	gInfo = make2lineListItem("IMEI", device.imei)
			+ make2lineListItem("Model", device.model)
			+ make2lineListItem("Version", device.version)
			+ make2lineListItem("Vendor", device.vendor);

	$.mobile.changePage("#info");
}

function onOrientationSuccess(orientation) {
	gInfoTitle = "Device orientation";
	gInfo = make2lineListItem("Status", orientation.status);

	tizen.power.setScreenBrightness(0.2);

	$.mobile.changePage("#info");
}

function getSystemProperty(property, onSuccess) {
	try {
		tizen.systeminfo.getPropertyValue(property, onSuccess, onError);
	} catch (e) {
		alert("Exception: " + e.message);
	}
}
