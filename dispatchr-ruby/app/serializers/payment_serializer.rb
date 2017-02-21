class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :customer, :funding_source, :routing_number, :account_number, :type, :account_name
end
