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

var gInfoTitle = "", gInfo = "", gBatteryListener;

function eventSearchSuccessCallback(events) {
	/* Update the first existing event */
	var myCalendar1 = tizen.calendar.getDefaultCalendar("EVENT");

	isSet = false;
	currentDate = new tizen.TZDate(new Date);
	alert(currentDate.getMonth());
	alert(currentDate.getDate());
	alert(currentDate.getHours());
	
	
	
		var ev = new tizen.CalendarEvent({
			description : 'HTML5 Introduction',
			summary : 'HTML5 Webinar ',
			startDate : new tizen.TZDate(2013, 8, 28, 12, 0),

			duration : new tizen.TimeDuration(3, "HOURS"),
			location : 'Huesca'
		});
	alert(ev.startDate.getMonth());
	alert(ev.startDate.getDate());
	alert(ev.startDate.getHours());
	
	/*
	 * alert("s") endDate= alert(currentDate.getTime());
	 */
	// alert(currentDate.getDate());
	for (i = 0; i < events.length; i++) {
		// alert(events[i].duration.length);
		
		myCalendar1.remove(events[i].id);
		continue;
		
		if (events[i].duration == null)
			break;

		endDate = events[i].startDate.addDuration(events[i].duration);
		alert(endDate.getMonth());
		alert(endDate.getDate());
		alert(endDate.getHours());
	
		
		if (((currentDate.equalsTo(events[i].startDate) || currentDate
				.laterThan(events[i].startDate)) &&

		currentDate.earlierThan(endDate))

		) {
			alert(endDate.getMonth());
			alert(endDate.getDate());
			alert(endDate.getHours());
			// sett to action
			alert("action!");
			isSet = true;

			break;

		}

	}

	if (!isSet) {
		// revert action
		alert("revert action");
	}

}

function errorCallback(message) {

	alert("some error");
}

$(document).delegate("#main", "pageinit", function() {
	$("#calendar").bind("vclick", function() {

		verifyCalendar();

		return false;
	});

	$("#storage-info").bind("vclick", function() {

		// Gets the default calendar
		var calendar = tizen.calendar.getDefaultCalendar("EVENT");

		var ev = new tizen.CalendarEvent({
			description : 'xx',
			summary : 'HTML5 Webinar ',
			startDate : new tizen.TZDate(2013, 8, 28, 12, 0),

			duration : new tizen.TimeDuration(3, "HOURS"),
			location : 'Huesca'
		});

		calendar.add(ev);
		alert('Event added with uid ' + ev.id.uid)

		alert(ev.description)

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

	$.mobile.changePage("#info");
}

function getSystemProperty(property, onSuccess) {
	try {
		tizen.systeminfo.getPropertyValue(property, onSuccess, onError);
	} catch (e) {
		alert("Exception: " + e.message);
	}
}
