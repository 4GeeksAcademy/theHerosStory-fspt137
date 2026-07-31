import os
import inspect
from flask_admin import Admin
from . import models
from .models import db, Quest
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme


class QuestAdmin(ModelView):
    column_list = (
        "id",
        "title",
        "description",
        "status",
        "user"
    )

    form_columns = (
        "title",
        "description",
        "status",
        "user"
    )


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    admin = Admin(app, name='4Geeks Admin',
                  theme=Bootstrap4Theme(swatch='cerulean'))

    # Dynamically add all models to the admin interface
    for name, obj in inspect.getmembers(models):
        # Verify that the object is a SQLAlchemy model before adding it to the admin.
        if (inspect.isclass(obj) and issubclass(obj, db.Model) and obj.__name__ != "Quest"
                ):
            admin.add_view(ModelView(obj, db.session))

    admin.add_view(
        QuestAdmin(
            Quest,
            db.session,
            name="Quest",
            endpoint="quests_admin"))
