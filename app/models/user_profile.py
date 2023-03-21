from .db import db, environment, SCHEMA, add_prefix_for_prod

class User(db.Model):
    __tablename__ = 'user_profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profile_pic = db.Column(db.String(500), nullable=True )
    cover_photo = db.Column(db.String(500), nullable=True )
    bio = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(600), nullable=True, unique=True)
    workplace = db.Column(db.String(50), nullable=False)

    # Relationship Attributes
    # need all user info to populate here
    #need all post info to populate here for photos


    def to_dict(self):
        return {
            'id': self.id,
            'profilePic': self.profile_pic,
            'coverPhoto': self.cover_photo,
            'bio': self.bio,
            'location': self.location,
            'workplace': self.workplace
        }
