class RequestItem < ApplicationRecord
  belongs_to :request, optional: true
  belongs_to :item, optional: true

  validates :request_id, presence: true
  validates :item_id, presence: false
  validates :max_price, presence: true
  validates :quantity_description, presence: true
end
