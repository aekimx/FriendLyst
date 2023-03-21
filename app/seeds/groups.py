from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_groups():
    groups = [
        Group(admin_id= 1, name='Puppy Updates', description='For new puppy owners! Please post updates and ask any questions!', group_pic='https://i.natgeofe.com/k/559a884a-41d7-4731-b940-96f4cf2c8831/puppy-life-book-5_2x1.jpg'),
        Group(admin_id= 4, name='NYU Grad Updates', description='Place to stay connected with our friends from NYU!', group_pic='https://meet.nyu.edu/wp-content/uploads/2020/04/WSP4.jpg'),
        Group(admin_id= 5, name='Book Club', description='Lets discuss books and drink coffee together!', group_pic='https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1649827506.webp'),
    ]

    db.session.add_all(groups)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
