json.extract! payment, :id, :user_id, :customer, :funding_source, :routing_number, :account_number, :type, :account_name, :created_at, :updated_at
json.url payment_url(payment, format: :json)