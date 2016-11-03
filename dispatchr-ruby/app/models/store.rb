class Store < ApplicationRecord
  has_many :items, through: :item_store
  has_one :address
end
