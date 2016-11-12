class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.string :address
      t.decimal :latitude
      t.decimal :longitude
      t.timestamps
    end
  end
end
