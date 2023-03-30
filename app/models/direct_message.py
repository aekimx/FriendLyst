from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_id_two = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    user_two = db.relationship("User", lazy=True, foreign_keys=[user_id_two])
    messages = db.relationship("Message", back_populates='direct_message', lazy=True, cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'userIdTwo': self.user_id_two,
            'user': self.user.to_dict_name(),
            'userTwo': self.user_two.to_dict_name(),
            'messages': [message.to_dict_no_dm() for message in self.messages]
        }

    def to_dict_no_message(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'chattingUserId': self.user_id_two,
            'user': self.user.to_dict_name(),
            'chattingUser': self.user_two.to_dict_name(),
        }
