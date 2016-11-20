class RequestsController < ApplicationController

  def bad_params
    error_str = 'One or more parameters are missing'
    render json: error_str, status: :unprocessable_entity
  end

	#GET
	def index
		render json: Request.all
	end

	#GET
	def show
		if params[:id].present?
			request_id = params[:id]
			request = Request.find(request_id)

			if request.present?
				render json: request
			else
				render json: request.errors, status: :unprocessable_entity
			end

		else #need to check if this is right (rendering a string as json)
			error = "Invalid request ID entered"
			render json: error, status: :unprocessable_entity
		end
	end

	#POST
	def create
		if params[:user_id].present? && params[:expiration_date].present?
			user_id = params[:user_id]
			exp_date = params[:expiration_date]
			request = Request.new(user_id: user_id, expiration_date: exp_date)

			if request.save
				render json: request
			else
				render json: request.errors, status: :unprocessable_entity
			end

		else
			bad_params
		end
	end

	#PATCH/PUT
	def update
		if params[:id].present? && params[:expiration_date].present? && params[:user_id].present?
			
			request = Request.find(params[:id])
			request.expiration_date = params[:expiration_date]

			if request.save
				render json: request
			else
				bad_params
			end
		else
			bad_params
		end
	end


end
