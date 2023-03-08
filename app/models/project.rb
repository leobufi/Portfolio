class Project < ApplicationRecord
  has_many :joints, dependent: :destroy
  has_many :tags, through: :joints
  has_many_attached :photos

  validates :name, presence: true
  validates :year, presence: true

  TAG = Tag.all
end
