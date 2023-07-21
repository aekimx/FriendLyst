from flask_socketio import SocketIO, emit, join_room, leave_room
from .models import Message, db
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://friendlyst.onrender.com",
        "https://friendlyst.onrender.com",
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('connect')
def handle_connect():
    print('Client connected')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


# join a room (channel)
@socketio.on('join')
def on_join(data):
    user = data['first_name']
    dm_id = data['dm_id']
    room = f'room{dm_id}'
    join_room(room)

    emit("welcome", f"{user}", room=room)
    return 'Joined room'  # This will be sent back to the client


# leave a room (channel)
@socketio.on('leave')
def on_leave(data):
    user = data['first_name']
    dm_id = data['dm_id']
    room = f'room{dm_id}'

    leave_room(room)
    print(f'{user} left room {room}')
    return 'Left room'  # This will be sent back to the client


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    message = Message (
        sender_id = data['sender_id'],
        dm_id = data['dm_id'],
        message = data['message']
        )
    db.session.add(message)
    db.session.commit()
    emit('chat', message.to_dict(), broadcast = True) # good to broadcast true?
    return 'DM message sent'  # This will be sent back to the client

    # Old code!!!!
    # dm_id = data['dm_id']
    # dm_room = f'room{dm_id}'
    # emit("chat", data, room=dm_room)
