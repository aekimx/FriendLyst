from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Friend, db

friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/user/<int:id>', methods=['GET'])
@login_required
def get_all_friends(id):
    ''' Query for all friends and return in a list of dictionaries '''

    all_friends = Friend.query.filter(Friend.status == 'Accepted').filter(Friend.user_id == id).all()
    return [friend.to_dict_no_self() for friend in all_friends]


@friend_routes.route('/user/<int:id>/requests', methods=['GET'])
@login_required
def get_all_requests(id):
    ''' Query for all friends and return in a list of dictionaries '''

    all_friends = Friend.query.filter(Friend.status == 'Pending').filter(Friend.user_id == id).all()
    return [friend.to_dict_no_self() for friend in all_friends]


@friend_routes.route('/<int:id>', methods=['GET'])
@login_required
def find_friend_request(id):
    ''' Query for friend request and return in a dictionary '''
    friend_request = Friend.query.get(id)

    if friend_request is None:
        return jsonify({'error': 'Friend request not found'}), 404

    return friend_request.to_dict()


@friend_routes.route('', methods=['POST'])
@login_required
def add_friend():
    ''' Create a new friend request and return the newly created friend request as a dictionary '''
    data = request.get_json()

    friend_request = Friend( user_id = data['userId'],  friend_id = data['friendId'], status = "Pending")

    db.session.add(friend_request)
    db.session.commit()

    return friend_request.to_dict()



@friend_routes.route('/<int:id>', methods=["PUT"])
@login_required
def accept_friend_request(id):
    ''' Query for a friend request by ID and update it if request exists. Returned as a dictionary.'''
    friend = Friend.query.get(id)


    if friend is None:
        return jsonify({'error': 'Friend not found'}), 404

    friend.status = "Accepted"
    db.session.commit()

    new_friend = Friend(friend_id = friend.friend_id, user_id = friend.user_id, status = "Accepted")
    db.session.add(new_friend)
    db.session.commit()
    return jsonify(friend.to_dict_no_self()), 200



@friend_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_friend(id):
    ''' Query for a friend request by ID, whether accepted or pending and delete it if request exists. Return a successful message '''
    friend = Friend.query.get(id)

    other_side = Friend.query.filter(Friend.friend_id == friend.user_id).filter(Friend.user_id == friend.friend_id).first()

    if friend is None:
        return jsonify({'error': 'Friend not found'}), 404

    db.session.delete(friend)
    db.session.delete(other_side)
    db.session.commit()
    return jsonify(friend.to_dict())
