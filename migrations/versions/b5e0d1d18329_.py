"""empty message

Revision ID: b5e0d1d18329
Revises: 9f27e761bcca
Create Date: 2026-07-28 23:53:33.504216

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5e0d1d18329'
down_revision = '9f27e761bcca'
branch_labels = None
depends_on = None


def upgrade():
    # Relación: quest.user_id -> user.id
    with op.batch_alter_table("quest", schema=None) as batch_op:
        batch_op.create_foreign_key(
            "quest_user_id_fkey",
            "user",
            ["user_id"],
            ["id"]
        )

    # Primero se crea username permitiendo NULL
    with op.batch_alter_table("user", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "username",
                sa.String(length=20),
                nullable=True
            )
        )

    # Se asigna un username a los usuarios que ya existían
    op.execute(
        """
        UPDATE "user"
        SET username = 'user_' || id
        WHERE username IS NULL
        """
    )

    # Después se hace obligatorio y único
    with op.batch_alter_table("user", schema=None) as batch_op:
        batch_op.alter_column(
            "username",
            existing_type=sa.String(length=20),
            nullable=False
        )

        batch_op.create_unique_constraint(
            "user_username_key",
            ["username"]
        )


def downgrade():
    with op.batch_alter_table("user", schema=None) as batch_op:
        batch_op.drop_constraint(
            "user_username_key",
            type_="unique"
        )

        batch_op.drop_column("username")

    with op.batch_alter_table("quest", schema=None) as batch_op:
        batch_op.drop_constraint(
            "quest_user_id_fkey",
            type_="foreignkey"
        )
    # ### end Alembic commands ###
