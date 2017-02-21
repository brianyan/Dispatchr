class RegistrationsController < ApplicationController
  # /sign_up
  def create
    if User.find_by(email: params[:email]).present?
      render status: :bad_request, json: {error: "User already exists"} and return
    end
    address = Address.new(
        address: params[:address][:address],
        latitude: params[:address][:latitude],
        longitude: params[:address][:longitude]
    )

    @user = User.create(
        name: params[:name],
        username: params[:username],
        email: params[:email],
        password: params[:password],
        address: address
    )
    if @user
      # token = Authentication::JsonWebToken.encode(@user.id)

      # customer_url = Payment.create_dwolla_customer(@user)
      # funding_url = Payment.link_funding_source(customer_url)

      render json: { user: @user, auth_token: token }
    else
      render json: @user.errors, status: :bad_request
    end
  end
end
