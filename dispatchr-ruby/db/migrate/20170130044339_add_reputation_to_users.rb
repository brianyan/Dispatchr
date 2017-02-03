class AddReputationToUsers < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :reputation, :decimal, default: 0.0
  	add_column :users, :numReviews, :integer, default: 0
  end
end
