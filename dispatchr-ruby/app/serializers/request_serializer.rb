class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user, :hero_id, :status, :expiration_date
  has_many :request_items
end
