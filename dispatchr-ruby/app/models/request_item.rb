class RequestItem < ApplicationRecord
  belongs_to :request, optional: true
  belongs_to :item, optional: true


  #item_id not required. new item created upon each new request_item
  validates :request_id, presence: true
  validates :max_price, presence: true
  validates :quantity_description, presence: true

end
