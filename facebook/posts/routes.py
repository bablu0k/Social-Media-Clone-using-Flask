from flask import Blueprint, render_template, url_for, redirect, flash, request
from flask_login import current_user, login_required
from facebook.posts.forms import PostForm, CommentForm
from facebook.models import Post, Comment
from facebook import db
import os, secrets
from flask import current_app, abort




post = Blueprint('post', __name__)
@post.context_processor
def image():
  if current_user.is_authenticated:
    image = url_for('static', filename='images/profile_pics/' + current_user.profile)
    return {"image": image}



def save_picture(form_picture, dir):
  token_hex = secrets.token_hex(8)
  _, extension = os.path.splitext(form_picture.filename)
  picture_fn = token_hex + extension
  picture_path = os.path.join(current_app.root_path, 'static', 'images', dir)

  if os.path.exists(picture_path):
      form_picture.save(os.path.join(picture_path, picture_fn))
  else:
      os.makedirs(picture_path)
      form_picture.save(os.path.join(picture_path, picture_fn))
  return picture_fn

def delete_and_save(form_picture, dir, filename):
  token_hex = secrets.token_hex(8)
  _, extension = os.path.splitext(form_picture.filename)
  picture_fn = token_hex + extension
  picture_path = os.path.join(current_app.root_path, 'static', 'images', dir, filename)

  if os.path.exists(picture_path):
    os.chmod(picture_path, 0o777)
    os.remove(picture_path)
    form_picture.save(os.path.join(current_app.root_path, 'static', 'images', dir, picture_fn))
  return picture_fn

def delete_image(imagename, dir):
  picture_path = os.path.join(current_app.root_path, 'static', 'images', dir, imagename)
  if os.path.exists(picture_path):
    os.chmod(picture_path, 0o777)
    os.remove(picture_path)






    




@post.route("/posts", methods=["POST", "GET"])
@login_required
def posts():
  form = PostForm()
  cform = CommentForm()
  posts = Post.query.filter_by(author=current_user)
  comments = Comment.query.all()

  if form.validate_on_submit():
    if form.image.data:
      picture_file = save_picture(form.image.data, current_user.email)
      post = Post(title=form.title.data, content=form.content.data, author=current_user, image=picture_file)
    else:
      post = Post(title=form.title.data, content=form.content.data, author=current_user)
    try:
      db.session.add(post)
      db.session.commit()
      flash('Post Added Successfully', "success")
      return redirect(url_for('post.posts'))
    except:
      flash("Failed to add post", "danger")
      return redirect(url_for('post.posts'))

    return redirect(url_for('main.home'))
  return render_template("post/posts.html", form=form, posts=posts, cform=cform, comments=comments)


@post.route("/posts/update/<int:id>", methods=["POST", "GET"])
@login_required
def update_post(id):
  post = Post.query.get_or_404(id)
  if post and post.author != current_user:
    abort(403)
  form = PostForm()
  if form.validate_on_submit():
    post.title = form.title.data
    post.content = form.content.data
    if form.image.data and post.image:
      picture_file = delete_and_save(form.image.data, current_user.email, post.image)
      post.image = picture_file
    elif form.image.data:
      picture_file = save_picture(form.image.data, current_user.email)
      post.image = picture_file
    
    db.session.commit()
    flash("Post Updated Successfully", "success")
    return redirect(url_for('post.update_post', id=post.id))
  elif request.method == "GET":
    form.title.data = post.title
    form.content.data = post.content


  return render_template("post/update.html", title="Update - Post", form=form)


@post.route("/posts/delete/<int:id>", methods=["POST", "GET"])
@login_required
def delete_post(id):
  post = Post.query.get_or_404(id)
  if post and post.author != current_user :
    abort(403)
  if post:
    if post.image:
      delete_image(post.image, post.author.email)
    db.session.delete(post)
    db.session.commit()
    flash("Post Deleted Successfully", "success")
    return redirect(url_for('main.home'))
  
  return render_template("main/home.html")

