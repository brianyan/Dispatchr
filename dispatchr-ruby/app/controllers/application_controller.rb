require "jwt"

class ApplicationController < ActionController::API
  attr_reader :current_user

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
      render json: { user: @user, auth_token: token }
    else
      render json: @user.errors, status: :bad_request
    end
  end

  protected
  def authenticate_request!
    unless user_id_in_token?
      render json: { errors: ['Not Authenticated'] }, status: :unauthorized
      return
    end
    puts auth_token
    @current_user = User.find(auth_token['user_id'])
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  private
  def http_token
      @http_token ||= if request.headers['Authorization'].present?
        request.headers['Authorization'].split(' ').last
      end
  end

  def auth_token
    @auth_token ||= Authentication::JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token['user_id'].to_i
  end

end
