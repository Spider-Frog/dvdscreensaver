$(document).ready(function() {
    // Global variables
    var dvd = $("#dvd");
    var dir = Math.floor(Math.random() * 4);
    var img = 0;

    // Get browser dimensions
    var w = window.innerWidth;
    var h = window.innerHeight;

    // Set the X and Y to an random interger.
    var x = Math.floor(Math.random() * (w-176) + 1);
    var y = Math.floor(Math.random() * (h-78) + 1);

    // Define the hits variables.
    var cornerHit = 0;
    var wallHit = 0;

    // Define the counter variables.
    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    // Set the img to it's random position and make it visible.
    dvd.css("left", x);
    dvd.css("top", y);
    dvd.css("display", "block");

    // Start the counter and start moving the img.
    setInterval(counter, 1000);
    setInterval(moveDvd, 1);

    // Generate a random number.
    function generateRandomNumber(max, min) {
        return Math.floor(Math.random() * (max-min) + min) ;
    }

    // Counter logic.
    function counter() {
        var secondString = "00";
        var minuteString = "00";
        var hourString = "00";

        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            secondString = seconds;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
                minuteString = minutes;
            } else if (minutes < 10) {
                minuteString = "0" + minutes;
            } else {
                minuteString = minutes;
            }
        } else if (seconds < 10) {
            secondString = "0" + seconds;
        } else {
            secondString = seconds;
        }

        if (hours < 10) {
            hourString = "0" + hours;
        } else {
            hourString = hours;
        }
        $("#timer").text(hourString + ":" + minuteString + ":" + secondString + " elapsed");
    }

    // Move to img.
    function moveDvd() {
        x = parseInt(dvd.css("left"));
        y = parseInt(dvd.css("top"));

        if (dir == 0) {
            dvd.css("left", x - 1);
            dvd.css("top", y - 1);
        } else if (dir == 1) {
            dvd.css("left", x + 1);
            dvd.css("top", y - 1);
        } else if (dir == 2) {
            dvd.css("left", x + 1);
            dvd.css("top", y + 1);
        } else if (dir == 3) {
            dvd.css("left", x - 1);
            dvd.css("top", y + 1);
        }
        checkDvd();
    }

    // Check if the img hit a wall or a corner.
    function checkDvd() {
        x = parseInt(dvd.css("left"));
        y = parseInt(dvd.css("top"));
        w = window.innerWidth;
        h = window.innerHeight;

        if (x + 175 >= w && y + 77 >= h) {
            dir = 0;
            dvdHitCorner();
        } else if (x + 175 >= w && y <= 0) {
            dir = 3;
            dvdHitCorner();
        } else if (x <= 0 && y + 77 >= h) {
            dir = 1;
            dvdHitCorner();
        } else if (x <= 0 && y <= 0) {
            console.log("hello world");
            dir = 2;
            dvdHitCorner();
        } else if (x + 175 >= w) {
            if (dir == 1) {
                dir = 0;
            } else if (dir == 2) {
                dir = 3;
            }
            dvdHitWall();
        } else if (x <= 0) {
            if (dir == 0) {
                dir = 1;
            } else if (dir == 3) {
                dir = 2;
            }
            dvdHitWall();
        } else if (y + 77 >= h) {
            if (dir == 2) {
                dir = 1;
            } else if (dir == 3) {
                dir = 0;
            }
            dvdHitWall();
        } else if (y <= 0) {
            if (dir == 0) {
                dir = 3;
            } else if (dir == 1) {
                dir = 2;
            }
            dvdHitWall();
        }
    }

    // Define what happens when the img hits a wall.
    function dvdHitWall() {
        wallHit++;
        $("#wall").text("Wall hits: " + wallHit);

        colorDvd();
    }

    // Define what happens when the img hits a corner.
    function dvdHitCorner() {
        cornerHit++;
        $("#corner").text("Corner hits: " + cornerHit);

        colorDvd();
    }

    // Choose a random color for the img.
    function colorDvd() {
        var randomInt = Math.floor(Math.random() * 4);
        while (img === randomInt) {
            var randomInt = Math.floor(Math.random() * 4);
        }
        img = randomInt;
        dvd.attr("src", "dvdlogo" + randomInt + ".png");
    }
});
