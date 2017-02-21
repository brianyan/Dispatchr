class Payment < ApplicationRecord
	include TokenConcern
	belongs_to :user

	validates :user_id, presence: true
	validates :routing_number, presence: true
	validates :account_number, presence: true
	validates :type, presence: true
	validates :account_name, presence: true

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
	def self.link_funding_source(payment)
		# puts customer_url
		customer_url = payment.customer

		request_body = {
  			:routingNumber => "#{payment.routing_number}",
  			:accountNumber => "#{payment.account_number}",
  			:type => "#{payment.type}",
  			:name => "#{payment.account_name}"
		}

		account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
		funding_source = account_token.post	"#{customer_url}/funding-sources", request_body
		# puts funding_source.headers[:location]
		funding_source.headers[:location]

	end

	#verify account and funding source via micro-deposits
	def self.verify_customer(funding_url)
		# "https://api-uat.dwolla.com/funding-sources/ef3c02ae-aef2-4285-a5a1-1dfddf9171a0"
		# puts funding_url
		account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
		verify = account_token.post "#{funding_url}/micro-deposits"

		request_body = {
    		:amount1 => {
        		:value => "0.03",
        		:currency => "USD"
    		},
    		:amount2 => {
        		:value => "0.09",
        		:currency => "USD"
    		}
		}
		verify = account_token.post "#{funding_url}/micro-deposits", request_body
	end




end
