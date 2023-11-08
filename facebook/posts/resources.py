from flask import request
from flask_restful import Resource, Api
from facebook.models import Post, LikeTable, Comment
from flask_login import current_user


class PostResources(Resource):
  
  def get(self, page):

    try:
      posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=10)
      like_count, comment_count = [], []
      post_data = []

      
  
      for post in posts.items:
        liked =  LikeTable.query.filter_by(post_id=post.id, user_id=current_user.id).first()
        if liked:
          is_liked = str(liked.like)
        else:
          is_liked = "False"
        post_data.append({
          "post_id": post.id,
          "profile": post.author.profile,
          "firstname": post.author.firstname,
          "date_posted": post.date_posted.strftime('%Y-%m-%d'),
          "current_user_id": current_user.id,
          "current_user_profile": current_user.profile,
          "post_author_id": post.author.id,
          "post_title": post.title,
          "post_content": post.content,
          "post_image": post.image,
          "post_folder": post.author.email,
          "like_count": LikeTable.query.filter_by(post_id=post.id).count(),
          "comment_count": Comment.query.filter_by(post_id=post.id).count(),
          "is_liked": is_liked          
        })
      print(post_data[0])
      return post_data, 200

    except:
      return {"result": "No posts found"}, 400
  