class Tag < ApplicationRecord
    has_many :joints, dependent: :destroy
    has_many :projects, through: :joints

    validates :name, presence: true

end
