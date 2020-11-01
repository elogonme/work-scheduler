// Start script after page is loaded - all js code goes in here
$(document).ready(function() {

    var dateToday = moment().format('dddd, MMMM Do, YYYY'); // get todays date using moment.js
    var hourNow = moment().format('H'); // get hour now using moment.js

    // Initialize app 
    // Set todays date to display on page in p #currentDay
    $('#currentDay').text(dateToday).css('color', '#05a3c7');
    // load day schedule from localStorage
    var schedule = loadTaskList();
    // display on the page day work hours list with tasks
    outputTimeblocks();

    // Add event listner for save buttons
    // Depending which save button is clicked get textarea and save under corresponding hour into local storage
    $('.saveBtn').on('click', function(){
        schedule.tasks[this.value - 9] = $(this).siblings()[1].value; // Save clicked task to object tasks array
        saveTaskList(schedule); // Save task list to local storage
    });

    // Add event listner for clear buttons
    // Depending which clear button is clicked clear textarea and save under corresponding hour into local storage
    $('.clearBtn').on('click', function(){
        console.log('clicked');
        schedule.tasks[this.value - 9] = ''; // Clear clicked task and save to object tasks array
        saveTaskList(schedule); // Save task list to local storage
        $(this).siblings()[1].value = ''; // Clear text in description textarea
        console.log('output done');
    });

    // Additonal
    // Save all hours tasks
    $('#save-all').on('click', function() {
        // Get task description from each hour and save to schedule tasks array
        $.each($('.time-block textarea'), function(i, element){
            schedule.tasks[i] = element.value;
        });
        // Save updated schedule to local storage
        saveTaskList(schedule);
    });
    // Clear each hour?

    // Clear all schedule tasks and clear all stored data from local storage
    $('#clear-all').on('click', function() {
        // Get task description from each hour and save to schedule tasks array
        $.each($('.time-block textarea'), function(i, element){
            schedule.tasks[i] = '';
            element.value = '';
        });
        // Save updated schedule to local storage
        saveTaskList(schedule);
    });
    
    // -----------------------------------------------------------------------
    // Function to output list of hours with tasks
    function outputTimeblocks(){
        $('#time-blocks').empty(); // Clear any previous timeblocks from page
        for (var i = 9; i <= 18; i++) {
            // define some variables for creating elements in DOM
            var $timeblock = $('<div>');
            var hourText;
            var $hour = $('<div>');
            var $description = $('<textarea name="description">');
            var $saveButton = $('<button>');
            var $clearButton = $('<button>');
            
            // format hour text depending on AM or PM
            if (i < 13 ) {
                hourText = i + 'AM';
            } else {
                hourText = i - 12 + 'PM';
            }
            // add on each hour textarea for input and button to save with all bootstrap classes for styling
            $timeblock.addClass('row time-block my-1');
            $hour.addClass('hour col-1 pt-2 px-1');
            $hour.text(hourText);
            $description.addClass('description col-9');
            // fill in day hours with task data.
            $description.text(schedule.tasks[i - 9]); // add task text loaded from tasks array in schedule object
            // Style clear button
            $clearButton.addClass('clearBtn col-1 btn-danger');
            $clearButton.attr({
                value: i,
                title: 'clear'
            });
            $clearButton.html('<i class="fas fa-trash-alt"></i>'); // add clear button icon
            // Style save button
            $saveButton.addClass('saveBtn col-1');
            $saveButton.attr({
                value: i,
                title: 'save'
            });
            $saveButton.html('<i class="fas fa-save"></i>'); // add save button icon
            // Each hour is color coded with past, present and future hours (grey, red, green)
            // Add color classes to different hours depending on time now
            if (i > hourNow) {
                $description.addClass('future');
            } else if (i < hourNow) {
                $description.addClass('past');
            } else $description.addClass('present');

            // Append each timeblock 
            $timeblock.append($hour, $description, $clearButton,$saveButton);
            $('#time-blocks').append($timeblock);
        }
    }
    // ----------------------------------------------------------------------------
    // Function to get data from local storage and return or return empty object
    function loadTaskList(){
        var schedule = JSON.parse(localStorage.getItem('schedule'));
        
        if (!schedule) {
                console.log('nothing in stoarge');
                // Object to store today's tasks and method to save tasks
                schedule = {
                    date: '',
                    tasks: ['', '', '', '', '', '', '', '', '', ''],
                };
            }
        schedule.date = dateToday;
        return schedule;
    }
    // ---------------------------------------------------------------------------
    // function to save tasks into local storage
    function saveTaskList(schedule) {
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }
});
