class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :reputation, :numReviews, :address
end
