class CreateRequestItems < ActiveRecord::Migration[5.0]
  def change
    create_table :request_items do |t|
      t.belongs_to :request
      t.decimal :max_price
      t.string :quantity_description
      t.timestamps
    end
  end
end
