class RequestItem < ApplicationRecord
  belongs_to :request, optional: true
  has_one :item
end
