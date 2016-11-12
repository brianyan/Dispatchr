class CreateStores < ActiveRecord::Migration[5.0]
  def change
    create_table :stores do |t|
      t.string :name
      t.belongs_to :address, index: true
      t.timestamps
    end
  end
end
