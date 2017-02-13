class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def show_by_email
    user = User.find_by_email(params[:email])
    render json: user
  end

  def show_by_username
    user = User.find_by(username: params[:username])
    render json: user
  end

  def login
    if params[:username].present?
      @user = User.find_by(username: params[:username])
      if @user
        render json: @user
      else
        render status: 404, json: @user  
      end
    else
      render status: 404, json: @user
    end
  end
 # '/users/reputation/:id/:score'
  def update_reputation
    if (params[:score].to_f < 0 or params[:score].to_f > 5)
      render json: @user.errors, status: :bad_request
    end
    
    user = User.find(params[:id])
    newRep = User.calculate_reputation(user.reputation, user.numReviews, params[:score].to_f)
    user.reputation = newRep
    user.numReviews = user.numReviews+1
    if user.save
      render json: user
    else
      render json: user.errors, status: :unprocessable_entity
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
