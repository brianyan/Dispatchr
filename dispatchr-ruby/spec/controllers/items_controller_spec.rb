require 'rails_helper'

RSpec.describe ItemsController, :type => :controller do

	describe 'GET #show' do
		context 'when id is invalid' do
			it 'raises error' do
				expect {get :show, {id: -1}}.to raise_error
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
				post :create, {id: 1, name: 'banana'}
				expect(response).to have_http_status(200)
			end
			it 'has the correct name' do
				post :create, {name: 'banana'}
				item = Item.last
				expect(item.name).to eq('banana')
			end
		end
	end

end
