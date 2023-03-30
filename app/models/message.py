from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    dm_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('direct_messages.id')), nullable=False)

    # Relationship Attributes
    user = db.Relationship("User", back_populates='messages', lazy=True)
    direct_message = db.relationship("DirectMessage", back_populates='messages', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'createdAt': self.created_at,
            'dm_id': self.dm_id,
            'direct_message': self.direct_message.to_dict_no_message()
        }

    def to_dict_no_dm(self):
        return {
            'id': self.id,
            'message': self.message,
            'createdAt': self.created_at,
            # 'dm_id': self.dm_id,
        }
