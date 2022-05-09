// parse the date into format - example Sunday, February 14th 2010, 3:25:50 pm.
$("#currentDay").text(moment().format("dddd MMMM Do YYYY, h:mm:ss a"));

// click event to save text area in the time blocks
$(".saveBtn").on("click", function (event) {
  event.preventDefault();
  console.log(this);
  var value = $(this).siblings(".description").val();
  var time = $(this).parent().attr("id");

  localStorage.setItem(time, value);
});

// store text area values in local storage
var keys = Object.keys(localStorage);

for (let i = 0; i < keys.length; i++) {
  var value = localStorage.getItem(keys[i]);
  var temp = $("#" + keys[i]).find("textarea");
  temp.val(value);
}

// function to set current time and add classes to change color of time block based on current time
function timeFrame() {
  var currentHours = moment().hours();

  $(".time-block").each(function () {
    var hourEl = $(this).attr("id");
    var hourDay = hourEl.substring(5, hourEl.length);
    var intHourDay = parseInt(hourDay);
    var intCurrentHours = parseInt(currentHours);
    if (parseInt(intHourDay) < parseInt(intCurrentHours)) {
      $(this).addClass("past");
      $(this).removeClass("future");
      $(this).removeClass("present");
    } else if (parseInt(intHourDay) > parseInt(intCurrentHours)) {
      $(this).addClass("future");
      $(this).removeClass("present");
      $(this).removeClass("past");
    } else if (parseInt(intHourDay) === parseInt(intCurrentHours)) {
      $(this).addClass("present");
      $(this).removeClass("future");
      $(this).removeClass("past");
    }
  });
}

timeFrame();
