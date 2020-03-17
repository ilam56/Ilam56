var repoGroup = "NULL";
var repo = "NULL";
var current = "intro";

google.charts.load('current', {'packages':['corechart']});



function initialize() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var obj = JSON.parse(response);
            
            var stageHTML = "";
            var appendText = "";
            var i;
            for(i = 0; i < obj.length; i+=1){
                appendText = "<option value=\"" + obj[i].repo_group_id + "\">" + obj[i].rg_name + "</option>";
                stageHTML = stageHTML + appendText;
            }
            document.getElementById("repo_group").innerHTML = '<option value="NULL" selected>---</option>';
            document.getElementById("repo_group").innerHTML += stageHTML;
        }
    };
    xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups", true);
    xhttp.send();
}

function fillRepos() {
    repo = "NULL";
    document.getElementById("repo").innerHTML = '<option value="NULL" selected>Loading...</option>';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var obj = JSON.parse(response);
            
            var stageHTML = "";
            var appendText ="";
            var i=0;
            for(i = 0; i < obj.length; i+=1){
                appendText = "<option value=\"" + obj[i].repo_id + "\">" + obj[i].repo_name + "</option>";
                stageHTML = stageHTML + appendText;
            }
            document.getElementById("repo").innerHTML = '<option value="NULL" selected>---</option>';
            document.getElementById("repo").innerHTML += stageHTML;
        }
    };
    xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/repos", true);
    xhttp.send();    
}

function setRepoGroup() {
    var select = document.getElementById('repo_group');
    repoGroup = select.options[select.selectedIndex].value;
    fillRepos();
    filldata();
}

function setRepo() {
    var select = document.getElementById('repo');
    repo = select.options[select.selectedIndex].value;
    filldata();
}

function filldata(){
    fillTopCommiters();
    fillSummary();
}

function show(targetID){
    document.getElementById(current).classList.toggle("hidden");
    document.getElementById(targetID).classList.toggle("hidden");
    current = targetID;
}

function fillTopCommiters(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var obj = JSON.parse(response);
            
            var dataArray = [['Commiters', 'Commits']];
            var i=0;
            for(i=0;i<obj.length;i++){
                dataArray.push([obj[i].email,obj[i].commits]);
            }
            console.log(repoGroup);
            var data = google.visualization.arrayToDataTable(dataArray);

            var options = {'title':'Top Commiters', 'width':550, 'height':400};
            var chart = new google.visualization.PieChart(document.getElementById('commitpiechart'));
            chart.draw(data, options);
        }
    };
    if(repo != "NULL"){
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repos/"+repo+ '/top-committers', true);
    } else {
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/top-committers", true);
    }
    xhttp.send();  
    
}

function fillSummary(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var text = this.responseText;
            var obj = JSON.parse(text);
            var i =0;
            var summaryText = "";
            summaryText += 'Watcher Count: ' + obj[0].watcher_count + '<br>';
            summaryText += 'Stars Count: ' + obj[0].stars_count + '<br>';
            summaryText += 'Fork Count: ' + obj[0].fork_count + '<br>';
            summaryText += 'Merged Count: ' + obj[0].merged_count + '<br>';
            summaryText += 'Commiter Count: ' + obj[0].committer_count + '<br>';
            summaryText += 'Commit Count: ' + obj[0].commit_count + '<br>';
            document.getElementById("summaryInfo").innerHTML = summaryText;
        }
    };
    if(repo != "NULL"){
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repos/"+repo+ '/aggregate-summary', true);
    } else {
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/aggregate-summary", true);
    }
    xhttp.send();  

}