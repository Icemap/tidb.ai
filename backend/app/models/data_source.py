from enum import Enum
from uuid import UUID
from typing import Optional

from sqlmodel import (
    Column,
    Field,
    JSON,
    Relationship as SQLRelationship,
)

from app.models.base import UpdatableBaseModel


class DataSourceType(str, Enum):
    FILE = "file"


class DataSource(UpdatableBaseModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=256)
    description: str = Field(max_length=512)
    data_source_type: str = Field(max_length=256)
    config: dict | list = Field(default={}, sa_column=Column(JSON))
    build_kg_index: bool = Field(default=False)
    user_id: UUID = Field(foreign_key="users.id", nullable=True)
    user: "User" = SQLRelationship(
        sa_relationship_kwargs={
            "lazy": "joined",
            "primaryjoin": "DataSource.user_id == User.id",
        },
    )

    __tablename__ = "data_sources"
