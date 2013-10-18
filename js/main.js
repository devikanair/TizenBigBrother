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
//localStorage.clear();
var loop = true;

/* ======================= Local storage (Event) ======================= */

Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}

function setAction(type, extra) {
	myAction = new Object();
	myAction.type = type;
	myAction.extra = extra;
	return myAction;
}

window
		.setInterval(
				function() {

					event = parseEvents();
					var active = "";
					for (i = 0; i <= event.length - 1; i++) {

						if (event[i].active != "No")
							active = active
									+ "<li  class='ui-li ui-li-static ui-btn-up-c' id='event"
									+ i
									+ "'>"

									+ event[i].name

									
									+ '<div class="buttonGroup  ui-corner-all ui-controlgroup ui-controlgroup-horizontal ui-mini" data-role="controlgroup" data-mini="true" data-type="horizontal" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-init-selector=":jqmData(role=\'controlgroup\')"><div class="ui-controlgroup-controls">'
									+ '<a id="eventA'
									+ i
									+ '" onclick="setActive('
									+ i
									+ ')" href="index.html" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn-active ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">Active</span></span></a>'
									+ '<a id="eventI'
									+ i
									+ '" onclick="setInActive('
									+ i
									+ ')" href="index.html" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-last-child"><span class="ui-btn-inner"><span class="ui-btn-text">Inactive</span></span></a>'
									+ '</div></div>' + "</li>";
						else
							active = active
									+ "<li  class='ui-li ui-li-static ui-btn-up-c' id='event"
									+ i
									+ "'>"

									+ event[i].name

									
									+ '<div class="buttonGroup  ui-corner-all ui-controlgroup ui-controlgroup-horizontal ui-mini" data-role="controlgroup" data-mini="true" data-type="horizontal" aria-disabled="false" data-disabled="false" data-shadow="false" data-corners="true" data-exclude-invisible="true" data-init-selector=":jqmData(role=\'controlgroup\')"><div class="ui-controlgroup-controls">'
									+ '<a id="eventA'
									+ i
									+ '" onclick="setActive('
									+ i
									+ ')" href="index.html" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class=" ui-btn ui-shadow ui-btn-corner-all ui-first-child ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text">Active</span></span></a>'
									+ '<a id="eventI'
									+ i
									+ '" onclick="setInActive('
									+ i
									+ ')" href="index.html" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn-active ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-last-child"><span class="ui-btn-inner"><span class="ui-btn-text">Inactive</span></span></a>'
									+ '</div></div>' + "</li>";
					}
					// alert("Ended call triggers");
					active = active
							+ "<li  class='ui-li ui-li-static ui-btn-up-c' id='event"

							+ "'></li>"
					$('#active').html(active);

				}, 1000);
// infinite loop
function infinite() {
	
	if (loop) {
		getSystemProperty("WIFI_NETWORK", onWifiSuccess);

		function onWifiSuccess(wifi) {

			event = parseEvents();
			var active = "";
			for (i = 0; i <= event.length - 1; i++) {

				if (event[i].type = "wifi") {
					console.log(	wifi.ssid);
					console.log("mine"+event[i].extra);

					if (wifi.status == "On") {
						//alert("s");
						
						  var xhr = new XMLHttpRequest(); xhr.open("GET",
						  "https://zapier.com/hooks/catch/n/tnjwv/", true);
						  xhr.send();
						 
						loop = false;
						//alert("t");
					}
				}

			}
		}

		setTimeout(infinite, 1000);
	}

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

function storeEvent(myEvent) {
	eventHash = localStorage.getObj('eventHash');
	if (eventHash == null) {
		eventHash = [];
		eventHash.push(myEvent);
	} else {
		eventHash.push(myEvent);
	}

	localStorage.setObj('eventHash', eventHash)
}

function setEvent(name, active, type, extra, action, actionextra) {
	myEvent = new Object();
	myEvent.name = name;
	myEvent.active = active;
	myEvent.type = type;
	myEvent.extra = extra;
	myEvent.action = action;
	myEvent.actionextra = actionextra;
	return myEvent;
}

function setStatus(eventArray, i, status) {
	/*
	 * for (i = 0; i < eventArray.length; i++) {
	 * 
	 * if (eventArray[i].name == name) { alert("Disabling ");
	 * eventArray[i].active = "No"; } }
	 */
	eventArray[i].active = status;
	localStorage.setObj('eventHash', eventArray);
}

function parseEvents() {
	val1 = localStorage.getItem('eventHash');

	eventArray = [];
	if (val1 != null) {
		myeventArray = eval(val1);// [{a:b,c:d},{ddd:dd,ss:ss}]

		for (i = 0; i < myeventArray.length; i++) {
			myevent = myeventArray[i];
			event = setEvent(myevent.name, myevent.active, myevent.type,
					myevent.extra, myevent.action, myevent.actionextra);
			eventArray.push(event);
		}

	}
	return eventArray;
}

function setActive(divId) {
	$("#eventI" + divId).removeClass("ui-btn-active")
	$("#eventA" + divId).addClass("ui-btn-active")
	setStatus(parseEvents(), divId, "Yes")

}

function setInActive(divId) {
	$("#eventA" + divId).removeClass("ui-btn-active")
	$("#eventI" + divId).addClass("ui-btn-active")
	setStatus(parseEvents(), divId, "No")
}