from app.models import db, GroupMember, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_group_members():
    group_members = [
        #Puppy Updates
        GroupMember(group_id=1, member_id=1, status='Accepted'),
        GroupMember(group_id=1, member_id=4, status='Accepted'),
        GroupMember(group_id=1, member_id=2, status='Pending'),
        GroupMember(group_id=1, member_id=3, status='Pending'),

        #NYU Grads
        GroupMember(group_id=2, member_id=4, status='Accepted'),
        GroupMember(group_id=2, member_id=5, status='Accepted'),
        GroupMember(group_id=2, member_id=6, status='Accepted'),
        GroupMember(group_id=2, member_id=7, status='Accepted'),
        GroupMember(group_id=2, member_id=1, status='Pending'),

        #Book Club
        GroupMember(group_id=3, member_id=1, status='Accepted'),
        GroupMember(group_id=3, member_id=2, status='Accepted'),
        GroupMember(group_id=3, member_id=3, status='Accepted'),
        GroupMember(group_id=3, member_id=4, status='Accepted'),
        GroupMember(group_id=3, member_id=5, status='Accepted'),
        GroupMember(group_id=3, member_id=6, status='Accepted'),
        GroupMember(group_id=3, member_id=7, status='Accepted'),

    ]

    db.session.add_all(group_members)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_group_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_members"))

    db.session.commit()
