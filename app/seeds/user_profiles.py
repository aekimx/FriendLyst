from app.models import db, UserProfile, environment, SCHEMA
from sqlalchemy.sql import text


def seed_user_profiles():
    user_profiles = [
        # Demo 1
        UserProfile(user_id=1, cover_photo='https://www.travelandleisure.com/thmb/HvNi3CSOUaPdhqfp0TqFw3cd9y0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-northern-lights-finland-lapland-FINLAPLAND1222-51477112b7e94a0cb282009aef4d09db.jpg', bio='Talk to me about anything!', location='New York, NY'),
        # Marnie 2
        UserProfile(user_id=2,  cover_photo='https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg', bio='Cardiothoraic surgeon living her best life in Florida!', location='Miami, FL'),
        #Bobbie 3
        UserProfile(user_id=3,  cover_photo='https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg', bio='Send me your funniest memes!', location='Portland, OR'),
        #Aileen 4
        UserProfile(user_id=4, cover_photo='https://mthoodterritory.objects.liquidweb.services/photos/1749-mthood-tulip-field-2-1200x800.jpg', bio='Passionate software engineer looking to find an exciting role in web dev with an innovative company!', location='New York, NY'),
        #Nikki 5
        UserProfile(user_id=5,  cover_photo='https://destinationlesstravel.com/wp-content/uploads/2020/07/The-Fuego-Volcano.jpg.webp', bio='Traveling is my favorite thing ever. Let\'s go on an adventure!', location='Denver, CO'),
        #Mona 6
        UserProfile(user_id=6,  cover_photo='https://media.istockphoto.com/photos/purple-space-stars-picture-id157639696?b=1&k=20&m=157639696&s=612x612&w=0&h=1sRnBfXOrJyh3ue_dJSh-KYdGhYGNuDYnDBVSoM6cks=', bio='I love all things physics, literature, and cats!', location='New York, NY'),
        #Kita 7
        UserProfile(user_id=7,  cover_photo='https://live.staticflickr.com/2182/1755029632_6cb49184a6_b.jpg', bio='Always carrying my film camera. Smile!', location='Brooklyn, NY'),

    ]

    db.session.add_all(user_profiles)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_profiles"))

    db.session.commit()
