class Item < ApplicationRecord
  belongs_to :request_item, optional: true
  has_many :stores, through: :item_store
end
