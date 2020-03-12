var repoGroup = "NULL";
var repo = "NULL";
var current = "intro";

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(fillTopCommiters);


function setRepoGroup() {
    var select = document.getElementById('repo_group');
    repoGroup = select.options[select.selectedIndex].text;
    filldata();
}

function setRepo() {
    var select = document.getElementById('repo');
    repo = select.options[select.selectedIndex].text;
    filldata();
}

function filldata(){
    fillTopCommiters();
}

function show(targetID){
    document.getElementById(current).classList.toggle("hidden");
    document.getElementById(targetID).classList.toggle("hidden");
    current = targetID;
}

function fillTopCommiters(){
    var data = google.visualization.arrayToDataTable([
    ['Commiters', 'Commits'],
    ['Commiter1', 10],
    ['Commiter2', 2],
    ['Commiter3', 2],
    ['Commiter4', 2],
    ['Commiter5', 2],
    ['Commiter6', 8]
    ]);

    var options = {'title':'Top Commiters', 'width':550, 'height':400};
    var chart = new google.visualization.PieChart(document.getElementById('commitpiechart'));
    chart.draw(data, options);
}