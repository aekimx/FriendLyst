from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(2000), nullable=False)
    photo = db.Column(db.String(2000), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Optional Foreign Key to specify whether in an event or group
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=True)

    # Relationship Attributes
    user = db.relationship("User", back_populates='posts', lazy=True)
    comments = db.relationship("Comment", back_populates='post', lazy=True, cascade='all, delete')
    group = db.relationship("Group", back_populates='group_posts', lazy=True)
    event = db.relationship("Event", back_populates='event_posts', lazy=True)
    likes = db.relationship("Like", back_populates='post', lazy=True, cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'photo': self.photo,
            'user': self.user.to_dict_no_post(),
            'createdAt': self.created_at,
            'likes': [like.to_dict() for like in self.likes],
            'comments': [comment.to_dict() for comment in self.comments]
        }
    def to_dict_no_user(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'photo': self.photo,
            'createdAt': self.created_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'photo': self.photo,
        }
