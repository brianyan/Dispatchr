class User < ApplicationRecord
  has_many :requests
  belongs_to :address

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true
  validates :username, presence: true
  validates :address, presence: true
end
