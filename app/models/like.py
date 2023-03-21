from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    liked = db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", backref='users', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'liked': self.liked,
            'user': self.user.to_dict_name(),
            'postId': self.post_id,
        }
