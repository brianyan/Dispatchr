class RequestItem < ApplicationRecord
  belongs_to :request
  has_one :item
end
