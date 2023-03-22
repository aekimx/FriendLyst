from .db import db, environment, SCHEMA, add_prefix_for_prod

class GroupMember(db.Model):
    __tablename__ = 'group_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationship Attributes
    user = db.relationship("User", back_populates='group_member', lazy=True)
    group = db.relationship("Group", back_populates='', lazy=True, cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
            'group': self.group.to_dict_no_members(),
            'members': [user.to_dict_no_post() for user in self.users()]
        }
