from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name= db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=True, unique=True)
    gender = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #Relationship Attributes
    user_profiles = db.relationship("UserProfile", back_populates='user', lazy=True, cascade='all, delete')

    # friends = db.relationship("Friend", back_populates='users', lazy=True, cascade='all, delete')

    posts = db.relationship("Post", back_populates='user', lazy=True, cascade='all, delete')
    comments = db.relationship("Comment", back_populates="user", lazy=True)

    # messages = db.relationship("Message", back_populates='users', lazy=True, cascade='all, delete')

    group_member = db.relationship("GroupMember", back_populates='user', lazy=True)
    event_member = db.relationship("EventMember", back_populates='user', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'birthday': self.birthday,
            'gender': self.gender,
            'email': self.email,
            'createdAt': self.created_at,
            'posts': [post.to_dict_no_user() for post in self.posts]
        }

    def to_dict_no_post(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'birthday': self.birthday,
            'gender': self.gender,
            'email': self.email,
            'createdAt': self.created_at,
        }
    def to_dict_no_post_profile(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'birthday': self.birthday,
            'gender': self.gender,
            'email': self.email,
            'createdAt': self.created_at,
            'profile': [profile.to_dict_no_self() for profile in self.user_profiles]
        }
