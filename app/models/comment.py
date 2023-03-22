from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", back_populates='comments', lazy=True)
    post = db.relationship("Post", back_populates='comments', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'userId': self.user_id,
            'postId': self.post_id,
            'createdAt': self.created_at,
            'user': self.user.to_dict_no_post()
        }
