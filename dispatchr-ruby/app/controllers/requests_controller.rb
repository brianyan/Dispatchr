class RequestsController < ApplicationController

	#GET
	def index
		render json: Request.all
	end

	

end
