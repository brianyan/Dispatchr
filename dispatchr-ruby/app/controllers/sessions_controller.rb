class SessionsController < ApplicationController
  def create
    @user = User.find_by_email(params[:email])
    if @user && @user.authenticate(params[:password])
      token = Authentication::JsonWebToken.encode(@user.id)
      render json: { user: @user, auth_token: token }
    else
      render status: :unauthorized, json: { error: 'Oops! Invalid user/password' }
    end
  end

  def destroy

  end
end
