class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    if params[:id].present?
      user_id = params[:id]
      user = User.find(user_id)

      if user.present?
        render json: user
      else
        render json: user.errors, status: :unprocessable_entity
      end

    else
      error_str = "No/Invalid user ID entered"
      render json: error_str, status: :unprocessable_entity
    end
  end

  def create
    if params[:name].present? && params[:address].present? && params[:email].present? && params[:username].present?
      address = Address.new(
          address: params[:address][:address],
          latitude: params[:address][:latitude],
          longitude: params[:address][:longitude]
      )

      user = User.new(
          name: params[:name],
          username: params[:username],
          email: params[:email]
      )

      user.address = address

      if user.save
        render json: user
      else
        render json: user.errors, status: :unprocessable_entity
      end
    else
      render json: "Non-existent or invalid params. Please fix this error and try again.", status: :unprocessable_entity
    end


  end

  def update
    if params[:id].present?
      user = User.find(params[:id])
      user.name = params[:name].present? ? params[:name] : user.name
      user.username = params[:username].present? ? params[:username] : user.username
      user.email = params[:email].present? ? params[:email] : user.email

      if user.save
        render json: user
      else
        render json: user.errors, status: :unprocessable_entity
      end
    else
      error_str = "No/Invalid user ID entered"
      render json: error_str, status: :unprocessable_entity
    end
  end

  def destroy
    if params[:id].present?
      user = User.find(params[:id])
      render status: 200, json: user.destroy
    end
  end

end
