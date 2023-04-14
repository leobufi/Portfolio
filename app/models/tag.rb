class Tag < ApplicationRecord
    has_many :joints, dependent: :destroy
    has_many :projects, through: :joints
    has_many :joint_categories, dependent: :destroy
    has_many :categories, through: :joint_categories

    validates :name, presence: true
    validates :rate, inclusion: 1..10

    CATEGORY = Category.all

end
