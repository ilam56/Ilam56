## First iteration
I tried both the flask and dex app examples given in  the assignment. I had problems with the dex example. When running the make command I recieved an error (cc1.exe: sorry, unimplemented: 64-bit mode not compiled in) which resulted in not being able to run the app. I did try to debug if for a little while as well as consulted the teacher but in the end decided to give up in favor of the flask example. I had much better luck with the flask example and ran into few problems. I did have a little trouble filling out the google credentials from the google api. The instruction were not entirely clear, but I managed to figure it out fairly easily. I did consider going with a different SSO, but due to time constraints and recent health issues I deided to go with the simpler route. I did read through the documentaion provided at https://realpython.com/flask-google-login/#creating-your-own-web-application to try and get a little understanding of what was involved. By the end of the semester I hope to create a survey app that uses SSO. I would like to add in facebook or other SSO options as well, but that will depend on how things go. For more information about what the app will entail look as the GOALS.md documentation

## Second iteration
I created some example surveys and tried to implement the data collection. I learned alot about how to use flask and refreshed some of my html skills. I ran into a problem when trying to get the SQL to work. For some reason no matter what I do it is displaying the column name instead of the data item when I try to retrieve the data. I have no idea why this is happening and don't really know how to fix it. I spent around 4 hours searching and trying different solution to this problem to no avail. This left me stuck with the project in it's current state. I am not all the familiar with python and had a lot of trouble figureing out what was going wrong. It would help if I had access to the database and could run the queries and see the results in MySQL workbench but the file produced doesn't seem to work with it. The current function to get the question values is a bit of a mess because of all the different stuff I was trying. i tried a similar query with the id value and it seemed to work so I have not idea why it broke when trying to do he new fields I created.

Flask resourses: 
https://www.youtube.com/watch?time_continue=201&v=ap2vxzAZVIg&feature=emb_logo
https://pythonhow.com/html-templates-in-flask/
https://pythonhow.com/add-css-to-flask-website/

HTML/CSS resources:
https://www.w3schools.com/html/default.asp (I used dozens of different w3schools links didnt want to list them all).

SQL:
https://www.w3schools.com/python/python_mysql_select.asp
https://www.w3schools.com/sql/sql_select.asp
https://www.w3schools.com/python/python_mysql_update.asp
I also spent a few hours googling the problem but couldn't remember all the links

Misc:
https://github.com/google/google-api-objectivec-client/issues/211

## Third(final) iteration
I finally fixed the sql problems. I still am not sure what was wrong. At one point I fixed it only for it to break again despite me having not touched it. It also didn't seem to want me to have more than one ? in the query for some reason. It took countless tweaking and google searches before I finally found a workaround that worked. I am actually hoping to talk to you in the future to get some insight into the matter because I still don't know what went wrong really. After I fixed that issue I worked with the results display. It isn't a very complicated display, but It required quite a bit a AJAX which I had never used with flask. I found a few good tutorials and got it working out though. I did have some problems with scope though. My AJAX functions couldn't access my global dictionarys and arrays leading me having to do a pretty messy workaround of simply copying and pasting the AJAX request with the different answers. I would have liked to do more, but I already talking about that in the readme and goals section. Here are some of the links I used:

Python:

