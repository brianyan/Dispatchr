class AddressSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude
end
