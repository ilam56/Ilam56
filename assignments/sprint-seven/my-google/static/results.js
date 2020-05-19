var dict = {
    "q1r1": "Apple",
    "q1r2": "Orange",
    "q1r3": "Kiwi",
    "q1r4": "Strawberry",
    "q2r1": "Yes",
    "q2r2": "No",
    "q3r1": "Never",
    "q3r2": "Once per day",
    "q3r3": "Two-Three times per day",
    "q3r4": "Four+ times per day"
};

var dictdir = ["q1r1",
    "q1r2",
    "q1r3",
    "q1r4",
    "q2r1",
    "q2r2",
    "q3r1",
    "q3r2",
    "q3r3",
    "q3r4"
];

$(function(){
    //this could probably be done with only one ajax but I was having ALOT of trouble with the sql and ran out of time so I had to leave it like this for now. The reason I couldn't make a loop is that the inside of the ajax function couldn't seem to access my global var so I couldnt use a variable for the target.
    var i = 0;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest1" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q1r1').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest1" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q1r2').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest1" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q1r3').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest1" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q1r4').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest2" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q2r1').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest2" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q2r2').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest3" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q3r1').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest3" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q3r2').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest3" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q3r3').append(data['rtrn']);
        }
    });
    i++;
    $.ajax({
        url: window.origin + '/results/request?req=' + "total" + "&quest=" + "quest3" + "&ans=" + dict[dictdir[i]],
        success: function(data) {
        $('#q3r4').append(data['rtrn']);
        }
    });
    $.ajax({
        url: window.origin + '/results/request?req=' + "quest1",
        success: function(data) {
        $('#mypick1').append(data['rtrn']);
        }
    });
    $.ajax({
        url: window.origin + '/results/request?req=' + "quest2",
        success: function(data) {
        $('#mypick2').append(data['rtrn']);
        }
    });
    $.ajax({
        url: window.origin + '/results/request?req=' + "quest3",
        success: function(data) {
        $('#mypick3').append(data['rtrn']);
        }
    });
});