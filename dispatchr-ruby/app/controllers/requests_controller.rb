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
		request_items = RequestItem.create_from_list(request_params[:request_items])
		@request = Request.new
		@request.user_id = request_params[:user_id]
		@request.expiration_date = request_params[:expiration_date]
		@request.request_items = request_items
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
