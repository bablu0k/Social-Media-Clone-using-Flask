from flask_restful import Resource, marshal_with, fields
from facebook.models import Comment, LikeTable
from flask_login import current_user
from facebook import db
from flask import jsonify, request





class GetCommentResources(Resource):


  def get(self, page, post_id):
    try:
      comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.time_posted.desc()).paginate(page=page, per_page=5)
      comments_data = []
      for comment in comments.items:
        comments_data.append({
        "comment": comment.comment,
        "time_posted": comment.time_posted.strftime('%Y-%m-%d'),
        "user": comment.user.firstname,
        "post_id": comment.post_id,
        "image": comment.user.profile
      })
      return comments_data, 200
    except:
      response = {"status": "No posts Left"}
      return response, 400
  
  

class PostCommentResources(Resource):
  def post(self):

    print(request.get_json())
    data = request.get_json()
    comment = Comment(comment=data['comment'], post_id=data['post_id'], user=current_user)
    db.session.add(comment)
    db.session.commit()
    comment_data = {
      "comment": comment.comment,
      "time_posted": comment.time_posted.strftime('%Y-%m-%d'),
      "user": comment.user.firstname,
      "post_id": comment.post_id,
      "image": comment.user.profile
    }
    return comment_data, 200
  

class LikeResources(Resource):

  def post(self, post_id):

    like_obj = LikeTable.query.filter_by(post_id=post_id).filter_by(user=current_user).first()
    if like_obj:
      like_obj.like = not like_obj.like
      db.session.commit()
      return {"result": str(like_obj.like)}, 200
    else:
      like = LikeTable(like=True, post_id=post_id, user=current_user)
      db.session.add(like)
      db.session.commit()
      return {"result": "True"}

    
 