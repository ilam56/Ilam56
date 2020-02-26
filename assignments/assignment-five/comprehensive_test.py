import pytest
import Professor
import System
import Staff
import Student
import TA


#For many of these tests I tried to make it restore the data after the test is run, but I couldn't figure out how 
#to make it work for drop_student and submit_assignment. check_grades test also doesn't restore it, but that is 
#just because check_grades is broken. If it worked it would restore the grade

#!!!!THUS MAKE SURE TO RUN RestoreData.py AFTER EACH TEST!!!!

#also the RestoreData had some errors with a capital Grade keys. I fixed it because TA said it wasn't intended on slack.


#Tests if login in System class results in correct user
def test_login(grading_system): 
    #loop through all the users
    for key in grading_system.users.keys():
        username = key
        password = grading_system.users[key]['password']
        #attempt login for each user
        grading_system.login(username,password)
        #check that login was correct
        assert grading_system.usr.name == key

#Tests if check_password in System returns True for correct passwords and False for incorrect ones.
def test_check_password(grading_system):
    #loop through all users to get different password variations
    for key in grading_system.users.keys(): 
        username = key
        password = grading_system.users[key]['password']
        assert grading_system.check_password(username,password) == True  #check if password works for each user
        assert grading_system.check_password(username, 'notPass1234') == False #check for not pass
        assert grading_system.check_password(username, '9999999') == False #check with only numbers
        assert grading_system.check_password(username, '!@#$%^&*') == False #check with symbols

#Test if change_grade in Staff class correctly updated the proper grade
def test_change_grade(grading_ta):
    #change a test grade
    grade = grading_ta.users['akend3']['courses']['comp_sci']['assignment1']['grade']
    grading_ta.change_grade('akend3' , 'comp_sci' , 'assignment1','10')
    #check the change
    assert grading_ta.users['akend3']['courses']['comp_sci']['assignment1']['grade'] == 10
    #set grade back (doesn't work if change_grade is broken)
    grading_ta.change_grade('akend3' , 'comp_sci' , 'assignment1',grade)

#Tests if create_assignment in Staff class creates the assignment with the correct due date, course, etc.
def test_create_assignment(grading_ta):
    #loop through each course to test adding to each course
    for key in grading_ta.all_courses.keys():
        course = key
        #create a test assignment
        grading_ta.create_assignment('test','1/11/11',course)
        #check due date. Will have key error if wrong insertion location and assert error if wrong date.
        assert grading_ta.all_courses[course]['assignments']['test']['due_date'] == '1/11/11'
        #remove added assignment afterwards to reset state.
        grading_ta.all_courses[course]['assignments'].pop('test')
        grading_ta.update_course_db()
    
#Tests if add_student in Professor class correctly adds a student
def test_add_student(grading_prof):
        course = 'comp_sci'
        name = 'hdjsr7'
        #add student to course
        grading_prof.add_student(name,course)
        #loop through all assignments in course for the student to check that they have been created
        for key in grading_prof.users[name]['courses'][course]:
            assert grading_prof.users[name]['courses'][course][key]['grade'] == "N/A"
            assert grading_prof.users[name]['courses'][course][key]['submission_date'] == "N/A"
            assert grading_prof.users[name]['courses'][course][key]['submission'] == "N/A"
            assert grading_prof.users[name]['courses'][course][key]['ontime'] == "N/A"
        #Remove student
        del grading_prof.users[name]['courses'][course]
        grading_prof.update_user_db()

#Tests the drop_student in Professor class correctly removes correct student from course    
def test_drop_student(grading_prof):
        course = 'databases'
        name = 'hdjsr7'
        #drop the student from course
        grading_prof.drop_student(name,course)
        #loop through all user courses and assert that removed course not in them
        for key in grading_prof.users[name]['courses']:
            assert key != course
            
        #couldnt figure out how to add course back afterward so RestoreData file needs to be run after this test.    
        
#Tests the submit_assignment in Student class to check that the assignment is corrrectly submitted      
def test_submit_assignment(grading_stu):
        #set parameters
        course = 'software_engineering'
        name = grading_stu.name
        assignment = 'assignment1'
        #add a test submission
        grading_stu.submit_assignment(course,assignment,"test","1/11/11") #use date below earliest due date
        #check submission info
        assert grading_stu.users[name]['courses'][course][assignment]['submission_date'] == "1/11/11" 
        assert grading_stu.users[name]['courses'][course][assignment]['submission'] == "test"
        #check ontime tag
        assert grading_stu.users[name]['courses'][course][assignment]['ontime'] == True
        grading_stu.submit_assignment(course,assignment,"test","1/11/31") #use date after latest due date
        assert grading_stu.users[name]['courses'][course][assignment]['ontime'] == False  
   
    
#Test on_time in Student class to make sure it  returns correct values
def test_check_ontime(grading_stu):
    #check several cases that could occur. I don't think this covers all cases but it covers many.
    assert grading_stu.check_ontime('2/22/11','1/11/22') == True
    assert grading_stu.check_ontime('1/11/21', '2/11/21') == True
    assert grading_stu.check_ontime('29/10/21', '2/11/21') == True
    assert grading_stu.check_ontime('1/11/21', '29/10/21') == False
    assert grading_stu.check_ontime('2/11/21', '1/11/21') == False
    assert grading_stu.check_ontime('1/11/22', '2/22/11') == False
    
#Test to see if check_grades  in Student class returns correct grades for user    
def test_check_grades(grading_stu):
    name = grading_stu.name
    #loop through each course of user
    for key in grading_stu.users[name]['courses']:
        grades = grading_stu.check_grades(key)
        #get assignments
        assignments = grading_stu.users[name]['courses'][key]
        count = 0
        #loop through all assignments and assert that grades are equal to returned grades
        for key2 in assignments:
            assert [key2, grading_stu.users[name]['courses'][key][key2]['grade']] == grades[count]
            count = count+1

#Test to see if view_assignments in Student class returns correct assignment list
def test_view_assignments(grading_stu):
    name = grading_stu.name
    #loop through each course for the student
    for key in grading_stu.users[name]['courses']:
        assignments = grading_stu.view_assignments(key)
        #loop through each assignment in the course to check if it was added to assignments
        count = 0
        for key2 in grading_stu.all_courses[key]['assignments']:
            #check if assignments are equal
            assert [key2, grading_stu.all_courses[key]['assignments'][key2]['due_date']] == assignments[count]
            count = count+1

#Test for errors if check_grades in Student recieves a course student is not in
def test_invalid_check_grades_course(grading_stu):
    #loop through all coursees and do check_grade on each. since one cource was dropped in earlier test at least one course will not have this student
    for key in grading_stu.all_courses.keys():
        grading_stu.check_grades(key)
    
#Test for errors if drop_student in Professor tries to drop from a course the student isnt in
#def test_drop_student_not_enrolled(grading_prof):
#    name = 'hdjsr7'
#    course = 'comp_sci'
#    #drop student from same course twice to check for errors
#    grading_prof.drop_student(name, course)
#    temp = grading_prof.users[name]
#    grading_prof.drop_student(name, course)
#    #make sure the student didnt get changed
#    assert temp == grading_prof.user[name]

#Test for errors if assignment doesn't exist in check_grade in Staff
def test_change_grade_not_exist(grading_ta):
    name = 'hdjsr7'
    course = 'cloud_computing'
    #test with non existing assignment
    grading_ta.change_grade(name,course, 'notexist',10)
        
#Test for errors if check_grades in staff is called with a non student user
def test_check_grades_non_student(grading_ta):
    name = 'goggins'
    course = 'databases'
    #Try to get grades from non-student user
    grading_ta.check_grades(name,course)
    
#Test for errors if submit_assignment tries to submit to course student not enrolled in
def test_submit_assignment_not_enrolled(grading_stu):
    name = grading_stu.name
    course = 'comp_sci'
    assignment = 'assignment1'
    #try to submit
    grading_stu.submit_assignment(course,assignment,"test","1/11/11")


#Test to make sure professors not teaching a course cant drop students from that course
def test_drop_student_not_prof(grading_prof):
    name = 'hdjsr7'
    flag = False
    
    #loop through all courses of student
    for key in grading_prof.users[name]['courses']:
        #find a course professor doesnt teach
        if key not in grading_prof.users[grading_prof.name]['courses']:
            #attempt to drop
            grading_prof.drop_student(name, key)
            #check to see if course dropped
            for key2 in grading_prof.users[name]['courses']:
                if key == key2:
                    flag = True
                    break
            break
    #assert that course was not dropped
    assert flag == True

@pytest.fixture
def grading_system():
    gradingSystem = System.System()
    gradingSystem.load_data()
    return gradingSystem

@pytest.fixture
def grading_stu(grading_system):
    return Student.Student('hdjsr7', grading_system.users, grading_system.courses)

@pytest.fixture
def grading_ta(grading_system):
    return TA.TA('cmhbf5', grading_system.users, grading_system.courses)

@pytest.fixture
def grading_prof(grading_system):
    return Professor.Professor('goggins', grading_system.users, grading_system.courses)