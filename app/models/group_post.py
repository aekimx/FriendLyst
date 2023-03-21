from .db import db, environment, SCHEMA, add_prefix_for_prod

class GroupPost(db.Model):
    __tablename__ = 'group_posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(2000), nullable=True)
    photo = db.Column(db.String(2000), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", backref='posts', lazy=True)
    comments = db.relationship("Comment", backref='comments', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'photo': self.photo,
            'user': self.user.to_dict_no_post(),
            'comments': [comment.to_dict() for comment in self.comments]
        }
