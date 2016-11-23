require 'rails_helper'

RSpec.describe AddressesController, :type => :controller do
  def create_valid_address
    post :create, {address: '123 Main Rd, Goleta CA 93117', latitude: 1, longitude: 1}
  end

  def create_invalid_address
    post :create, {latitude: 1, longitude: 1}
  end

  # describe 'GET #index' do
  #   context 'when there are items in the database' do
  #     post :create, {address: "123 Main Rd, Goleta CA 93117", latitude: 1, longitude: 1}
  #
  #     it 'returns the right amount of addresses' do
  #       get :index
  #       expect(response).to have_http_status(200)
  #     end
  #
  #   end
  #
  # end

  describe 'GET #show' do
    context 'when id is invalid' do
      it 'raises error' do
        expect {get :show, {id: -1}}.to raise_error
      end
    end

    context 'when id is valid' do
      it 'returns 200 status' do
        create_valid_address
        address = Address.last
        get :show, {id: address.id}
        expect(response).to have_http_status(200)
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['address']).to eq('123 Main Rd, Goleta CA 93117')
      end
    end
  end

  describe 'POST #create' do
    context 'when address is successfully created' do
      it 'returns a 200 status' do
        create_valid_address
        expect(response).to have_http_status(200)
      end

      it 'has the correct attributes' do
        create_valid_address
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['address']).to eq('123 Main Rd, Goleta CA 93117')
        expect(parsed_response['latitude']).to eq('1.0')
        expect(parsed_response['longitude']).to eq('1.0')
      end
    end

    context 'when there is a missing/invalid attribute' do
      it 'returns an error' do
        create_invalid_address
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT #update' do
    context 'when id does not exist' do
      it 'raises error' do
        expect {put '/addresses/-1'}.to raise_error
      end
    end

    context 'when id is valid' do
      it 'properly updates attributes' do
        create_valid_address
        address = Address.last
        put :update, {:id => address.id, latitude: 2, longitude: 2}
        expect(response).to have_http_status(200)
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['longitude']).to eq('2.0')
        expect(parsed_response['latitude']).to eq('2.0')
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when id does not exist' do
      it 'raises error' do
        expect {put '/addresses/-1'}.to raise_error
      end
    end

    context 'when valid id is passed' do
      it 'successfully deletes the record' do
        create_valid_address
        address = Address.last
        delete :destroy, {id: address.id}
        expect(response).to have_http_status(204)
        expect {get :show, {:id => address.id}}.to raise_error
      end
    end

  end

end
