from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    chatting_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


    # Relationship Attributes
    users = db.relationship("User", back_populates='messages', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.message,
            'userId': self.user_id,
            'chattingUserId': self.chatting_user_id,
            'createdAt': self.created_at,
            'users': self.user.to_dict_no_post()
        }
