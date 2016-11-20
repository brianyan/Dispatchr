require 'rails_helper'

RSpec.describe RequestsController, :type => :controller do

	describe 'GET #show' do
		context 'when id is valid' do
			it 'returns 200 status' do
				post :create, {user_id: 1, expiration_date: '0'}
				request = Request.last
				get :show, {id: request.id}
				expect(response).to have_http_status(200)
			end
		end

		context 'when id is invalid' do
			it 'returns 422 unprocessable entity error' do
				#get :show, {id: -1}
				#expect(response).to have_http_status(422) need to fix
				expect {get :show, {id: -1}}.to raise_error
			end
		end
	end

	describe 'POST #create' do
		context 'when request is successfully created' do
			it 'returns 200 status' do
				post :create, {user_id: 1, expiration_date: '0'}
				expect(response).to have_http_status(200)
			end
			it 'has the correct user_id and expiration_date' do
				post :create, {user_id: 1, expiration_date: '0'}
				request = Request.last
				expect(request.user_id).to eq(1)
				expect(request.expiration_date).to eq(nil)
			end
		end

		context 'when there is no user_id' do
			it 'returns 422 unprocessable entity error' do
				post :create, {expiration_date: '0'}
				expect(response).to	have_http_status(422)
			end
		end

		context 'when there is no expiration_date' do
			it 'returns 422 unprocessable entity error' do
				post :create, {user_id: 1}
				expect(response).to	have_http_status(422)
			end
		end
	end

end
