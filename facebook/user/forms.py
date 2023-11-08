from flask_wtf import FlaskForm
from wtforms import (StringField, DateField, RadioField, PasswordField, SubmitField,
                     EmailField, ValidationError)
from wtforms.validators import DataRequired, Length, EqualTo
from facebook.models import User
from flask import flash


# ========================= REGISTRATION FORM =====================================

class RegistrationForm(FlaskForm):
  firstname = StringField('First Name', validators=[DataRequired()])
  lastname = StringField('Last Name', validators=[DataRequired()])
  email = EmailField('Email', validators=[DataRequired()])
  password = PasswordField('Password', validators=[DataRequired(), Length(min=8)])
  confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), Length(min=8), 
                                                                   EqualTo('password',message='Passwords Donot Match')])

  submit = SubmitField('SignUp')


  gender_choices = [('male', 'Male'), ('female', 'Female')]
  gender = RadioField('Gender', choices=gender_choices, validators=[DataRequired()])  





  # checking validations
  def validate_email(self, email):
    user = User.query.filter_by(email=email.data).first()
    if user :
      flash("Email is taken !!", "danger")
      raise ValidationError("Email is Taken !!")









# =============================== Login Form ================================

class LoginForm(FlaskForm):
  email = EmailField('Email', validators=[DataRequired()])
  password = PasswordField('Password', validators=[DataRequired()])
  submit = SubmitField('Login')






# =============================== UPDATE FORM ===============================================

# class UpdateForm(FlaskForm):
#   firstname = StringField('First Name', validators=[DataRequired()])
#   lastname = StringField('Last Name', validators=[DataRequired()])
#   email = EmailField('Email', validators=[DataRequired()])
#   password = PasswordField('Password', validators=[DataRequired(), Length(min=8)])
#   confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), Length(min=8), 
#                                                                    EqualTo('password',message='Passwords Donot Match')])

#   submit = SubmitField('SignUp')


#   gender_choices = [('male', 'Male'), ('female', 'Female')]
#   gender = RadioField('Gender', choices=gender_choices, validators=[DataRequired()])  
  