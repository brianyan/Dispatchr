class User < ApplicationRecord
  has_many :requests
  belongs_to :address

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true
  validates :username, presence: true
  validates :address, presence: true

  def self.calculate_reputation(rep, numRevs, score)
  	newRep = ((rep * numRevs) + score)/(numRevs+1)
  	newRep
  end
end
