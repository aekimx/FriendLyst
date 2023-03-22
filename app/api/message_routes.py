from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Message, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('', methods=['GET'])
# @login_required
def get_all_messages():
    ''' Query for all messages and return in a list of dictionaries '''
    all_messages = Message.query.all()
    return [message.to_dict() for message in all_messages]


# DO WE NEED THIS ROUTE??
@message_routes.route('/<int:id>', methods=['GET'])
# @login_required
def find_message(id):
    ''' Query for a message and return in a dictionary '''
    message = Message.query.get(id)

    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    return message.to_dict()


@message_routes.route('', methods=['POST'])
# @login_required
def create_message():
    ''' Create a message and return as a dictionary '''
    data = request.get_json()
    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    message = Message( user_id = data['user_id'], chatting_user_id = data['chatting_user_id'], message = data['message'])
    db.session.add(message)
    db.session.commit()
    return message.to_dict()



@message_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def accept_friend_request(id):
    ''' Query for a message by ID and update it if message exists. Returned as a dictionary.'''
    message = Message.query.get(id)

    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    data = request.get_json()
    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        message.message = data['message']
        db.session.commit()
        return jsonify(message.to_dict()), 200




@message_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def remove_friend(id):
    ''' Query for a message by ID and delete it if message exists. Return sucess response '''
    message = Message.query.get(id)

    if message is None:
        return jsonify({'error': 'Message not found'}), 404

    db.session.delete(message)
    db.session.commit()
    return jsonify({'Success': 'Message successfully deleted'})
