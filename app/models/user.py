from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName= db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    birthday = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=True, unique=True)
    gender = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

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
            'firstName': self.firstName,
            'lastName': self.lastName,
            'birthday': self.birthday,
            'gender': self.gender,
            'email': self.email,
            'createdAt': self.created_at,
        }
