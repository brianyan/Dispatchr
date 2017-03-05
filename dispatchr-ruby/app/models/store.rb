require 'haversine.rb'

class Store < ApplicationRecord
  has_many :items, through: :item_stores
  belongs_to :address

  validates :address_id, presence: true
  validates :name, presence: true

  def self.find_nearest_store(lat, long)

  	store_id = -1
  	distance = 150 #150 meters within a store
  	Store.all.each do |store|
  		hav_dist = Haversine.distance(lat, long, store.address.latitude, store.address.longitude).to_meters
  		if (hav_dist <= distance)
  			distance = hav_dist
  			store_id = store.id
  			puts("#{store.name} is #{hav_dist} away from you!")
  		end
  		
  	end
  	if (store_id != -1)
  		puts "You are near store #{store_id}"
  	end
  	return store_id

  end

end
