class Request < ApplicationRecord
  def to_param
  	user_id
  end

  belongs_to :user, optional: true
  has_many :request_items

  validates :user_id, presence: true
  validates :expiration_date, presence: true
  
end
