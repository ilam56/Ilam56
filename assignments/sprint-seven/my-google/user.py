from flask_login import UserMixin

from db import get_db


class User(UserMixin):
    def __init__(self, id_, name, email, profile_pic):
        self.id = id_
        self.name = name
        self.email = email
        self.profile_pic = profile_pic

    @staticmethod
    def get(user_id):
        db = get_db()
        user = db.execute(
            "SELECT * FROM user WHERE id = ?", (user_id,)
        ).fetchone()
        if not user:
            return None

        user = User(
            id_=user[0], name=user[1], email=user[2], profile_pic=user[3]
        )
        return user

    @staticmethod
    def create(id_, name, email, profile_pic):
        db = get_db()
        db.execute(
            "INSERT INTO user (id, name, email, profile_pic)"
            " VALUES (?, ?, ?, ?)",
            (id_, name, email, profile_pic),
        )
        db.commit()

    @staticmethod
    def setQuestions(id_, quest1, quest2, quest3):
        db = get_db()
        db.execute(
            "UPDATE user SET quest1 = ?, quest2 = ?, quest3 = ? WHERE id = ?",
            (quest1, quest2, quest3, id_),
        )
        db.commit()
    
    @staticmethod
    def getQuestion(user_id, quest):
        db = get_db()
        #this is to get question result that user picked
        #for some reason I was having trouble when only selecting the question column so had to do all cols
        question = db.execute(
            "SELECT * FROM user WHERE id = ?", (user_id,),
        ).fetchone()
        return question[3+quest]
    
    def questTotal(quest, ans):
        count=0
        db = get_db()
        #for some stupid freaking reason it didnt work to put the quest var into the query using ? no idea why it should be the exact same thing but doesnt work.
        #get the rows that match the passed ans
        if quest == "quest1":
            question = db.execute(
                "SELECT * FROM user WHERE quest1 = ?", (ans,),
            ).fetchall()
        elif quest == "quest2":
            question = db.execute(
                "SELECT * FROM user WHERE quest2 = ?", (ans,),
            ).fetchall()        
        else:
            question = db.execute(
                "SELECT * FROM user WHERE quest3 = ?", (ans,),
            ).fetchall()  
        #count number of rows then return the count    
        for x in question:
            count = count+1
        return count