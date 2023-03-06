class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.date :year
      t.string :photos

      t.timestamps
    end
  end
end
