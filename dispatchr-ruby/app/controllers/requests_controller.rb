class RequestsController < ApplicationController
	before_action :authenticate_request! 
	before_action :set_request, only: [:show, :update, :destroy, :accept_request, :complete_request, :hero_complete]
	# before_filter 

	#GET /requests
	def index
		render json: Request.order(created_at: :desc)
	end

	#GET /requests/1
	def show
		render json: @request
	end

	#GET /requests/user/1
	def search_user

		if params[:id].present?
			@requests = Request.where("user_id= ? OR hero_id=?", params[:id], params[:id]).order(created_at: :desc)
			render json: @requests
		else
			render status: 404, json: @request
		end
	end

	#POST /requests/accept/:id
	def accept_request
		@request.hero_id = @current_user.id
		@request.status = 1
		username = User.find(@request.user_id).name
		Notification.create(user_id: @request.user_id, message: "Your request has been accepted by #{@current_user.name}!")
		Notification.create(user_id: @current_user.id, message: "You have accepted #{username}'s request!")
		if @request.save
			render json: @request
		else
			render json: @request.errors, status: :bad_request
		end
	end

	#POST /requests/complete/:id
	def complete_request
		@request.status = 2
		username = User.find(@request.user_id).name
		Notification.create(user_id: @request.user_id, message: "Your request has been completed by #{@current_user.name}!")
		Notification.create(user_id: @current_user.id, message: "You have completed #{username}'s request!")
		if @request.save
			render json: @request
		else
			render json: @request.errors, status: :bad_request
		end
	end

	#POST /requests/hero_complete/1
	def hero_complete
		username = User.find(@request.user_id).name
		Notification.create(user_id: @request.user_id, message: "#{@current_user.name} has requested a payment of $#{params[:amount]} with memo: #{params[:memo]}")
		Notification.create(user_id: @current_user.id, message: "You have requested a payment of $#{params[:amount]} to #{username} with memo: #{params[:memo]}")
		render :nothing => true, status: :created
	end
 
	#POST /requests
	def create
		request_items = RequestItem.create_from_list(request_params[:request_items])
		@request = Request.new
		@request.user_id = request_params[:user_id]
		@request.expiration_date = request_params[:expiration_date]
		@request.request_items = request_items
		@request.hero_id = nil
		@request.status = 0
		if @request.save
			render json: @request
		else
			render json: @request.errors, status: :bad_request
		end

	end

	#PATCH/PUT /requests/1
	def update
		if @request.update(request_params)
			render json: @request
		else
			render json: @request.errors, status: :bad_request
		end
	end

	#DELETE /requests/1
	def destroy
		render status: 200, json: @request.destroy
	end

	private
		def set_request
				@request = Request.find(params[:id])
		end

		def request_params
			params.require(:request).permit!
		end

end
