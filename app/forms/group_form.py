from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired


# for backend validation
class GroupForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    group_pic = URLField("Group Photo", validators=[DataRequired()])
