require 'rails_helper'

RSpec.describe ItemsController, :type => :controller do

	describe 'GET #show' do
		context 'when id is invalid' do
			it 'raises error' do
				expect {get :show, {id: -1}}.to raise_error #should be 422 error
			end
		end

		context 'when id is valid' do
			it 'returns 200 status' do
				post :create, {name: 'banana'}
				item = Item.last
				get :show, {id: item.id}
				
				expect(response).to have_http_status(200)
				
			end
		end
	end

	describe 'POST #create' do
		context 'when item is successfully created' do
			it 'returns 200 status' do
				post :create, {name: 'banana'}
				expect(response).to have_http_status(200)
			end
			it 'has the correct name' do
				post :create, {name: 'banana'}
				item = Item.last
				expect(item.name).to eq('banana')
			end
		end
		context 'when there is no name' do
			it 'returns 422 unprocessible entity error' do
				post :create, {}
				expect(response).to have_http_status(422)
			end
		end
	end

	describe 'PUT #update' do
		context 'when id does not exist' do
			it 'raises error' do
				expect {put '/items/-1'}.to raise_error #should be bad name error 422
			end
		end

		context 'when no name is provided' do
			it 'returns 422 unprocessible entity error' do
				post :create, {name: 'test'}
				item = Item.last
				put :update, {id: item.id, bad: 'bad name'}
				expect(response).to have_http_status(422)
			end
		end 

		context 'when id and name exist' do
			it 'returns 200 status and updates name' do
				post :create, {name: 'test'}
				item = Item.last
				put :update, {id: item.id, name: 'newName'}
				item = Item.last
				expect(item.name).to eq('newName')
				expect(response).to have_http_status(200)
			end
		end
	end

	describe 'DELETE #destroy' do
		context 'when id does not exist' do
			it 'raises error' do
				expect {delete 'items/-1'}.to raise_error #should be invalid id 422
			end
		end

		context 'when id exists' do
			it 'deletes the entry' do
				post :create, {name: 'test'}
				item = Item.last
				delete :destroy, {id: item.id}
				expect(response).to have_http_status(200)
				expect {get :show, {id: item.id}}.to raise_error
			end
		end
	end

end
