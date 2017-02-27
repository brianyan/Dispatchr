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
      token = Authentication::JsonWebToken.encode(@user.id)
      params = {
        :user_id => @user.id,
        :routing_number => "222222226",
        :account_number => "123456789",
        :account_name => "#{@user.name}'s Account",
        :account_type => "checking"
      }
      payment = Payment.manual_create(@user.id, "222222226", "123456789", "#{@user.name}'s Account", "checking")
      render json: { user: @user, auth_token: token }
    else
      render json: @user.errors, status: :bad_request
    end
  end
end
