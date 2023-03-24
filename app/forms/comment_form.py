from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


# for backend validation
class CommentForm(FlaskForm):
    comment = StringField("Caption", validators=[DataRequired()])
    userId = StringField("Caption", validators=[DataRequired()])
    postId = StringField("Caption", validators=[DataRequired()])
