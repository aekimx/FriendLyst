from flask.cli import AppGroup
from .users import seed_users, undo_users
from .user_profiles import seed_user_profiles, undo_user_profiles
from .friends import seed_friends, undo_friends
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .groups import seed_groups, undo_groups
from .group_members import seed_group_members, undo_group_members
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_group_members()
        undo_groups()
        undo_likes()
        undo_comments()
        undo_posts()
        undo_friends()
        undo_messages()
        undo_user_profiles()
        undo_users()
    seed_users()
    seed_user_profiles()
    seed_friends()
    seed_messages()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_groups()
    seed_group_members()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_group_members()
    undo_groups()
    undo_likes()
    undo_comments()
    undo_posts()
    undo_friends()
    undo_user_profiles()
    undo_users()
    # Add other undo functions here
