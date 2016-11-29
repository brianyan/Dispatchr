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

	def test
		url = request.original_url
		# Rails.logger uri
		uri = URI.parse(url)
		params = CGI.parse(uri.query)
		@request = Request.find_by(user_id: "#{params['user_id'].first}")

		render json: @request
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
		render status: 200, json: request.destroy
	end

	private
		def set_request
				@request = Request.find(params[:id])
		end

		def request_params
			params.require(:request).permit(:user_id, :expiration_date)
		end

end
