$("#slideWeather").on("swipe", swipeWeatherHandler);
// Callback function references the event target and adds the 'swipe' class to it
function swipeWeatherHandler(event) {
	alert("slide")
}