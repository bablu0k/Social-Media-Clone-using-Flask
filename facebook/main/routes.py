from flask import Blueprint, render_template, url_for, request, flash, redirect, jsonify
from flask_login import login_required, current_user
from facebook.main.forms import UpdateForm
import secrets, os
from facebook import db
from flask import current_app
from facebook.models import Post, Comment, User, LikeTable
from facebook.posts.forms import CommentForm


main = Blueprint('main', __name__)





@main.context_processor
def image():
  if current_user.is_authenticated:
    image = url_for('static', filename='images/profile_pics/' + current_user.profile)
    return {"image": image}


def save_picture(form_picture):
  random_hex = secrets.token_hex(8)
  _, extention = os.path.splitext(form_picture.filename)
  picture_fn = random_hex + extention
  picture_path = os.path.join(current_app.root_path, 'static/images/profile_pics', picture_fn)
  form_picture.save(picture_path)
  return picture_fn


@main.route('/home')
@login_required
def home():
  
  return render_template('main/home.html', title='LifeNarratives - Home')





@main.route('/messenger')
@login_required
def messenger():
  return render_template('main/messenger.html', title='LifeNarratives - Messenger')



@main.route('/account', methods=["GET", "POST"])
@login_required
def account():
  form = UpdateForm()

  if form.validate_on_submit():
    if form.profile.data :
      picture_file = save_picture(form.profile.data)
      current_user.profile = picture_file
    current_user.firstname = form.firstname.data
    current_user.lastname = form.lastname.data
    current_user.email = form.email.data
    current_user.gender = form.gender.data
    try:
      db.session.commit()
      flash("Updation Success", "success")
      return redirect(url_for('main.account'))
    except:
      flash("Updation Failed", "danger")
  elif request.method == 'GET':
    form.firstname.data = current_user.firstname
    form.lastname.data = current_user.lastname
    form.email.data = current_user.email
    form.gender.data = current_user.gender

  return render_template('main/account.html', title="Account", form=form)