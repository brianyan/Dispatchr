class Payment < ApplicationRecord
	include TokenConcern
	belongs_to :user, optional: true

	validates :user_id, presence: true

	def account_token
    	@account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
    	#usage: account_token.get "customers"
  	end

  	def app_token
    	@app_token ||= TokenData.fresh_token_by! account_id: nil
  	end

	# create an unverified dwolla customer
	def self.create_dwolla_customer(user)
		names = user.name.split()
		request_body = {
  			:firstName => "#{names[0]}",
  			:lastName => "#{names[1]}",
  			:email => "#{user.email}"
		}

		account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
		customer = account_token.post "customers", request_body
		customer.headers[:location]
	end

	#link funding source
	def self.link_funding_source(customer_url)
		puts customer_url
		request_body = {
  			:routingNumber => "222222226",
  			:accountNumber => "123456789",
  			:type => "checking",
  			:name => "Test Account"
		}

		account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
		funding_source = account_token.post	"#{customer_url}/funding-sources", request_body
		puts funding_source.headers[:location]
		funding_source.headers[:location]

	end

	#verify account


end
