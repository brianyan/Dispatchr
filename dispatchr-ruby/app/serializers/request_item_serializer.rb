class RequestItemSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :item, :max_price, :quantity_description

  belongs_to :item
end
