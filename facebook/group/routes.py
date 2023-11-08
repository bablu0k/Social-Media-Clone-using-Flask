from flask import Blueprint
from flask import render_template, request, redirect, url_for, flash

group = Blueprint('group', __name__)


@group.route('/groups')
def groups():
  return render_template("group/groups.html", title="Groups")