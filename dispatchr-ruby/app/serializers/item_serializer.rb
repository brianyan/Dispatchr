class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :request_item
end
