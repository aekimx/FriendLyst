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
# @socketio.on('join')
# def on_join(data):
#     user = data['first_name']
#     room = data['channel_id']
#     join_room(room)

#     emit("welcome", f"{username}", room=room)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
