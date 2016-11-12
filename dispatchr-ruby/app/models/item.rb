class Item < ApplicationRecord
  has_many :stores, through: :item_stores
end
