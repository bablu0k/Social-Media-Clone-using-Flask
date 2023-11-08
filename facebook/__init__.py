from flask import Flask
from facebook.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login  import LoginManager
from flask_ckeditor import CKEditor
from flask_restful import Api



api = Api()
db = SQLAlchemy()
migrate = Migrate()
ckeditor = CKEditor()
login_manager = LoginManager()
login_manager.login_view = 'users.login'


def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)


  # initializations
  api.__init__(app)
  db.__init__(app)
  migrate.__init__(app, db)
  login_manager.__init__(app)
  ckeditor.__init__(app)




  # importing RESOURCES
  from facebook.main.resources import GetCommentResources, PostCommentResources, LikeResources
  from facebook.posts.resources import PostResources

  # registering RESOURCES
  api.add_resource(PostCommentResources, "/home/post/comment")
  api.add_resource(GetCommentResources, "/home/get/comments/<int:post_id>/<int:page>")
  api.add_resource(LikeResources, "/home/post/like/<int:post_id>")
  api.add_resource(PostResources, "/home/posts/<int:page>")
  

  # importing BLUEPRINTS
  from facebook.user.routes import user
  from facebook.main.routes import main
  from facebook.posts.routes import post
  from facebook.group.routes import group

  # registering BLUEPRINTS
  app.register_blueprint(user)
  app.register_blueprint(main)
  app.register_blueprint(post)
  app.register_blueprint(group)











  return app