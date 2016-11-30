

class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
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
      render json: user.errors, status: :bad_request
    end


  end

  def update
    user = User.find(params[:id])
    user.name = params[:name].present? ? params[:name] : user.name
    user.username = params[:username].present? ? params[:username] : user.username
    user.email = params[:email].present? ? params[:email] : user.email
    # user.address = params[:address].present? ? params[:address] : user.address


    if params[:address].present?
      new_address = Address.new(
          address: params[:address][:address],
          latitude: params[:address][:latitude],
          longitude: params[:address][:longitude]
      )
      user.address.destroy
      user.address = new_address
    end
    
    if user.save
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    render status: 200, json: user.destroy
  end

  def user_params
    params.require(:user).permit(:name, :email, :username, :address)
  end

end
