class CreateJointCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :joint_categories do |t|
      t.references :category, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
