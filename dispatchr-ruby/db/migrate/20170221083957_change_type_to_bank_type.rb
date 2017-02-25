class ChangeTypeToBankType < ActiveRecord::Migration[5.0]
  def change
  	rename_column :payments, :type, :account_type
  end
end
