require 'haversine'

class Store < ApplicationRecord
  has_many :items, through: :item_stores
  belongs_to :address

  def self.find_nearest_store(lat, long)

  	store_id = -1
  	distance = .0310686 #50 meters within a store
  	Store.all.each do |store|
  		hav_dist = Haversine.distance(lat, long, store.address.latitude, store.address.longitude)
  		if (hav_dist <= distance)
  			distance = hav_dist
  			store_id = store.id
  		end
  		puts("#{store.name} is #{hav_dist} away from you!")
  	end

  	return store_id

  end

end
