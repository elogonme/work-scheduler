// Start script after page is loaded - all js code goes in here
$(document).ready(function() {

    var dateToday = moment().format('dddd, MMMM Do YYYY'); // get todays date using moment.js
    var hourNow = moment().format('H'); // get hour now using moment.js
    console.log(dateToday);
    console.log(hourNow);
    schedule = loadTaskList();
    console.log(schedule);
    outputTimeblocks();
// Set todays date in p #currentDay
$('#currentDay').text(dateToday).css('color', 'blue');

// display on the page day work hours list 

// add on each hour textarea for input and button to save
// load day schedule from localStorage
// fill in day hours with date about schedule from loaded data.
// Each hour is color coded with past, present and future hours (grey, red, green)
// Add event listner for save buttons
// Depending wich save buttonis clicked get textarea and save under corresponding hour into loacl storage
// Refresh saved day work schedule

// Additonal?
// Clear each hour?
// Clear all day?
// Clear all stored data from local storage




// Function to output list of hours with tasks
function outputTimeblocks(){
    for (var i = 9; i <= 18; i++) {
        var $timeblock = $('<div>');
        var hourText;
        var $hour = $('<div>');
        var $description = $('<textarea>');
        var $saveButton = $('<button>');
        
        // format hour text depending on AM or PM
        if (i < 13 ) {
            hourText = i + 'AM';
        } else {
            hourText = i - 12 + 'PM';
        }

        $timeblock.addClass('row time-block my-1');
        $hour.addClass('hour col-1 pt-2');
        $hour.text(hourText);
        $description.addClass('description col-8');
        $saveButton.addClass('saveBtn');
        $saveButton.html('<i class="fas fa-save"></i>'); // add save button icon
    
        $timeblock.append($hour, $description, $saveButton)
        $('#time-blocks').append($timeblock);
    }
    
}

// Function to get data from local storage and return or return empty object
function loadTaskList(){
   var schedule = JSON.parse(localStorage.getItem('schedule'));
   
   if (!schedule) {
        console.log('nothing in stoarge');
        // Object to store today's tasks and method to save tasks
        schedule = {
            date: '',
            tasks: ['', '', '', '', '', '', '', '', '', ''],
            saveTask(taskList) {
                this.tasks = taskList;
            }
        };
    schedule.date = dateToday;
    return schedule;
   }
}

function saveTaskList(schedule) {
    localStorage.setItem(schedule, JSON.stringify(schedule));
}
});