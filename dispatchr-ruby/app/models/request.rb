class Request < ApplicationRecord
  belongs_to :user, optional: true
  has_many :request_items

  validates :user_id, presence: true
  validates :expiration_date, presence: true
  validates :request_items, presence: true
end
