from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# for backend validation
class PostForm(FlaskForm):
    caption = StringField("Caption")
    photo = StringField("Photo")
