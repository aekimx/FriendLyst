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
    group = db.relationshp("Group", back_populates='group_posts', lazy=True)
    event = db.relationshp("Event", back_populates='event_posts', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'photo': self.photo,
            'user': self.user.to_dict_no_post(),
            'createdAt': self.created_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
