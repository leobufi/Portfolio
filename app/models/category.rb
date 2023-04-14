class Category < ApplicationRecord
    has_many :joint_categories, dependent: :destroy
    has_many :tags, through: :joint_categories
    validates :name, presence: true
end
