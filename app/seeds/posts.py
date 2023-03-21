from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
        first_name='Demo', last_name='Lition', birthday='01/01/2000',
        email='demo@aa.io', gender='female', password='password'),

        User(first_name='Marnie', last_name='Smith', birthday='01/02/1999',
              email='marnie@aa.io', gender='female', password='password'),

        User(first_name='Bobbie', last_name='Jones', birthday='05/03,1965',
              email='bobbie@aa.io', gender='male',password='password'),

        User(first_name='Aileen', last_name='Kim', birthday='08/06/1996',
             email='akim@gmail.com', gender='female', password='password'
             ),
        User(first_name='Jonathan', last_name='Yee', birthday='01/02/1994',
             email='jyee@gmail.com', gender='male', password='password'
             ),
        User(first_name='Nikki', last_name='Schutz', birthday='09/16/1995',
             email='nschtuz@gmail.com', gender='female', password='password'
             ),
        User(first_name='Mona', last_name='Ravioli', birthday='08/06/1996',
             email='mravioli@gmail.com', gender='female', password='password'
             ),
        User(first_name='Kita', last_name='Cannes', birthday='07/14/1997',
             email='kcannes@gmail.com', gender='female', password='password'
             ),

    ]

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
