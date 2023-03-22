from .db import db, environment, SCHEMA, add_prefix_for_prod

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    photo = db.Column(db.String(500), nullable=True)
    location = db.Column(db.String(500), nullable=True)

    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    event_posts = db.relationship("Post", back_populates='event', lazy=True, cascade='all, delete')
    members = db.relationship('User', back_populates='event', lazy=True, cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ownerId': self.owner_id,
            'posts': [post.to_dict() for post in self.event_posts],
            'members': [member.to_dict_no_post() for member in self.members]
        }

    def to_dict_no_members(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ownerId': self.owner_id,
            'posts': [post.to_dict() for post in self.event_posts],
        }
