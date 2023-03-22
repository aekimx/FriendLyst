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
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    chatting_user = db.relationship("User", lazy=True, foreign_keys=[chatting_user_id])


    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.message,
            'userId': self.user_id,
            'chattingUserId': self.chatting_user_id,
            'createdAt': self.created_at,
            'user': self.user.to_dict_no_post(),
            'chattingUser': self.chatting_user.to_dict_no_post_profile()
        }
