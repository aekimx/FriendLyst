from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Group, GroupMember, Post, db
from app.forms import PostForm, GroupForm

group_routes = Blueprint('groups', __name__)


@group_routes.route('', methods=['GET'])
# @login_required
def get_all_groups():
    ''' Query for all groups and return in a list of dictionaries '''
    all_groups = Group.query.all()
    return [post.to_dict() for post in all_groups]


@group_routes.route('/<int:id>', methods=["GET"])
# @login_required
def get_group_by_id(id):
    ''' Query for a post by ID and return as a dictionary '''
    group = Group.query.get(id)

    if group is None:
        return jsonify({'error': 'Group not found'}), 404

    return group.to_dict()


@group_routes.route('', methods=['POST'])
# @login_required
def create_group():
    ''' Create a new group and return the newly created group as a dictionary '''
    data = request.get_json()
    form = GroupForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_group = Group(
            name= data['name'],
            description= data['description'],
            group_pic = data['group_pic'],
            admin_id= data['admin_id'],
         )
        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()

    return jsonify({"error": "An error occurred"})



@group_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_group(id):
    ''' Query for a group by ID and update it if group exists. Returned as a dictionary.'''
    group = Group.query.get(id)

    if group is None:
        return jsonify({'error': 'Group not found'}), 404

    data = request.get_json()

    form = GroupForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if group and form.validate_on_submit():
        group.name = data['name'] or group.name
        group.description = data['description'] or group.description
        group.group_pic = data['group_pic'] or group.group_pic
        db.session.commit()
        # need to create a new group member. but probably do this in the front end

        return jsonify(group.to_dict()), 200



@group_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_group(id):
    ''' Query for a group by ID and delete it if group exists. Return a successful message '''
    group = Group.query.get(id)
    if group is None:
        return jsonify({'error': 'Group not found'}), 404

    db.session.delete(group)
    db.session.commit()
    return jsonify({'Success': 'Group successfully deleted'})


@group_routes.route('/<int:id>/members/pending', methods=['GET'])
# @login_required
def get_pending_members(id):
    ''' Query for all pending group members'''
    all_members = GroupMember.query.filter(GroupMember.group_id == id).filter(GroupMember.status == 'Pending').all()

    if all_members is None:
        return jsonify({"error": "No members found "})

    return jsonify([member.to_dict_no_group() for member in all_members]), 200


@group_routes.route('/<int:id>/members', methods=['GET'])
# @login_required
def get_accepted_group_members(id):
    ''' Query for all accepted group members  '''
    all_members = GroupMember.query.filter(GroupMember.group_id == id).filter(GroupMember.status == 'Accepted').all()

    if all_members is None:
        return jsonify({"error": "No members found "})

    return jsonify([member.to_dict_no_group() for member in all_members]), 200



@group_routes.route('/<int:id>/members', methods=['POST'])
# @login_required
def create_group_member_request(id):
    ''' Create a group member '''
    data = request.get_json()

    group = Group.query.get(id)

    if group is not None:
        new_member = GroupMember(
            group_id=data['group_id'],
            member_id=data['member_id'],
            status= data['status']
            )
        return new_member.to_dict_no_group



@group_routes.route('/<int:id>/members/<int:id2>', methods=['PUT'])
# @login_required
def accept_group_member(id2):
    ''' Accept a group member and return as a dictionary '''
    data = request.get_json()

    group_member = GroupMember.query.get(id2)

    if group_member is None:
        return jsonify({'error': 'Group Member not found'}), 404

    group_member.status = data['status']
    db.session.commit()
    return group_member.to_dict_no_group

@group_routes.route('/<int:id>/posts', methods=['GET'])
# @login_required
def get_group_posts(id):
    ''' Get all posts for a group '''
    group_posts = Post.query.filter(Post.group_id == id).all()

    if group_posts is None:
        return jsonify({'error': 'Group posts not found'}), 404

    return jsonify([post.to_dict() for post in group_posts]), 200
