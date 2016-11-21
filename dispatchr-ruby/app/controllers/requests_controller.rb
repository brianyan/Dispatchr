class RequestsController < ApplicationController


	#GET
	def index
		render json: Request.all
	end

	#GET
	def show
		request = Request.find(params[:id])
		render json: request
	end

	#POST
	def create
		request = Request.new(
					user_id: params[:user_id],
					expiration_date: params[:expiration_date]
			)
		if request.save
			render json: request
		else
			render json: request.errors, status: :bad_request
		end

	end

	#PATCH/PUT
	def update	
		request = Request.find(params[:id])
		request.expiration_date = params[:expiration_date].present? ? params[:expiration_date] : request.expiration_date
		request.user_id = params[:user_id].present? ? params[:user_id] : request.user_id

		if request.save
			render json: request
		else
			render json: request.errors, status: :unprocessable_entity
		end

	end

	#DELETE
	def destroy
		request = Request.find(params[:id])
		render status: 200, json: request.destroy
	end

	def request_params
		params.require(:request).permit(:user_id, :expiration_date)
	end

end
