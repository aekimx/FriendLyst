from app.models import db, DirectMessage, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_dms():
    direct_messages = [
        # 1 Demo is friends with everyone       #DM ID      #PARTICIPANTS
        DirectMessage(user_id=1, user_id_two=2), #1          Demo + Marnie
        DirectMessage(user_id=1, user_id_two=3), #2          Demo + Bobbie
        DirectMessage(user_id=1, user_id_two=4), #3          Demo + Aileen
        DirectMessage(user_id=1, user_id_two=5), #4          Demo + Nikki
        DirectMessage(user_id=1, user_id_two=6), #5          Demo + Mona
        DirectMessage(user_id=1, user_id_two=7), #6          Demo + Kita


        # 2 Marnie is friends with other demo users,
        DirectMessage(user_id=2, user_id_two=3), #7         Marnie + Bobbie


        # 4 Aileen is friends with her gfs and Demo,
        DirectMessage(user_id=4, user_id_two=5), #8         Aileen + Nikki
        DirectMessage(user_id=4, user_id_two=6), #9         Aileen + Mona
        DirectMessage(user_id=4, user_id_two=7), #10        Aileen + Kita

        # 5 Nikki is friends with all her gfs and Demo
        DirectMessage(user_id=5, user_id_two=6), #11        Nikki + Mona
        DirectMessage(user_id=5, user_id_two=7), #12        Nikki + Kita

        # 6 Mona is friends with all her gfs and Demo
        DirectMessage(user_id=6, user_id_two=7), #13        Mona + Kita

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.direct_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM direct_messages"))

    db.session.commit()
