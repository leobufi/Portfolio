class JointCategory < ApplicationRecord
  belongs_to :category
  belongs_to :tag
end
