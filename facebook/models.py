from facebook import db, login_manager
from datetime import datetime
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
  return User.query.get(int(user_id))


class User(db.Model, UserMixin):
  id = db.Column(db.Integer, primary_key=True)
  firstname = db.Column(db.String(20), nullable=False)
  lastname = db.Column(db.String(20), nullable=False)  
  email = db.Column(db.String(40), nullable=False, unique=True)
  password = db.Column(db.String(256), nullable=False)
  gender = db.Column(db.String(20), nullable=False)
  date_joined = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
  profile = db.Column(db.String(60), nullable=False)
  
  posts = db.relationship("Post", backref='author', lazy=True)
  comments = db.relationship("Comment", backref='user', lazy=True)
  likes = db.relationship("LikeTable", backref='user', lazy=True)



  # representation magic function 
  def __repr__(self):
    return f'{self.firstname} and {self.gender} and {self.password}'

class Post(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(60), nullable=False)
  content = db.Column(db.Text, nullable=False)
  image = db.Column(db.String(60))
  date_posted = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

  comments = db.relationship("Comment", backref="post", lazy=True)
  likes = db.relationship("LikeTable", backref="post", lazy=True)


  def __repr__(self):
    return f'{self.title} and the content is {self.content} posted on {self.date_posted}'


class Comment(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String(150), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  time_posted = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

  def __repr__(self):
    return f'{self.user.firstname} posted comment = {self.comment} on the post with title {self.post.title}'


class LikeTable(db.Model):

  id = db.Column(db.Integer, primary_key=True)
  like = db.Column(db.Boolean, default=False)
  post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


  def __repr__(self):
    return f'{self.user.firstname} liked the post with title {self.post.title}'
  

  
  


  