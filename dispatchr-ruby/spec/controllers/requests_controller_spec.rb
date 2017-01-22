require 'rails_helper'

RSpec.describe RequestsController, :type => :controller do
	
	before(:each) do
 	 	controller.stub(:authenticate_request! => true)
	end

	def create_request
		post :create, { request:{user_id: 1, expiration_date: '28-11-16', request_items: [{name: "Candy", "max_price":10, "quantity_description":"3"}]} }
	end

	describe 'GET #show' do
		context 'when id is valid' do
			it 'returns 200 status' do
				create_request
				request = Request.last
				get :show, {id: request.id}
				expect(response).to have_http_status(200)
			end
		end

		context 'when id is invalid' do
			it 'raises error' do
				expect {get :show, {id: -1}}.to raise_error
			end
		end
	end

	describe 'GET #search_user' do
		context 'when user_id is valid' do
			it 'returns all matching user_id entries' do
				(0..2).each do |i|
					create_request
				end
				get :search_user, user_id: 1
				parsed_response = JSON.parse(response.body)
				expect(parsed_response.length).to eq(3)
			end
		end
	end

	describe 'POST #create' do
		context 'when request is successfully created' do
			it 'returns 200 status' do
				create_request
				expect(response).to have_http_status(200)
			end

			it 'has the correct user_id and expiration_date' do
				create_request
				request = Request.last
				expect(request.user_id).to eq(1)
				expect(request.expiration_date).to eq("0028-11-16T00:00:00.000Z")
			end
		end
	end

	describe 'PATCH/PUT #update' do
		context 'when id does not exist' do
			it 'raises error' do
				expect {put '/requests/-1'}.to raise_error
			end
		end

		context 'when a parameter is missing' do
			it 'returns the same item' do
				create_request
				request = Request.last
				put :update, {:id => request.id, request: {id: request.id, user_id: 5}}
				updated_request = Request.last
				expect(updated_request.user_id).to eq(5)
				expect(updated_request.expiration_date).to eq(request.expiration_date)
			end
		end

		context 'when both parameters are present' do
			it 'updates parameters and returns 200 status' do
				create_request
				request = Request.last
				put :update, {:id => request.id, request: {id: request.id, user_id: 5, expiration_date: '29-11-16'}}
				updated_request = Request.last
				expect(updated_request.user_id).to eq(5)
				expect(updated_request.expiration_date).to eq("0029-11-16T00:00:00.000Z")
			end
		end
	end

	describe 'DELETE #destroy' do
		context 'when id does not exist' do
			it 'raises error' do
				expect {delete '/requests/-1'}.to raise_error
			end
		end
		context 'when id exists' do
			it 'deletes the entry and returns 200 status' do
				create_request
				request = Request.last
				delete :destroy, {:id => request.id, request: {id: request.id}}
				expect(response).to have_http_status(200)
				expect {get :show, {id: request.id}}.to raise_error
			end
		end
	end



end
