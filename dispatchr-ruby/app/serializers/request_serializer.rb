class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :expiration_date
end
