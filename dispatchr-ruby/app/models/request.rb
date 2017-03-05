require 'haversine.rb'

class Request < ApplicationRecord
  belongs_to :user, optional: true
  has_many :request_items

  validates :user_id, presence: true
  validates :expiration_date, presence: true
  validates :request_items, presence: true

  def self.find_nearest_requests(lat, long)
  	puts "input lat and long are #{lat}, #{long}"
  	nearest_reqs = []
  	distance = 0.50
  	Request.where(status: 0).each do |request|
  		hav_dist = Haversine.distance(lat, long, request.user.address.latitude, request.user.address.longitude).to_miles
  		puts "checking request by #{request.user.name} with #{request.user.address.latitude}, #{request.user.address.longitude}"
  		puts "hav_dist is #{hav_dist} miles"
  		if (hav_dist <= distance)
  			nearest_reqs.push(request)
  		end
  	end
  	return nearest_reqs
  end


end
