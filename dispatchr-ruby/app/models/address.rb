class Address < ApplicationRecord
  has_many :users
  has_many :stores

  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
end
