class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :expiration_date
  has_many :request_items
end
