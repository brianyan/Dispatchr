class RequestsController < ApplicationController
	before_action :set_request, only: [:show, :update, :destroy, :accept_request, :complete_request]
	before_filter :authenticate_request!

	#GET /requests
	def index
		render json: Request.order(created_at: :desc)
	end

	#GET /requests/1
	def show
		render json: @request
	end

	#GET /requests/user/?user_id=1
	def search_user

		if params[:user_id].present?
			@requests = Request.where(user_id: params[:user_id]).order(created_at: :desc)
			render json: @requests
		else
			render status: 404, json: @request
		end
	end

	#POST /requests/accept/1
	def accept_request
		@request.hero_id = @current_user.id
		@request.status = 1
		if @request.save
			render json: @request
		else
			render json: @request.errors, status: :bad_request
		end
	end

	#POST /requests/complete/1
	def complete_request
		@request.status = 2
		if @request.save
			render json: @request
		else
			render json: @request.errors, status: :bad_request
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
