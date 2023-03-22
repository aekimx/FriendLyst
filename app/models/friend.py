from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(100), nullable=False, default="Pending")

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", lazy=True, foreign_keys=[user_id])
    friend = db.relationship("User", lazy=True, foreign_keys=[friend_id])

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'friendId': self.friend_id,
            'status': self.status,
            'user': self.user.to_dict_no_post(),
            'friend': self.friend.to_dict_no_post()
        }
    def to_dict_no_self(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'friendId': self.friend_id,
            'status': self.status,
            'friend': self.friend.to_dict_no_post_profile()
        }
