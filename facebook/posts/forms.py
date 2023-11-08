from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, ValidationError, FileField)
from wtforms.validators import DataRequired

from flask_ckeditor import CKEditorField



class PostForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired()])
  content = CKEditorField("Content", validators=[DataRequired(message="Add content to the post")])
  image = FileField("Upload Image")
  submit = SubmitField("Add Post")

class CommentForm(FlaskForm):
  comment = StringField("Add Comment", validators=[DataRequired()])
  submit = SubmitField("Comment")


    
