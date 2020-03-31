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
    fillIssues();
    console.log("repo group: " + repoGroup);
    console.log("repo: " + repo);
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
            if(obj[0]!== undefined){
                for(i=0;i<obj.length;i++){
                    dataArray.push([obj[i].email,obj[i].commits]);
                }
            }
            var data = google.visualization.arrayToDataTable(dataArray);

            var options = {'title':'Top Commiters', 'width':550, 'height':400};
            var chart = new google.visualization.PieChart(document.getElementById('commitpiechart'));
            chart.draw(data, options);
        }
        else if(this.readyState == 4){
            document.getElementById('commitpiechart').innerHTML = '<h1>Internal Error</h1>';
        }
    };
    if(repo != "NULL"){
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repos/"+repo+ '/top-committers', true);
    } else {
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/top-committers", true);
    }
    xhttp.send();  
    
}

function fillIssues(){
    document.getElementById('issuep').innerHTML = "";
    if(repo != "NULL"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var obj = JSON.parse(response);
                var date = "";
                var year = "";
                var dataArray = [['Date', 'Issues']];
                var i=0;
                if(obj[0] !== undefined){
                    for(i=0;i<obj.length;i++){
                        date = obj[i].date;
                        year = date.substring(0,7);
                        dataArray.push([year, obj[i].issues]);
                    }
                }
                if(obj[0] !== undefined){
                    var data = google.visualization.arrayToDataTable(dataArray);

                    var options = {'title':'Issues', 'width':700, 'height':400};
                    var chart = new google.visualization.LineChart(document.getElementById('issuechart'));
                    chart.draw(data, options);
                    var curIssue = obj[obj.length - 1].issues;
                    document.getElementById('issuep').innerHTML = "Issses Currently Active: " + curIssue;
                }
                else {
                    document.getElementById('issuechart').innerHTML = "No Data Available";
                    document.getElementById('issuep').innerHTML = "Issses Active: No Data Available";
                }
            }
            else if(this.readyState == 4){
                document.getElementById('issuechart').innerHTML = '<h1>Internal Error</h1>';
            }
        };
        if(repo != "NULL"){
            xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repos/"+repo+ '/issues-active?period=month', true);
        } else {
            xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/issues-active?period=month", true);
        }
        xhttp.send();  
    } else {
        document.getElementById('issuechart').innerHTML = '<h1>Please Select a Repo</h1>';
    }
}

function fillSummary(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var text = this.responseText;
            var obj = JSON.parse(text);
            
            document.getElementById('watcher').innerHTML = obj[0].watcher_count;
            document.getElementById('stars').innerHTML = obj[0].stars_count;
            document.getElementById('fork').innerHTML = obj[0].fork_count;
            document.getElementById('merged').innerHTML = obj[0].merged_count;
            document.getElementById('committer').innerHTML = obj[0].committer_count;
            document.getElementById('commit').innerHTML = obj[0].commit_count;
            
        }
    };
    if(repo != "NULL"){
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repos/"+repo+ '/aggregate-summary', true);
    } else {
        xhttp.open("GET", "http://czi2.osshealth.io:5153/api/unstable/repo-groups/"+repoGroup+"/aggregate-summary", true);
    }
    xhttp.send();  

}