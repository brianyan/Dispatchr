class Request < ApplicationRecord
  belongs_to :user, optional: true
  has_many :request_items
end
