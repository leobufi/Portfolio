class Project < ApplicationRecord
  has_many :joints, dependent: :destroy
  has_many :tags, through: :joints

  validates :name, presence: true
  validates :year, presence: true

  TAG = Tag.all
end
