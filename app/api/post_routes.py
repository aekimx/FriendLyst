from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, db
from app.forms import PostForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

post_routes = Blueprint('posts', __name__)

@post_routes.route('', methods=['GET'])
# @login_required
def get_all_posts():
    ''' Query for all posts and return in a list of dictionaries '''
    all_posts = Post.query.all()
    return [post.to_dict() for post in all_posts]


@post_routes.route('/<int:id>', methods=["GET"])
# @login_required
def get_post_by_id(id):
    ''' Query for a post by ID and return '''
    post = Post.query.get(id)

    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    return post.to_dict()


@post_routes.route('', methods=['POST'])
# @login_required
def create_post():
    ''' Create a new post and return the newly created post as a dictionary '''
    data = request.get_json()
    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]


    if len(data["caption"]) > 2000:
        return jsonify({"errors": "Messages must be less than 2000 characters"}), 400


    if form.validate_on_submit():
        #AWS to get the file, assign a unique filename, upload to s3 bucket.
        photo = data['photo']
        photo.filename = get_unique_filename(photo.filename)
        upload = upload_file_to_s3(photo)

        if "url" not in upload:
            return jsonify({"errors": "Unique filename was not created for upload"})

        new_post = Post(
            caption= data['caption'],
            photo= upload['url'],           # Note the upload here!
            user_id= data['user_id']
         )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()



@post_routes.route('/<int:id>', methods=["PUT"])
# @login_required
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

    if post and form.validate_on_submit():
        post.caption = data['caption'] or post.caption
        post.photo = data['photo'] or post.photo
        db.session.commit()
        return jsonify(post.to_dict()), 200






@post_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_post(id):
    ''' Query for a post by ID and delete it if post exists. Return a successful message '''
    post = Post.query.get(id)
    if post is None:
        return jsonify({'error': 'Post not found'}), 404

    db.session.delete(post)
    db.session.commit()
    return jsonify({'Success': 'Post successfully deleted'})
