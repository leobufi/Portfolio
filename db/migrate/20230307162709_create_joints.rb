class CreateJoints < ActiveRecord::Migration[6.1]
  def change
    create_table :joints do |t|
      t.references :project, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
