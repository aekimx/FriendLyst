from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


# for backend validation
class PostForm(FlaskForm):
    caption = StringField("Caption", validators=[DataRequired()])
    photo = FileField("Photo", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("User Id", validators=[DataRequired()])
