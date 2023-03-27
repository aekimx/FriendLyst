from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, UserProfile, db, Friend
from app.forms import UserProfileForm

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def get_all_users():
    """ Query for all users and returns them in a list of user dictionaries """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_user_by_id(id):
    """ Query for a user by id and returns that user's profile in a dictionary """

    user_profile = UserProfile.query.get(id)

    if user_profile is None:
        return jsonify({"error": "User not found"})

    return user_profile.to_dict()

@user_routes.route('/search', methods=["PUT"])
@login_required
def search_user():
    """ Query for a user by the search input provided  and returns that user's profile in a dictionary """

    # get the data as a single string
    data = request.get_json();
    # split the data to get first and last name presumably...
    # what happens if you split something and it doesn't have a space?
    search = data.split(" ").lower()

    #different combos for what the search could have been!
    users_full_name = User.query.filter(User.first_name == search[0]).filter(User.last_name == search[1]).all()
    users_full_name_two = User.query.filter(User.first_name == search[1]).filter(User.last_name == search[0]).all()

    users_first_name = User.query.filter(User.first_name == search[0]).all()
    users_first_name_two = User.query.filter(User.first_name == search[1]).all()

    users_last_name = User.query.filter(User.last_name == search[1]).all()
    user_last_name_two = User.query.filter(User.last_name == search[0]).all()

    return jsonify({"test": "Test"})
    # if you can't find any users by that name

    # if users is None:
    #     return jsonify({"error": "User not found"})

    # return user_profile.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_user_by_id(id):
    ''' Query for a user by id if exists and updates. Returns updated user in a dictionary '''
    user_profile = UserProfile.query.get(id)

    if user_profile is None:
        return jsonify({"error": "User not found"})

    form = UserProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    data = request.get_json()

    if form.validate_on_submit:
        user_profile.profile_pic = data['profile_pic'] or user_profile.profile_pic
        user_profile.cover_photo = data['cover_photo'] or user_profile.cover_photo
        user_profile.bio = data['bio'] or user_profile.bio
        user_profile.location = data['location'] or user_profile.location
        db.session.commit()
        return jsonify(user_profile.to_dict()), 200


@user_routes.route('/<int:id>/friends/pending', methods=["GET"])
# @login_required
def get_friend_requests(id):
    ''' Query for a user's pending friend requests. Return in a list of dictionaries '''
    all_friends = Friend.query.filter(Friend.user_id == id).filter(Friend.status == 'Pending').all()

    if all_friends is None:
        return jsonify({"error": "No friends found "})

    return jsonify([friend.to_dict_no_self() for friend in all_friends]), 200


@user_routes.route('/<int:id>/friends', methods=["GET"])
# @login_required
def get_friend_list(id):
    ''' Query for a user's accepted friends list. Return in a list of dictionaries '''
    all_friends = Friend.query.filter(Friend.user_id == id).filter(Friend.status == 'Accepted').all()

    if all_friends is None:
        return jsonify({"error": "No friends found "})

    return jsonify([friend.to_dict_no_self() for friend in all_friends]), 200
