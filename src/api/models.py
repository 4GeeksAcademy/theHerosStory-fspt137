from datetime import datetime, timezone, date
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, DateTime, Date
from sqlalchemy import String, Boolean, ForeignKey, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # Relación para acceder a los chats del usuario
    chats: Mapped[list["Chat"]] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    # Relacion de user con quest
    quests: Mapped[list["Quest"]] = relationship(back_populates="user")

    # Relacion de user con habits
    habits: Mapped[list["Habit"]] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
        }


class Mentor(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    mentorname: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(250), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # Relación para acceder a los chats del mentor
    chats: Mapped[list["Chat"]] = relationship(
        back_populates="mentor", cascade="all, delete-orphan")

    # Relacion de Services con mentor
    services: Mapped[list["Service"]] = relationship(back_populates="mentor")

    def serialize(self):
        return {
            "id": self.id,
            "mentorname": self.mentorname,
            "email": self.email,
            "is_active": self.is_active,
        }


class Quest(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(
        String(30), nullable=False, default="pending")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="quests")

    # Relacion de quest con questTracking
    trackings: Mapped[list["QuestTracking"]] = relationship(
        back_populates="quest", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "user_id": self.user_id,
            "trackings": [
                tracking.serialize()
                for tracking in self.trackings
            ]
        }


class Habit(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(
        String(30), nullable=False, default="pending")

    user: Mapped["User"] = relationship(back_populates="habits")
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "user_id": self.user_id,
        }


class Chat(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    mentor_id: Mapped[int] = mapped_column(
        ForeignKey('mentor.id'), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    user: Mapped["User"] = relationship(back_populates="chats")
    mentor: Mapped["Mentor"] = relationship(back_populates="chats")
    messages: Mapped[list["ChatMessage"]] = relationship(
        back_populates="chat", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "mentor_id": self.mentor_id,
            "created_at": self.created_at.isoformat(),
        }


class ChatMessage(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    chat_id: Mapped[int] = mapped_column(ForeignKey('chat.id'), nullable=False)

    sender: Mapped[str] = mapped_column(
        String(20), nullable=False)  # "user" o "mentor"
    content: Mapped[str] = mapped_column(String(500), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    chat: Mapped["Chat"] = relationship(back_populates="messages")

    def serialize(self):
        return {
            "id": self.id,
            "chat_id": self.chat_id,
            "sender": self.sender,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
        }


class QuestTracking(db.Model):
    __tablename__ = "quest_tracking"
    id: Mapped[int] = mapped_column(primary_key=True)
    quest_id: Mapped[int] = mapped_column(
        ForeignKey("quest.id"), nullable=False)
    date: Mapped[str] = mapped_column(Date, nullable=False)
    comment: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)

    quest: Mapped["Quest"] = relationship(back_populates="trackings")

    def serialize(self):
        return {
            "id": self.id,
            "quest_id": self.quest_id,
            "date": self.date.isoformat() if self.date else None,
            "comment": self.comment,
            "status": self.status
        }


class Administrator(db.Model):
    __tablename__ = "admin"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(
        String(250), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }


def __str__(self):
    return f"{self.name} - {self.email}"


class Service(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    is_reserved: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    mentor_id: Mapped[int] = mapped_column(
        ForeignKey("mentor.id"), nullable=True)
    mentor: Mapped["Mentor"] = relationship(back_populates="services")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "mentor_id": self.mentor_id,
            "price": self.price,
            "is_reserved": self.is_reserved
        }
