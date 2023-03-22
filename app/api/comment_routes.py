from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('', methods=['GET'])
# @login_required
def get_all_comments():
    ''' Query for all comments and return in a list of dictionaries '''
    all_comments = Comment.query.all()
    return [comment.to_dict() for comment in all_comments]


@comment_routes.route('/<int:id>', methods=["GET"])
# @login_required
def get_commment_by_id(id):
    ''' Query for a comment by ID and return as a dictionary'''
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    return comment.to_dict()


@comment_routes.route('', methods=['POST'])
# @login_required
def create_comment():
    ''' Create a new comment and return the newly created comment as a dictionary '''
    data = request.get_json()
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if len(data["comment"]) > 2000:
        return jsonify({"errors": "Comments must be less than 2000 characters"}), 400

    if form.validate_on_submit():
        new_comment = Comment(
            comment= data['comment'],
            user_id= data['user_id'],
            post_id= data['post_id']
         )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()



@comment_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_comment(id):
    ''' Query for a Comment by ID and update it if post exists. Returned as a dictionary.'''
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    data = request.get_json()

    if len(data["comment"]) > 2000:
        return jsonify({"errors": 'Messages must be less than 2000 characters'}), 400

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if comment and form.validate_on_submit():
        comment.comment = data['comment'] or comment.comment
        db.session.commit()
        return jsonify(comment.to_dict()), 200



@comment_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_comment(id):
    ''' Query for a comment by ID and delete it if comment exists. Return a successful message '''
    comment = Comment.query.get(id)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'Success': 'Comment successfully deleted'})
