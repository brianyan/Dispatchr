class Store < ApplicationRecord
  has_many :items, through: :item_stores
end
