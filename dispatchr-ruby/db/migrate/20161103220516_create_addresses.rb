class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.string :address
      t.belongs_to :user, index: true
      t.belongs_to :store, index: true
      t.decimal :latitude
      t.decimal :longitude
      t.timestamps
    end
  end
end
