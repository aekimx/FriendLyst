from app.models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_dms():
    direct_messages = [
        # 1 Demo is friends with everyone
        DirectMessage(user_id=1, chatting_user_id=2), #1
        DirectMessage(user_id=1, chatting_user_id=3), #2
        DirectMessage(user_id=1, chatting_user_id=4), #3
        DirectMessage(user_id=1, chatting_user_id=5), #4
        DirectMessage(user_id=1, chatting_user_id=6), #5
        DirectMessage(user_id=1, chatting_user_id=7), #6

        # 2 Marnie is friends with other demo users, pending with Aileen
        DirectMessage(user_id=2, chatting_user_id=1), #7
        DirectMessage(user_id=2, chatting_user_id=3), #8

        # 3 Bobbie is friends iwth other demo users and pending with Aileen
        DirectMessage(user_id=3, chatting_user_id=1), #9
        DirectMessage(user_id=3, chatting_user_id=2), #10

        # 4 Aileen is friends with her gfs and Demo, pending with Marnie and Bobbie
        DirectMessage(user_id=4, chatting_user_id=1), #11
        DirectMessage(user_id=4, chatting_user_id=5), #12
        DirectMessage(user_id=4, chatting_user_id=6), #13
        DirectMessage(user_id=4, chatting_user_id=7), #14

        # 5 Nikki is friends with all her gfs and Demo
        DirectMessage(user_id=5, chatting_user_id=1), #15
        DirectMessage(user_id=5, chatting_user_id=4), #16
        DirectMessage(user_id=5, chatting_user_id=6), #17
        DirectMessage(user_id=5, chatting_user_id=7), #18

        # 6 Mona is friends with all her gfs and Demo
        DirectMessage(user_id=6, chatting_user_id=1), #19
        DirectMessage(user_id=6, chatting_user_id=4), #20
        DirectMessage(user_id=6, chatting_user_id=5), #21
        DirectMessage(user_id=6, chatting_user_id=7), #22

        # 7 Kita is friends with all her gfs and Demo
        DirectMessage(user_id=7, chatting_user_id=1), #23
        DirectMessage(user_id=7, chatting_user_id=4), #24
        DirectMessage(user_id=7, chatting_user_id=5), #25
        DirectMessage(user_id=7, chatting_user_id=6), #26


    ]

    db.session.add_all(direct_messages)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dms():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
