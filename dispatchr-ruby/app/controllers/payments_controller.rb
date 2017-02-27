class PaymentsController < ApplicationController
  before_action :set_payment, only: [:show, :update, :destroy]

  # GET /payments
  # GET /payments.json
  def index
    @payments = Payment.all
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  # POST /payments
  # POST /payments.json
  def create
    @user = User.find_by(id: payment_params[:user_id])
    # puts @user.name
    if (@user)
      #set user entered params
      @payment = Payment.new
      @payment.user_id = payment_params[:user_id]
      @payment.routing_number = payment_params[:routing_number]
      @payment.account_number = payment_params[:account_number]
      @payment.account_name = payment_params[:account_name]
      if (payment_params[:account_type] != "checking" && payment_params[:account_type] != "savings")
        @payment.account_type = "checking"
      else
        @payment.account_type = payment_params[:account_type]
      end

      #set dwolla generated params
      @payment.customer = Payment.create_dwolla_customer(@user)
      @payment.funding_source = Payment.link_funding_source(@payment)
      Payment.verify_customer(@payment.funding_source)

      if @payment.save
        render :show, status: :created, location: @payment
      else
        render json: @payment.errors, status: :unprocessable_entity
      end  

    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # POST /payments/transfer/:src_id/:dest_id/:amount
  def transfer
    user1 = Payment.find_by(user_id: params[:src_id])
    user2 = Payment.find_by(user_id: params[:dest_id])

    username1 = User.find_by(id: params[:src_id])
    username2 = User.find_by(id: params[:dest_id])
    if (user1 && user2)
      Payment.transfer(user1, user2, params[:amount])
      Notification.create(user_id: user1.user_id, message: "Your payment of $#{params[:amount]} has been initiated to #{username2.name} via Dwolla!")
      Notification.create(user_id: user2.user_id, message: "#{username1.name} has initiated a payment of $#{params[:amount]} to you via Dwolla!")
      render :nothing => true, status: :created
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /payments/1
  # PATCH/PUT /payments/1.json
  def update
    if @payment.update(payment_params)
      render :show, status: :ok, location: @payment
    else
      render json: @payment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /payments/1
  # DELETE /payments/1.json
  def destroy
    @payment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      @payment = Payment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def payment_params
      # params.require(:payment).permit(:user_id, :customer, :funding_source, :routing_number, :account_number, :type, :account_name)
      params.require(:payment).permit!
    end
end
