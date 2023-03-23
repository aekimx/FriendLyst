from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        # 1 Demo
        User(
        first_name='Demo', last_name='Lition', birthday='01/01/2000',
        email='demo@aa.io', gender='female', password='password',
        profile_pic='https://i.pinimg.com/736x/f8/f3/83/f8f383bfebdcd8692728b0fd266a50d9.jpg'),

        # 2
        User(first_name='Marnie', last_name='Smith', birthday='01/02/1999',
              email='marnie@aa.io', gender='female', password='password',
              profile_pic='https://media.istockphoto.com/id/1293310156/vector/female-doctor-with-stethoscope-vector-illustration-in-flat-style.jpg?s=612x612&w=0&k=20&c=2LAwOKb9PNrI7KS0rdq26BzfScR87CaB3tTMB5FO4VE='),

        # 3
        User(first_name='Bobbie', last_name='Jones', birthday='05/03/1965',
              email='bobbie@aa.io', gender='male',password='password',
              profile_pic='https://media.istockphoto.com/id/980239992/vector/happy-handsome-man-showing-thumbs-up-concept-illustration-in-cartoon-style.jpg?s=612x612&w=0&k=20&c=1ikVDLkafPxGOLqq4gtIs4HQFBQpdjuiaSchIoqW_M4=',
              ),
        # 4
        User(first_name='Aileen', last_name='Kim', birthday='08/06/1996',
             email='akim@gmail.com', gender='female', password='password',
             profile_pic='https://media.istockphoto.com/id/1174939212/vector/a-joyful-woman-joins-some-event-with-her-open-arms.jpg?s=612x612&w=0&k=20&c=tJNmXL0k8LtbiK1S_OZldSef8wkUMq2MUWMleXMR7QM='
             ),
        # 5
        User(first_name='Nikki', last_name='Schutz', birthday='09/16/1995',
             email='nschtuz@gmail.com', gender='female', password='password',
             profile_pic='https://media.istockphoto.com/id/1336447951/vector/curly-red-hair-woman-portrait-isolated-on-white-background-girl-with-freckles.jpg?s=612x612&w=0&k=20&c=DhdwMKuHmk9OP2rOJc3Sjhc7gBeEOERwkN_T7n3Hjvw=',
             ),
        # 6
        User(first_name='Mona', last_name='Ravioli', birthday='08/06/1996',
             email='mravioli@gmail.com', gender='female', password='password',
             profile_pic='https://media.istockphoto.com/id/1323034211/vector/happy-smiling-female-character-is-enjoing-her-coffee.jpg?s=612x612&w=0&k=20&c=P43nfNc5scd4viwFT05nGZrHgczvqQxoA2rEVvVuHcc=',
             ),
        # 7
        User(first_name='Kita', last_name='Cannes', birthday='07/14/1997',
             email='kcannes@gmail.com', gender='female', password='password',
             profile_pic='https://media.istockphoto.com/id/1312094304/vector/black-woman-points-on-light-bulb-over-her-happy-african-female-entrepreneur-has-business.jpg?s=612x612&w=0&k=20&c=6_sHxAVsuULWtzTIM6TX7uosTtjGpetq2hxm0oRNvkY=',
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
