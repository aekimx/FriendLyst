from flask import Blueprint, jsonify, request
from sqlalchemy import and_, or_
from flask_login import login_required
from app.models import Message, db, DirectMessage
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)


#GET ALL USERS DM Channels, messages attached
@message_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required
def get_all_dms(user_id):
    ''' Query for all DM channels of a specific user and return in a dictionary '''

    all_dms = DirectMessage.query.filter(or_(DirectMessage.user_id == user_id, DirectMessage.user_id_two == user_id)).all()
    # all_messages = Message.query.filter(Message.user_id == user_id).all()

    return [dm.to_dict() for dm in all_dms]

#GET DM MESSAGES
@message_routes.route('/<int:dmId>', methods=['GET'])
@login_required
def get_dm_by_id(dmId):
    ''' Query for a DM Channel by user Id and friend Id and return it in a dictionary '''
    messages = Message.query.filter(Message.dm_id == dmId).all()

    if messages is None:
        return jsonify({'error': 'DM not found'}), 404

    return [message.to_dict_no_dm() for message in messages]

#CREATE MESSAGE IN DM
@message_routes.route('', methods=['POST'])
@login_required
def create_message():
    ''' Create a message and return as a dictionary '''
    data = request.get_json()
    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit:
        message = Message( sender_id = data['sender_id'], dm_id = data['dm_id'], message = data['message'])
        db.session.add(message)
        db.session.commit()
        return message.to_dict_no_dm()

    return jsonify({"error": "Error validating message"})



# @message_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def accept_friend_request(id):
#     ''' Query for a message by ID and update it if message exists. Returned as a dictionary.'''
#     message = Message.query.get(id)

#     if message is None:
#         return jsonify({'error': 'Message not found'}), 404

#     data = request.get_json()
#     form = MessageForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         message.message = data['message']
#         db.session.commit()
#         return jsonify(message.to_dict()), 200




# @message_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def remove_friend(id):
#     ''' Query for a message by ID and delete it if message exists. Return sucess response '''
#     message = Message.query.get(id)

#     if message is None:
#         return jsonify({'error': 'Message not found'}), 404

#     db.session.delete(message)
#     db.session.commit()
#     return jsonify({'Success': 'Message successfully deleted'})
