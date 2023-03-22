from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User



class UserProfileForm(FlaskForm):
    profile_pic = URLField('profile_pic')
    cover_photo = URLField('cover_photo')
    bio = StringField('Bio', validators=[DataRequired()])
    location = StringField('Location')
