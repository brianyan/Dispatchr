Rails.application.routes.draw do
  match '/users/login/' => 'users#login', :via => :get
  match '/requests/user/' => 'requests#search_user', :via => :get
  match '/request_items/request/' => 'request_items#search_request', :via => :get
  get '/users/username/', to: 'users#show_by_email'
  get '/users/email/', to: 'users#show_by_username'
  resources :items, :requests, :users, :request_items, :addresses
end
