require 'rails_helper'

RSpec.describe "Users", :type => :request do
  	
  	def create_valid_user
    	post '/sign_up/', {name: 'test_name', username: 'test_username', password: 'test_pass', email: 'test@test.com',
                    address: {address: '123 Main Rd, Goleta CA 93117 USA', latitude: 0, longitude: 0}}
  	end

  	describe 'GET #show' do
    	context 'when id is invalid' do
      		it 'raises error' do
        		expect {get '/users/-1'}.to raise_error
      		end
		end

    	context 'when id is valid' do
      		it 'returns 200 status' do
	        	create_valid_user
		        user = User.last
		        get '/users/', {id: user.id}
		        expect(response).to have_http_status(200)
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
		        put "/users/#{user.id}", {id: user.id, email: 'test_updated@test.com'}
		        user_updated = User.last
		        expect(user.email).not_to eq(user_updated.email)
		        expect(user_updated.email).to eq('test_updated@test.com')

		    end
    	end

	    context 'when invalid attributes are entered' do
	        it 'returns the same unmodified object' do
		        create_valid_user
		        user = User.last
		        put "/users/#{user.id}", {id: user.id, test_email: 'test_updated@test.com'}
		        user_updated = User.last
		        expect(user.email).to eq(user_updated.email)
	      	end
	    end
  	end

	describe 'DELETE #destroy' do
	    context 'when id does not exist' do
	      	it 'raises error' do
	        	expect {delete '/users/-1'}.to raise_error
	      	end
	    end

	    context 'when the user id exists' do
	      	it 'deletes the user from the database' do
	        	create_valid_user
	        	user = User.last
	        	delete "/users/#{user.id}", {id: user.id}
	        	expect(response).to have_http_status(200)
	        	expect {get "/users/#{user.id}"}.to raise_error
	     	end
	    end
	end
end
