class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user, :expiration_date
  has_many :request_items
end
