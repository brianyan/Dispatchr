class User < ApplicationRecord
  has_many :requests
  belongs_to :address
end
