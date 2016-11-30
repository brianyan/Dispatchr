class RequestsController < ApplicationController
	before_action :set_request, only: [:show, :update, :destroy]

	#GET /requests
	def index
		render json: Request.all
	end

	#GET /requests/1
	def show
		render json: @request
	end

	#GET /requests/user/?user_id=1
	def search_user
		
		if params[:user_id].present?
			@requests = Request.where(user_id: params[:user_id])
			render json: @requests
		else
			render status: 404, json: @request
		end
		
		
	end

	#POST /requests
	def create
		@request = Request.new(request_params)
		# @request.request_items = RequestItem.create_list(param[:request_items])
		@request.request_items = RequestItem.new(request_id: @request.id, max_price: params[:request_items][:max_price], 
								quantity_description: params[:request_items][:quantity_description], 
								item: params[:request_items][:item])
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
			params.require(:request).permit(:user_id, :expiration_date, :request_items)
		end

end
