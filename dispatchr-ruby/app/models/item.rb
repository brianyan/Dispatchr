class Item < ApplicationRecord
  belongs_to :request_item
  has_many :stores, through: :item_store
end
