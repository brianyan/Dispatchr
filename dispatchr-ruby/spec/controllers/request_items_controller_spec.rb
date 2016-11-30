require 'rails_helper'

RSpec.describe RequestItemsController, :type => :controller do

  def create_request_item
    post :create, {request_item: {request_id: 1, max_price: 100, quantity_description: "5", item: { name: "bananas" }}}
  end

  def create_bad_request_item
    post :create, {request_item: {max_price: 100, quantity_description: "5", item: { name: "bananas" }}}
  end

  describe 'GET #show' do
    context 'when id is valid' do
      it 'returns 200 status' do
        create_request_item
        request_item = RequestItem.last
        get :show, {id: request_item.id}
        expect(response).to have_http_status(200)
      end
    end

    context 'when id is invalid' do
      it 'raises error' do
        expect {get :show, {id: -1}}.to raise_error
      end
    end
  end

  describe 'GET #search_request' do
    context 'when request_id is valid' do
      it 'returns all matching request_id entries' do
        (0..2).each do |i|
          create_request_item
        end
        get :search_request, request_id: 1
        parsed_response = JSON.parse(response.body)
        expect(parsed_response.length).to eq(3)
      end
    end
  end

  describe 'POST #create' do
    context 'when request is successfully created' do
      it 'returns 200 status' do
        create_request_item
        expect(response).to have_http_status(200)
      end

      it 'has the correct attributes' do
        create_request_item
        request_item = RequestItem.last
        expect(request_item.request_id).to eq(1)
        expect(request_item.max_price).to eq(100)
        expect(request_item.quantity_description).to eq("5")
        expect(request_item.item.name).to eq("bananas")
      end
    end

    context 'when there is a missing parameter' do
      it 'returns 400 bad request' do
        create_bad_request_item
        expect(response).to have_http_status(400)
      end
    end
  end

  describe 'PATCH/PUT #update' do
    context 'when id does not exist' do
      it 'raises error' do
        expect {put '/request_items/-1'}.to raise_error
      end
    end

    context 'when a parameter is missing' do
      it 'updates all other parameters included in request' do
        create_request_item
        request_item = RequestItem.last
        put :update, {:id => request_item.id, request_item: {max_price: 50, item: { name: "apples" }}}
        request_item.reload
        expect(request_item.max_price).to eq(50) #updated
        expect(request_item.request_id).to eq(1) #unchanged
        expect(request_item.quantity_description).to eq("5") #unchanged
        expect(request_item.item.name).to eq("apples") #updated
      end
    end

    context 'when all parameters are include' do
      it 'updates all parameters' do
        create_request_item
        request_item = RequestItem.last
        put :update, {:id => request_item.id, request_item: {request_id: 2, max_price: 50, quantity_description: "100", item: { name: "test" }}}
        request_item.reload
        expect(request_item.request_id).to eq(2) 
        expect(request_item.max_price).to eq(50) 
        expect(request_item.quantity_description).to eq("100") 
        expect(request_item.item.name).to eq("test")
      end
    end

    context 'when an update request doesnt contain a request_item' do
      it 'raises error' do
        create_request_item
        request_item = RequestItem.last
        expect { put :update, {:id => request_item.id, bad: 2} }.to raise_error
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when id does not exist' do
      it 'raises error' do
        expect { delete 'destroy/1' }.to raise_error
      end
    end

    context 'when the id exists' do
      it 'deletes the request_item from the database and returns 200 status' do
        create_request_item
        request_item = RequestItem.last
        delete :destroy, {:id => request_item.id}
        expect(response).to have_http_status(200)
        expect {get :show, {:id => request_item.id}}.to raise_error
      end
    end
  end

end
