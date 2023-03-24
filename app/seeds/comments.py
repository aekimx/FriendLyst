from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comments = [
        Comment(user_id=2, post_id=1, comment='OMG. He is so cute!'),
        Comment(user_id=3, post_id=1, comment='Is that a doberman?'),
        Comment(user_id=1, post_id=1, comment='Good guess. He\'s a beauceron!'),
        Comment(user_id=1, post_id=1, comment='Good guess. He\'s a beauceron!'),
        Comment(user_id=1, post_id=5, comment= "Where is this from? Looks great!"),
        Comment(user_id=6, post_id=6, comment='Omg! Which one is yours?'),
        Comment(user_id=4, post_id=6, comment='The one to the far right! He\'s so cute.'),
        Comment(user_id=3, post_id=7, comment='Love this hike.'),
        Comment(user_id=7, post_id=9, comment='I love The Idiot by Elif Batuman. Highly recommend!'),
        Comment(user_id=7, post_id=11, comment='I\'m down!. Craving sweetgreen today.'),
        Comment(user_id=4, post_id=8, comment='I\'m going to miss you so much! Have a safe flight!'),
        Comment(user_id=6, post_id=8, comment='Congrats Nikki!'),
        Comment(user_id=7, post_id=8, comment='That sounds AMAZING. You\'re going to kill it!'),
    ]

    db.session.add_all(comments)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
