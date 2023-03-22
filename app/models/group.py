from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    group_pic = db.Column(db.String(2000), nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    group_posts = db.relationship("GroupPost", back_populates='groups', lazy=True, cascade='all, delete')
    members = db.relationship('User', back_populates='groups', lazy=True)
    group_members = db.relationship('GroupMember', back_populates='group', lazy=True, cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'groupPic': self.group_pic,
            'adminId': self.admin_id,
            'posts': [post.to_dict_no_members() for post in self.group_posts],
            'members': [member.to_dict() for member in self.members]
        }

    def to_dict_no_members(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'groupPic': self.group_pic,
            'adminId': self.admin_id,
        }
