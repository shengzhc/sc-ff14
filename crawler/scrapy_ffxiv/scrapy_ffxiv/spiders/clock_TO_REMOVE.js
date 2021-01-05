var firstLoad = true;
var E_TIME = 20.5714285714;
var global = {
    utcTime: null,
    eorzeaTime: null
};
window.setInterval(updateClock, Math.floor(1000 * 60 / E_TIME));

function updateClock() {
    global.utcTime = new Date().getTime();
    var eo_timestamp = Math.floor(global.utcTime * E_TIME);
    global.eorzeaTime = new Date();
    global.eorzeaTime.setTime(eo_timestamp);
    showTime();
}

function showTime() {
    var d = new Date();
    d.setTime(global.eorzeaTime);
    var eTime = document.getElementById('e-time');
    var hours = d.getUTCHours();
    var ampm = hours > 11 ? "PM" : "AM";
    if (hours > 12)
        hours -= 12;
    hours = padLeft(hours);
    var minutes = d.getUTCMinutes();
    minutes = padLeft(minutes);
    eTime.innerHTML = hours + ":" + minutes + " " + ampm;
    // Show time in title bar
    document.title = hours + ":" + minutes + " " + ampm + ' Eorzea Time';
    // If it's a new hour then let's check what nodes are available and upcoming
    if (minutes == 00) {
        // If it's the first load and a new hour let's set firstLoad to false so we don't run twice on firstLoad
        firstLoad = false;
        // Check the available nodes
        checkEph(hours, ampm);
        checkNodes(hours);
    }
    // If it's the first page load and not the start of an hour, let's check available nodes
    if (firstLoad) {
        // Set firstLoad to false since it won't be the first page load anymore
        firstLoad = false;
        // Check the available nodes
        checkEph(hours, ampm);
        checkNodes(hours);
    }
}

// Check Ephemeral Nodes
function checkEph(hours, ampm) {
    // If it's morning, let's check which part of morning
    if (ampm == 'AM') {
        // 12 - 4 AM
        if (hours >= 0 && hours < 4) {
            if (hours == 0) {
                // 4 hr remaining (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 8PM-12AM
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 1) {
                // 3 hr remaining (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 2) {
                // 2 hr remaining (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 3) {
                // 1 hr remaining (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
        // 4 - 8 AM
        if (hours >= 4 && hours < 8) {
            if (hours == 4) {
                // 4 hr remaining (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 12AM-4AM
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 5) {
                // 3 hr remaining (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 6) {
                // 2 hr remaining (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 7) {
                // 1 hr remaining (4AM-8AM)
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
        // 8 - 12 NOON
        if (hours >= 8 && hours < 12) {
            if (hours == 8) {
                // 4 hr remaining (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 4AM-8AM
                var myElements = document.querySelectorAll('.range-4-8-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 9) {
                // 3 hr remaining (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 10) {
                // 2 hr remaining (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 11) {
                // 1 hr remaining (8AM-12PM)
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
    }
    // If it's afternoon, let's check which part of afternoon
    if (ampm == 'PM') {
        // 12 - 4 PM
        if ((hours >= 1 && hours < 4) || hours == 12) {
            if (hours == 12) {
                // 4 hr remaining (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (4PM-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 8AM-12PM
                var myElements = document.querySelectorAll('.range-8-12-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 1) {
                // 3 hr remaining (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (4PM-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 2) {
                // 2 hr remaining (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (4PM-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 3) {
                // 1 hr remaining (12PM-4PM)
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (4PM-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
        // 4 - 8 PM
        if (hours >= 4 && hours < 8) {
            if (hours == 4) {
                // 4 hr remaining (4-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (8PM-12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 12PM-4PM
                var myElements = document.querySelectorAll('.range-12-4-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 5) {
                // 3 hr remaining (4-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (8PM-12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 6) {
                // 2 hr remaining (4-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (8PM-12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 7) {
                // 1 hr remaining (4-8PM)
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (8PM-12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
        // 8 - 12 MIDNIGHT
        if (hours >= 8 && hours < 12) {
            if (hours == 8) {
                // 4 hr remaining (8PM - 12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "4 hr remaining";
                }
                // Active in 4 hr (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 4 hr";
                }
                // Reset 4PM-8PM
                var myElements = document.querySelectorAll('.range-4-8-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#fff";
                }
                var myCell = document.querySelectorAll('.status-range-4-8-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "n / a";
                }
            }
            if (hours == 9) {
                // 3 hr remaining (8PM - 12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "3 hr remaining";
                }
                // Active in 3 hr (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#eee";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 3 hr";
                }
            }
            if (hours == 10) {
                // 2 hr remaining (8PM - 12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "2 hr remaining";
                }
                // Active in 2 hr (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 2 hr";
                }
            }
            if (hours == 11) {
                // 1 hr remaining (8PM - 12AM)
                var myElements = document.querySelectorAll('.range-8-12-pm');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#BAE8BA";
                }
                var myCell = document.querySelectorAll('.status-range-8-12-pm');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "1 hr remaining";
                }
                // Active in 1 hr (12AM-4AM)
                var myElements = document.querySelectorAll('.range-12-4-am');
                for (var i = 0; i < myElements.length; i++) {
                    myElements[i].style.background = "#FFE7A0";
                }
                var myCell = document.querySelectorAll('.status-range-12-4-am');
                for (var i = 0; i < myCell.length; i++) {
                    myCell[i].innerHTML = "active in 1 hr";
                }
            }
        }
    }
    // Resort the Ephermeral table by status after updating
    $("#myTable-ephemeral").trigger("update").trigger("sorton", [
        [
            [8, 0],
            [0, 0]
        ]
    ]);
}

function checkNodes(hours) {
    // 12 - 1
    if ((hours >= 12 && hours < 13) || (hours >= 0 && hours < 1)) {
        // Active
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        // Play alert if set to true
        if (alerts == true && alert12to1 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 1 - 2
    if (hours >= 1 && hours < 2) {
        // Active
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert1to2 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 2 - 3
    if (hours >= 2 && hours < 3) {
        // Active
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert2to3 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 3 - 4
    if (hours >= 3 && hours < 4) {
        // Active
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert3to4 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 4 - 5
    if (hours >= 4 && hours < 5) {
        // Active
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert4to5 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 5 - 6
    if (hours >= 5 && hours < 6) {
        // Active
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert5to6 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 6 - 7
    if (hours >= 6 && hours < 7) {
        // Active
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-four');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-four');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert6to7 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 7 - 8
    if (hours >= 7 && hours < 8) {
        // Active
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-five');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-five');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert7to8 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 8 - 9
    if (hours >= 8 && hours < 9) {
        // Active
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-six');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-six');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert8to9 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 9 - 10
    if (hours >= 9 && hours < 10) {
        // Active
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-seven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-seven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert9to10 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 10 - 11
    if (hours >= 10 && hours < 11) {
        // Active
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-eight');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-eight');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert10to11 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }
    // 11 - 12
    if (hours >= 11 && hours < 12) {
        // Active
        var myElements = document.querySelectorAll('.hour-ten');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-ten');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "1 hr remaining";
        }
        var myElements = document.querySelectorAll('.hour-eleven');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#BAE8BA";
        }
        var myCell = document.querySelectorAll('.status-eleven');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "2 hr remaining";
        }
        // Active in 1 hour
        var myElements = document.querySelectorAll('.hour-twelve');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-twelve');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 1 hr";
        }
        // Active in 2 hours
        var myElements = document.querySelectorAll('.hour-one');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#FFE7A0";
        }
        var myCell = document.querySelectorAll('.status-one');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 2 hr";
        }
        // Active in 3 hours
        var myElements = document.querySelectorAll('.hour-two');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-two');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 3 hr";
        }
        // Active in 4 hours
        var myElements = document.querySelectorAll('.hour-three');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#eee";
        }
        var myCell = document.querySelectorAll('.status-three');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "active in 4 hr";
        }
        // Reset previous 2-hour
        var myElements = document.querySelectorAll('.hour-nine');
        for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.background = "#fff";
        }
        var myCell = document.querySelectorAll('.status-nine');
        for (var i = 0; i < myCell.length; i++) {
            myCell[i].innerHTML = "n / a";
        }
        if (alerts == true && alert11to12 == true) {
            var audio = new Audio('se.1.mp3');
            audio.play();
        }
    }

    // Refresh the tables to sort by status
    $("#myTable-unspoiled").trigger("update").trigger("sorton", [
        [
            [8, 0],
            [0, 0]
        ]
    ]);
    $("#myTable-folklore").trigger("update").trigger("sorton", [
        [
            [8, 0],
            [0, 0]
        ]
    ]);
    $("#myTable-collect-botany").trigger("update").trigger("sorton", [
        [
            [8, 0]
        ],
        [0, 0]
    ]);
    $("#myTable-collect-mining").trigger("update").trigger("sorton", [
        [
            [8, 0],
            [0, 0]
        ]
    ]);
    $("#myTable-watching").trigger("update").trigger("sorton", [
        [
            [8, 0],
            [5, 0]
        ]
    ]);
}


function padLeft(val) {
    var str = "" + val;
    var pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
}
updateClock();