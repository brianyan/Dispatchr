class Item < ApplicationRecord
  has_many :stores, through: :item_stores
  has_many :request_items
end
