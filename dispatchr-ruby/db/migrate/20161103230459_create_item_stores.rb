class CreateItemStores < ActiveRecord::Migration[5.0]
  def change
    create_table :item_stores do |t|
      t.belongs_to :item, index: true
      t.belongs_to :store, index: true
      t.timestamps
    end
  end
end
