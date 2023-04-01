from flask_wtf import FlaskForm
from wtforms import StringField, URLField



class UserProfileForm(FlaskForm):
    profile_pic = URLField('profile_pic')
    cover_photo = URLField('cover_photo')
    bio = StringField('Bio')
    location = StringField('Location')
