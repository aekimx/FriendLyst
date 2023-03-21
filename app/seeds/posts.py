from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    posts = [
        #1-5
        Post(user_id='1',caption='Just got a new pup! He is the cutest. Bonus points if you can guess his breed! ', photo='https://images.squarespace-cdn.com/content/v1/5fcd4f79f35c2027aed964a6/1646421273811-4JP5F4JHMHPUB9CLW5VB/IMG_1491-1.jpg?format=1000w'),
        Post(user_id='1',caption='Umm. Someone help. This puppy is crazy!', photo='https://i.pinimg.com/originals/a9/4a/95/a94a954fe47af7de367999df72afff08.jpg'),
        Post(user_id='1',caption='Officially sleep deprived. SOS.', photo=''),
        Post(user_id='2',caption='Look at this gorgeous sunset today!', photo='https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg'),
        Post(user_id='3',caption='Had the best pasta ever today.', photo='https://media.cnn.com/api/v1/images/stellar/prod/210211140233-03-classic-italian-dishes.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/w_1280'),
        #6-10
        Post(user_id='4',caption='Look at these beautiful lappy puppies. Can\'t wait to get my own', photo='https://4.bp.blogspot.com/-G1gwPeAEW5Q/VzBCr1in3bI/AAAAAAAAEt4/IKDxTUAMVG8fkCwNcaJzgKLcbInjyi60QCLcB/s1600/Finnish-Lapphund-Colour-variation-FLCNSW.jpg'),
        Post(user_id='4',caption='Going on a hike!', photo='https://www.planetware.com/wpimages/2022/02/pennsylvania-top-rated-hiking-trails-intro-paragraph-trail-sign.jpg'),
        Post(user_id='5',caption='Officially moving to Rwanda today for work! Wish me luck!', photo='https://www.tripsavvy.com/thmb/ESemQcXAEmPpFm6kJoIUELBD7Gw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1330741701-a79c6a941e01454e84a41dc442baa99e.jpg'),
        Post(user_id='6',caption='Does anyone have any book recommendations?', photo=''),
        Post(user_id='6',caption='Coffee date today!', photo='https://getliterary.com/app/uploads/2018/07/NYC-Coffee-Shops-1120x630.jpg'),
        #11-12
        Post(user_id='7',caption='Anyone wanna grab lunch?', photo=''),
        Post(user_id='7',caption='Going to yoga today!', photo='https://res.cloudinary.com/peerspace-inc/image/upload/c00buk084jhum9tvs61u.jpg'),

    ]

    db.session.add_all(posts)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
