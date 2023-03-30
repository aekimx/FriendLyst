from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    chatting_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    chatting_user = db.relationship("User", lazy=True, foreign_keys=[chatting_user_id])
    # messages = db.relationship("Message", back_populates='direct_message', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'chattingUserId': self.chatting_user_id,
            'user': self.user.to_dict_name(),
            'chattingUser': self.chatting_user.to_dict_name(),
            # 'messages': self.messages.to_dict_no_dm()
        }
