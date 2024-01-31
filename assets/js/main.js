(function() {
	// Schedule Template
	function ScheduleTemplate( element ) {
		this.element = element;
		this.timelineItems = this.element.getElementsByClassName('cd-schedule__timeline')[0].getElementsByTagName('li');
		this.timelineStart = getScheduleTimestamp(this.timelineItems[0].textContent);
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems[1].textContent) - getScheduleTimestamp(this.timelineItems[0].textContent);
		
		this.topInfoElement = this.element.getElementsByClassName('cd-schedule__top-info')[0];
		this.singleEvents = this.element.getElementsByClassName('cd-schedule__event');

		this.modalMaxWidth = 800;
		this.modalMaxHeight = 480;

		this.animating = false;

		this.placeEvents();
	};
	
		 // Array to store event data
			var eventsData = [];

				eventsData = [
					
						{
							"day": "Monday",
							"id": "49626",
							"startTime": "09:00",
							"endTime": "10:00",
							"opModel": "fullVert"
						},
						{
							"day": "Tuesday",
							"id": "27744",
							"startTime": "09:00",
							"endTime": "10:00",
							"opModel": "fullVert"
						},
						{
							"day": "Thursday",
							"id": "97809",
							"startTime": "09:00",
							"endTime": "10:00",
							"opModel": "fullVert"
						},
						{
							"day": "Sunday",
							"id": "44848",
							"startTime": "10:00",
							"endTime": "11:00",
							"opModel": "extHour"
						},
						{
							"day": "Thursday",
							"id": "71402",
							"startTime": "10:00",
							"endTime": "11:00",
							"opModel": "extHour"
						},
						{
							"day": "Saturday",
							"id": "26536",
							"startTime": "10:00",
							"endTime": "11:00",
							"opModel": "extHour"
						},
						{
							"day": "Monday",
							"id": "54092",
							"startTime": "14:00",
							"endTime": "15:00",
							"opModel": "other"
						},
						{
							"day": "Tuesday",
							"id": "28878",
							"startTime": "14:00",
							"endTime": "15:00",
							"opModel": "other"
						},
						{
							"day": "Friday",
							"id": "61795",
							"startTime": "14:00",
							"endTime": "15:00",
							"opModel": "other"
						},
						{
							"day": "Tuesday",
							"id": "29309",
							"startTime": "12:00",
							"endTime": "13:00",
							"opModel": "oneRph"
						},
						{
							"day": "Wednesday",
							"id": "79666",
							"startTime": "12:00",
							"endTime": "13:00",
							"opModel": "oneRph"
						},
						{
							"day": "Saturday",
							"id": "18373",
							"startTime": "12:00",
							"endTime": "13:00",
							"opModel": "oneRph"
						}
					];

	function createScreen(eventsData) {
		for (var i = 0; i < eventsData.length; i++) {
				placeEventCell(eventsData[i]);
		}
	};

	createScreen(eventsData);

	document.addEventListener("DOMContentLoaded", function () {
		var scheduleTable = document.querySelector(".schedule-grid");
		var modal = document.getElementById("addEventModal");
		var closeModalBtn = document.getElementById("closeModalBtn");
		var submitEventBtn = document.getElementById("submitEventBtn");

	  
		document.getElementById("addEventBtn").addEventListener("click", function () {
		  modal.style.display = "block";
		
		});
	  
		closeModalBtn.addEventListener("click", function () {
		  modal.style.display = "none";
		});
	  
		window.addEventListener("click", function (event) {
		  if (event.target === modal) {
			modal.style.display = "none";
		  }
		});


	  
		submitEventBtn.addEventListener("click", function () {
		  var eventStartTime = document.getElementById("eventStartTime").value;
		  var eventEndTime = document.getElementById("eventEndTime").value;
		  var eventDays = document.querySelectorAll('input[name="eventDay"]:checked');
		  var eventOpModel = document.getElementById("operatingModel").value;

		  var days = Array.from(eventDays).map(day => day.value);

		  for (var i = 0; i < days.length; i++) {

			var eventData = {
				day: days[i],
				id: generateEventId(),
				startTime: eventStartTime,
				endTime: eventEndTime,
				
				opModel: eventOpModel,
				//notes: eventNotes
			  }

			  eventsData.push(eventData);
			 
		      placeEventCell(eventData);

				}	

				modal.style.display = "none";

		 // console.log("event data:", eventData);
	  
		  // Append new event data to the array

	  
		  console.log("All events data:", eventsData);
	  
		  
		  
		});
	
		// Function to generate a unique event ID
		function generateEventId() {
		  var id = Math.floor(10000 + Math.random() * 90000);
		  return id.toString().substring(0, 5);
		}
	  });

	function placeEventCell(eventData) {
		var eventCell = document.createElement("li");
		var eventCellData = document.createElement("a");
		var eventCellTxt = document.createElement("em");
		var eventCellDelBtn = document.createElement("button");
  
		eventCell.classList.add("cd-schedule__event");
  
		var evtStartTime = eventData.startTime;
		var evtEndTime = eventData.endTime;
		var evtopModel = eventData.opModel;
		var eventId = eventData.id;
		var day = eventData.day;

		//var arr1 = ["fullVert", "clinic", "oneRph", "extHour", "other"];
		var result = "";		
			switch (evtopModel) {
				case "fullVert":
				result = "Event 1";
				break;
				case "clinic":
				result = "Event 2";
				break;
				case "oneRph":
				result = "Event 3";
				break;
				case "extHour":
				result = "Event 4";
				break;
				case "other":
				result = "Event 5";
				break;
				default:
				result = "Invalid value";
			}

		eventCellData.setAttribute("data-start", evtStartTime);
		eventCellData.setAttribute("data-end", evtEndTime);
		eventCellData.setAttribute("data-event", evtopModel);
		eventCellData.setAttribute("eventId", eventId);
  
			//slotHeight is the height of one cell in px
			  slotHeight = 50;
			  var start = getScheduleTimestamp(evtStartTime),
				  duration = getScheduleTimestamp(evtEndTime) - start;

				//   var eventTop = slotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				// 	eventHeight = slotHeight*duration/self.timelineUnitDuration;
				//timelineStart is start time of the grid i.e. 9:00 AM - 9*60=540
				//timelineUnitDuration is gap on hour axis i.e. 30 minutes
  
			  var eventTop = slotHeight*(start - 540)/30,
				  eventHeight = slotHeight*duration/30;
  
				  eventCell.setAttribute('style', 'top: '+(eventTop-1)+'px; height: '+(eventHeight +1)+'px');
  
			function handleDelete(event){
				const target = event.target;
					if (target.classList.contains('delete-btn')) {
						const eventBox = target.parentElement;
						var eventId = eventBox.getAttribute('eventId')
						for (var i = eventsData.length - 1; i >= 0; --i) {
							if (eventsData[i].id == eventId) {
								eventsData.splice(i,1);
							}
						}
						 const eventCell = eventBox.parentElement;
							eventCell.remove();
					}
				}

		eventCellTxt.classList.add("cd-schedule__name");
		eventCellTxt.innerHTML = result;
		eventCellDelBtn.classList.add("delete-btn");
		eventCellDelBtn.innerHTML = "&times;";

		eventCellDelBtn.setAttribute('onclick','handleDelete();'); // for FF
		eventCellDelBtn.onclick = function() {handleDelete(event);}; // for IE
  
		eventCellData.appendChild(eventCellDelBtn);
		eventCellData.appendChild(eventCellTxt);
		
  
		eventCell.appendChild(eventCellData);

		var dayColumn = document.getElementById(day);
		dayColumn.appendChild(eventCell);
		
	}

	ScheduleTemplate.prototype.placeEvents = function() {
		// on big devices - place events in the template according to their time/day
		var self = this,
			slotHeight = this.topInfoElement.offsetHeight;
		for(var i = 0; i < this.singleEvents.length; i++) {
			var anchor = this.singleEvents[i].getElementsByTagName('a')[0];
			var start = getScheduleTimestamp(anchor.getAttribute('data-start')),
				duration = getScheduleTimestamp(anchor.getAttribute('data-end')) - start;

			var eventTop = slotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = slotHeight*duration/self.timelineUnitDuration;

			this.singleEvents[i].setAttribute('style', 'top: '+(eventTop-1)+'px; height: '+(eventHeight +1)+'px');
		};
	};

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	};

	var scheduleTemplate = document.getElementsByClassName('js-cd-schedule'),	
		scheduleTemplateArray = [];
	if( scheduleTemplate.length > 0 ) { // init ScheduleTemplate objects
		for( var i = 0; i < scheduleTemplate.length; i++) {
			(function(i){
				scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
			})(i);
		}
	};	  
}());
