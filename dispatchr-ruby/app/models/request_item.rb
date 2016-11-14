class RequestItem < ApplicationRecord
  belongs_to :request, optional: true
  belongs_to :item, optional: true
end
