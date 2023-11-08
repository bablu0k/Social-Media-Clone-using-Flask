from flask import Blueprint
from flask import render_template, redirect, url_for, flash
from facebook.user.forms import RegistrationForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from facebook.models import User
from facebook import db
from flask_login import current_user, login_user, logout_user, login_required



user = Blueprint('user', __name__)




@user.route('/login', methods=["POST", "GET"])
@user.route('/', methods=["POST", "GET"])
def login():
  form = LoginForm()
  if current_user.is_authenticated:
    return redirect(url_for('main.home'))
  if form.validate_on_submit():
    user = User.query.filter_by(email=form.email.data).first()
    if user and check_password_hash(user.password, form.password.data) :
      login_user(user)
      return redirect(url_for('main.home'))
    else:
      flash("Wrong Credentials", "danger")
      return redirect(url_for('user.login'))
  return render_template('user/login.html', title='Welcome', form=form)


@user.route("/logout")
def logout():
  logout_user()
  return redirect(url_for('user.login'))



@user.route('/register', methods=["POST", "GET"])
def register():
  form = RegistrationForm()
  if form.validate_on_submit():
    firstname = form.firstname.data
    lastname = form.lastname.data
    password = generate_password_hash(form.password.data,  method='pbkdf2:sha256')
    email = form.email.data
    gender = form.gender.data
    if gender == 'male':
      profile = 'male.jpg'
    else:
      profile = 'female.jpg'
    
    user = User(firstname=firstname, lastname=lastname, password=password, gender=gender, profile=profile, email=email)

    try:
      db.session.add(user)
      db.session.commit()
      flash("Account Created Successfully", 'success')
      return redirect(url_for('user.login'))
    except:
      flash("An Error occured while creating an account", "danger")
      return redirect(url_for('user.register'))
      
  return render_template("user/register.html", form=form)







