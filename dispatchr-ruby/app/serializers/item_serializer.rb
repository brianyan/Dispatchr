class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :request_items
end
