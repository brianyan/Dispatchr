class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :payments do |t|
      t.integer :user_id
      t.string :customer
      t.string :funding_source
      t.string :routing_number
      t.string :account_number
      t.string :type
      t.string :account_name

      t.timestamps
    end
  end
end
