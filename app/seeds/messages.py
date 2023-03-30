from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    messages = [
        #Convo between Demo and Aileen
        Message(message='Hey how are you?', sender_id=1, dm_id= 3 ),
        Message(message='Great and yourself?', sender_id=4, dm_id= 3),
        Message(message='Great. Having a puppy is hard work isn\'t it?', sender_id=1, dm_id= 3),
        Message(message='It really is. They are so cute though!', sender_id=4, dm_id= 3),
        Message(message='I know right. I can\'t stop taking pics!', sender_id=1, dm_id= 3),

        #Convo between Demo and Kita
        Message(message='Hey girl I saw you wanted to go to lunch! Are you still free today?', sender_id=1, dm_id=6),
        Message(message='Yeah sorry I missed your comment. Got caught up with work. You said sweetgreen?', sender_id=7, dm_id=6),
        Message(message='Sounds good to me! 2PM work?', sender_id=1, dm_id=6),
        Message(message='Yep! See you at the Astor Place location!', sender_id=7, dm_id=6),

        #Convo between Demo and Nikki
        Message(message='Hey! How is Rwanda? The pictures look amazing!', sender_id=1, dm_id=4),
        Message(message='It\'s wonderful! It was a super long flight though...', sender_id=5, dm_id=4),
        Message(message='Really? How long?!', sender_id=1, dm_id=4),
        Message(message='There are no nonstop flights, so it took almost 20 hours total!', sender_id=5, dm_id=4),
        Message(message='That\'s insane. I barely would be able to handle that!', sender_id=1, dm_id=4),
        Message(message='IKR. But honestly so worth it. I\'m so excited for the next few months here.', sender_id=5, dm_id=4),
        Message(message='You\'re there for work right?', sender_id=1, dm_id=4),
        Message(message='Yep! Research project!', sender_id=5, dm_id=4),
        Message(message='So cool! Good luck!', sender_id=1, dm_id=4),

        #Convo between Aileen and Mona
        Message(message='Just saw your post! Where was that coffee shop you posted? It looked so cute!', sender_id=4, dm_id=9),
        Message(message='It\'s a new one that popped up by my apartment. It\'s called Happy Espresso', sender_id=6, dm_id=9),
        Message(message='I should check it out. I love espresso!', sender_id=4, dm_id=9),
        Message(message='The espresso here is really good! I got a latte and it was one of the best ones I\'ve had.', sender_id=6, dm_id=9),
        Message(message='Thanks!', sender_id=4, dm_id=9),

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
