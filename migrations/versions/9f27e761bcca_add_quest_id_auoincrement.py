"""add quest id auoincrement

Revision ID: 9f27e761bcca
Revises: b83f36d015d0
Create Date: 2026-07-25 14:54:11.343258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f27e761bcca'
down_revision = 'b83f36d015d0'
branch_labels = None
depends_on = None


def upgrade():
    op.execute(
        "CREATE SEQUECE IF NOT EXISTS quest_id_seq"
        "OWNED BY quest.id"
    )

    op.execute(
        "ALTER TABLE quest"
        "ALTER COLUM id"
        "SET DEFAULT nextval('quest_id_seq')"
    )

    op.execute(
        """
        SELECT setval(
            'quest_id_seq',
            COALESCE((SELECT MAX(id) FROM quest), 0) + 1,
            false
        )
        """
    )


def dowgrade():
    op.execute(
        "ALTER TABLE quest"
        "ALTER COLUM id DROP DEFAULT"
    )

    op.execute(
        "DROP SEQUENCE IF EXISTS quest_id_seq"
    )
