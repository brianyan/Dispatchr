require 'rails_helper'
require 'pp'

RSpec.describe UsersController, :type => :controller do

  def create_valid_user
    post :create, {name: 'test_name', username: 'test_username', email: 'test@test.com',
                   address: {address: '123 Main Rd, Goleta CA 93117 USA', latitude: 0, longitude: 0}}
  end

  describe 'GET #show' do
    context 'when id is invalid' do
      it 'raises error' do
        expect {get :show, {id: -1}}.to raise_error
      end

    end

    context 'when id is valid' do
      it 'returns 200 status' do
        create_valid_user
        user = User.last
        get :show, {id: user.id}
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'POST #create' do
    context 'when user is successfully created' do
      it 'returns 200 status' do
        create_valid_user
        expect(response).to have_http_status(200)
      end
      it 'has the correct name' do
        create_valid_user
        user = User.last
        expect(user.name).to eq('test_name')
      end

      it 'has the correct address' do
        create_valid_user
        user = User.last
        expect(user.address.address).to eq('123 Main Rd, Goleta CA 93117 USA')
      end

    end

    context 'when there is a missing attribute' do

      it 'returns exception' do
        post :create, {username: 'test_username', email: 'test@test.com',
                       address: {address: '123 Main Rd, Goleta CA 93117 USA', latitude: 0, longtitude: 0}}
        expect(response).to have_http_status(400)
      end

    end
  end

  describe 'PATCH/PUT #update' do

    context 'when id does not exist' do
      it 'raises error' do
        expect {put '/users/-1'}.to raise_error
      end
    end

    context 'when user attributes are successfully updated' do
      it 'successfully updates the user' do
        create_valid_user
        user = User.last
        post :update, {id: user.id, email: 'test_updated@test.com'}
        user_updated = User.last
        expect(user.email).not_to eq(user_updated.email)
        expect(user_updated.email).to eq('test_updated@test.com')

      end

    end

    context 'when invalid attributes are entered' do
      it 'returns the same unmodified object' do
        create_valid_user
        user = User.last
        post :update, {id: user.id, test_email: 'test_updated@test.com'}
        user_updated = User.last
        expect(user.email).to eq(user_updated.email)
      end

    end
  end

  describe 'DELETE #destroy' do
    context 'when id does not exist' do
      it 'raises error' do
        expect {put '/users/-1'}.to raise_error
      end
    end

    context 'when the user id exists' do
      it 'deletes the user from the database' do
        create_valid_user
        user = User.last
        delete :destroy, {id: user.id}
        expect(response).to have_http_status(200)
        expect {get :show, {id: user.id}}.to raise_error
      end
    end
  end
end
