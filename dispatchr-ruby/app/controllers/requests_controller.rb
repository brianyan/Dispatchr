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
		#get user_id from URL
		url = request.original_url
		uri = URI.parse(url)
		params = CGI.parse(uri.query)

		#find all Requests where user_id matches
		arr = []
		Request.where(user_id: "#{params['user_id'].first}").find_each do |req|
			arr.push(req)
		end

		#render as json
		render json: arr
	end

	#POST /requests
	def create
		@request = Request.new(request_params)
		
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
			params.require(:request).permit(:user_id, :expiration_date)
		end

end
