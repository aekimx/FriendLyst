from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# for backend validation
class LikeForm(FlaskForm):
    userId = StringField("User Id", validators=[DataRequired()])
    postId = StringField("User Id", validators=[DataRequired()])
