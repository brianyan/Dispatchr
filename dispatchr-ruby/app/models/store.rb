class Store < ApplicationRecord
  has_many :items, through: :item_stores
  belongs_to :address
end
