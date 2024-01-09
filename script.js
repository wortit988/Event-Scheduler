document.addEventListener("DOMContentLoaded", function () {
  var scheduleTable = document.querySelector(".schedule-grid");
  var modal = document.getElementById("addEventModal");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var submitEventBtn = document.getElementById("submitEventBtn");
  var eventsData = []; // Array to store event data

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
    var eventNotes = document.getElementById("eventNotes").value;

    var eventData = {
      id: generateEventId(),
      startTime: eventStartTime,
      endTime: eventEndTime,
      days: Array.from(eventDays).map(day => day.value),
      notes: eventNotes
    };

    // Append new event data to the array
    eventsData.push(eventData);

    console.log("Event data:", eventData);
    console.log("All events data:", eventsData);

    modal.style.display = "none";
  });

  // ... Your existing code ...

  function generateTimeLabels() {
    for (var hour = 0; hour < 24; hour++) {
      var headerRow = document.createElement("tr");
      scheduleTable.appendChild(headerRow);

      var timeLabel = document.createElement("th");
      timeLabel.classList.add("time-slot");
      timeLabel.textContent = formatHour(hour);
      headerRow.appendChild(timeLabel);

      for (var day = 0; day < 7; day++) {
        var emptyTd = document.createElement("td");
        emptyTd.textContent = " This is a sample event with below time ";
        headerRow.appendChild(emptyTd);
      }
    }
  }

  function formatHour(hour) {
    var formattedHour = hour % 12 || 12;
    var period = hour < 12 ? "AM" : "PM";
    return formattedHour + ":00 " + period;
  }

  // Function to generate a unique event ID
  function generateEventId() {
    var id = Math.floor(10000 + Math.random() * 90000);
    return id.toString().substring(0, 5);
  }

  generateTimeLabels();
});
