function verifyCalendar() {

	var myCalendar1 = tizen.calendar.getDefaultCalendar("EVENT");

	myCalendar1.find(eventSearchSuccessCallback, errorCallback);

	function eventSearchSuccessCallback(events) {
		/* Update the first existing event */

		isSet = false;
		currentDate = new tizen.TZDate(new Date);
		//	alert(currentDate.getMonth())
		//alert(currentDate.getDate())
		//alert(currentDate.getHours())

		/*
		 * alert("s") endDate= alert(currentDate.getTime());
		 */
		// alert(currentDate.getDate());
		for (i = 0; i < events.length; i++) {
			// alert(events[i].duration.length);
			if (events[i].duration == null)
				break;

			endDate = events[i].startDate.addDuration(events[i].duration);
			//alert(endDate.getMonth())
			//alert(endDate.getDate())
			//alert(endDate.getHours())

			if (((currentDate.equalsTo(events[i].startDate) || currentDate
					.laterThan(events[i].startDate)) &&

			currentDate.earlierThan(endDate))

			) {
				//alert(endDate.getMonth())
				//alert(endDate.getDate())
				//alert(endDate.getHours())
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
}