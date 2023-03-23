from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cover_photo = db.Column(db.String(500), nullable=True )
    bio = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(600), nullable=True)

    # Relationship Attributes
    user = db.relationship("User", back_populates='user_profiles', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'coverPhoto': self.cover_photo,
            'bio': self.bio,
            'location': self.location,
            'user': self.user.to_dict()
        }
    def to_dict_no_self(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'coverPhoto': self.cover_photo,
            'bio': self.bio,
            'location': self.location,
        }
