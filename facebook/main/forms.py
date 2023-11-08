from flask_wtf import FlaskForm
from wtforms import (StringField, RadioField, SubmitField,
                     EmailField, FileField,ValidationError)
from wtforms.validators import DataRequired
from facebook.models import User
from flask import flash
from flask_login import current_user

class UpdateForm(FlaskForm):
  firstname = StringField('First Name', validators=[DataRequired()])
  lastname = StringField('Last Name', validators=[DataRequired()])
  email = EmailField('Email', validators=[DataRequired()])
  profile = FileField("Profile Picture")
  submit = SubmitField('Update')


  gender_choices = [('male', 'Male'), ('female', 'Female')]
  gender = RadioField('Gender', choices=gender_choices, validators=[DataRequired()])  





  # checking validations
  def validate_email(self, email):
    if email.data != current_user.email:
      user = User.query.filter_by(email=email.data).first()
      if user :
        flash("Email is taken !!", "danger")
        raise ValidationError("Email is Taken !!")