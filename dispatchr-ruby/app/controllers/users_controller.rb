class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    if params[:id].present?
      user_id = params[:id]
      user = Item.find(user_id)

      if user.present?
        render json: item
      else
        render json: item.errors, status: :unprocessable_entity
      end

    else
      error_str = "No/Invalid item ID entered"
      render json: error_str, status: :unprocessable_entity
    end
  end

  def create
    puts "ABOUT TO OUTPUT"
    puts params

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
    end
  end

  def destroy
    if params[:id].present?
      user = User.find(params[:id])
      render status: 200, json: user.destroy
    end
  end

end
