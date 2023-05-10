from flask_socketio import SocketIO, emit, join_room, leave_room
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
    print('*******HITTING LEAVE ROOM ROUTE IN SOCKET.PY***********')
    user = data['first_name']
    dm_id = data['dm_id']
    room = f'room{dm_id}'

    leave_room(room)
    print(f'{user} left room {room}')
    return 'Left room'  # This will be sent back to the client


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print('******* what is data when handling chat messages?', data)
    dm_id = data['dm_id']
    dm_room = f'room{dm_id}'


    emit("chat", data, room=dm_room)
    return 'DM message sent'  # This will be sent back to the client
