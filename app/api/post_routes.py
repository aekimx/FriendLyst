from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, db, Friend, Like
from app.forms import PostForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename
from sqlalchemy.orm import load_only



post_routes = Blueprint('posts', __name__)

# GET POSTS IN FEED
@post_routes.route('/<int:userId>/posts', methods=['GET'])
# @login_required
def get_all_posts(userId):
    ''' Query for all posts and return in a list of dictionaries '''


    friends = Friend.query.options(load_only(Friend.friend_id)).filter(Friend.user_id == userId).filter(Friend.status=='Accepted').all()
    friendsList = [friend.to_dict_no_self() for friend in friends]
    friendIds = [friend['friendId'] for friend in friendsList]
    friendIds.append(userId)

    all_posts = Post.query.filter(Post.user_id.in_(friendIds)).all()

    return [post.to_dict() for post in all_posts]

# GET POST BY ID
@post_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_post_by_id(id):
    ''' Query for a post by ID and return as a dictionary'''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    return post.to_dict()


# GET POSTS BY ONE USER
@post_routes.route("/<int:userId>/posts/current", methods=["GET"])
@login_required
def get_users_posts(userId):
    ''' Query for posts created by user ID and return in a list of dictionaries '''

    user_posts = Post.query.filter(Post.user_id == userId).all()

    if user_posts is None:
        return jsonify({'error': 'Posts not found'}), 404

    return [post.to_dict() for post in user_posts]


# CREATE NEW POST
@post_routes.route('', methods=['POST'])
@login_required
def create_post():
    ''' Create a new post and return the newly created post as a dictionary '''
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if len(form.data["caption"]) > 2000:
        return jsonify({"errors": "Messages must be less than 2000 characters"}), 400

    if form.data['photo'] is None and form.validate_on_submit():
        new_post = Post(
            caption= form.data['caption'],
            photo=  '',
            user_id= form.data['user_id']
         )

        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    else:
        photo = form.data['photo']
        photo.filename = get_unique_filename(photo.filename)
        upload = upload_file_to_s3(photo)


        if "url" not in upload:
            return jsonify({"errors": "An error occurred when uploading"}), 400

        if form.validate_on_submit():
            new_post = Post(
                caption= form.data['caption'],
                photo=  upload['url'],
                user_id= form.data['user_id']
            )

            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict()

        return jsonify({'error': "form did not validate on submit"})


# UPDATE POST
@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_post(id):
    ''' Query for a post by ID and update it if post exists. Returned as a dictionary.'''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    data = request.get_json()

    if len(data["caption"]) > 2000:
        return jsonify({"errors": 'Messages must be less than 2000 characters'}), 400

    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():
        post.caption = data['caption'] or post.caption
        db.session.commit()
        return jsonify(post.to_dict()), 200

    return jsonify({"error": "form did not validate on submit"})

# DELETE POST
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    ''' Query for a post by ID and delete it if post exists. Return a successful message '''
    post = Post.query.get(id)
    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({'Success': 'Post successfully deleted'})

# LIKE POST
@post_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def like_post(id):
    ''' Query for a post by ID and like it if post exists. Return a successful message '''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    data = request.get_json()

    new_like = Like( user_id= data['userId'], post_id = data['postId'] )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

# UNLIKE POST
@post_routes.route('/like/<int:id>', methods=['DELETE'])
@login_required
def unlike_post(id):
    ''' Query for a like by ID and delete if like exists. Return a successful message '''
    like = Like.query.get(id)

    if like is None:
        return jsonify({'error': 'Like not found'}), 404

    db.session.delete(like)
    db.session.commit()
    return like.to_dict()
