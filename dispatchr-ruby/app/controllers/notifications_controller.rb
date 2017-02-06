class NotificationsController < ApplicationController
  before_action :set_notification, only: [:show, :update, :destroy]

  # GET /notifications
  # GET /notifications.json
  def index
    @notifications = Notification.all
  end

  # GET /notifications/1
  # GET /notifications/1.json
  def show
    render json: @notification
  end

  #GET /notifications/get/:user_id
  def get_notifications
    if params[:user_id].present?
      @notifications = Request.where(user_id: params[:user_id]).order(created_at: :desc)
      render json: @notifications
    else
      render status: 404, json: @notifications
    end
  end

  # POST /notifications
  # POST /notifications.json
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render :show, status: :created, location: @notification
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notifications/1
  # PATCH/PUT /notifications/1.json
  def update
    if @notification.update(notification_params)
      render :show, status: :ok, location: @notification
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notifications/1
  # DELETE /notifications/1.json
  def destroy
    @notification.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification
      @notification = Notification.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def notification_params
      params.require(:notification).permit(:user_id, :message)
    end
end
