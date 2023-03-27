from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_friends():
    friends = [
        # 1 Demo is friends with everyone
        Friend(user_id=1, friend_id=2, status='Accepted'),
        Friend(user_id=1, friend_id=3, status='Accepted'),
        Friend(user_id=1, friend_id=4, status='Accepted'),
        Friend(user_id=1, friend_id=5, status='Accepted'),
        Friend(user_id=1, friend_id=6, status='Accepted'),
        Friend(user_id=1, friend_id=7, status='Accepted'),

        # 2 Marnie is friends with other demo users, pending with Aileen
        Friend(user_id=2, friend_id=1, status='Accepted'),
        Friend(user_id=2, friend_id=3, status='Accepted'),
        Friend(user_id=2, friend_id=4, status='Pending'),


        # 3 Bobbie is friends iwth other demo users and pending with Aileen
        Friend(user_id=3, friend_id=1, status='Accepted'),
        Friend(user_id=3, friend_id=2, status='Accepted'),
        Friend(user_id=3, friend_id=4, status='Pending'),

        # 4 Aileen is friends with her gfs and Demo, pending with Marnie and Bobbie
        Friend(user_id=4, friend_id=1, status='Accepted'),
        Friend(user_id=4, friend_id=5, status='Accepted'),
        Friend(user_id=4, friend_id=6, status='Accepted'),
        Friend(user_id=4, friend_id=7, status='Accepted'),
        Friend(user_id=4, friend_id=2, status='Pending'),
        Friend(user_id=4, friend_id=3, status='Pending'),

        # 5 Nikki is friends with all her gfs
        Friend(user_id=5, friend_id=4, status='Accepted'),
        Friend(user_id=5, friend_id=6, status='Accepted'),
        Friend(user_id=5, friend_id=7, status='Accepted'),

        # 6 Mona is friends with all her gfs
        Friend(user_id=6, friend_id=4, status='Accepted'),
        Friend(user_id=6, friend_id=5, status='Accepted'),
        Friend(user_id=6, friend_id=7, status='Accepted'),

        # 7 Kita is friends with all her gfs
        Friend(user_id=7, friend_id=6, status='Accepted'),
        Friend(user_id=7, friend_id=5, status='Accepted'),
        Friend(user_id=7, friend_id=4, status='Accepted'),
    ]

    db.session.add_all(friends)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
