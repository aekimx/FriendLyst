from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    messages = [
        Message(message='Hey how are you?', user_id=1, chatting_user_id= 4),
        Message(message='Great and yourself?', user_id=4, chatting_user_id= 1),
        Message(message='Great. Having a puppy is hard work isn\'t it?', user_id=1, chatting_user_id= 4),
        Message(message='It really is. They are so cute though!', user_id=4, chatting_user_id= 1),
        Message(message='I know right. I can\'t stop taking pics!', user_id=1, chatting_user_id= 4),

        Message(message='Hey girl I saw you wanted to go to lunch! Are you still free today?', user_id=6, chatting_user_id= 7),
        Message(message='Yeah sorry I missed your comment. Got caught up with work. You said sweetgreen?', user_id=7, chatting_user_id= 6),
        Message(message='Sounds good to me! 2PM work?', user_id=6, chatting_user_id= 7),
        Message(message='Yep! See you at the Astor Place location!', user_id=7, chatting_user_id= 6),
    ]

    db.session.add_all(messages)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
