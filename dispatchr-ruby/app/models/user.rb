class User < ApplicationRecord
  has_many :requests
  has_one :address
end
