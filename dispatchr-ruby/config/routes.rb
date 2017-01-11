Rails.application.routes.draw do
  # match '/users/login/' => 'users#login', :via => :get
  match '/requests/user/' => 'requests#search_user', :via => :get
  match '/request_items/request/' => 'request_items#search_request', :via => :get
  resources :items, :requests, :users, :request_items, :addresses
  post '/users' => 'users#create'
  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
end
