class AddColumnToTags2 < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :category, :string
  end
end
