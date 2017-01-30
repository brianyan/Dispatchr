Rails.application.routes.draw do
  # match '/users/login/' => 'users#login', :via => :get
  get '/requests/user/:id' => 'requests#search_user'
  get '/request_items/request/' => 'request_items#search_request'
  resources :items, :requests, :users, :request_items, :addresses
  post '/users' => 'users#create'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  post '/sign_up' => 'registrations#create'
  post '/requests/accept/:id' => 'requests#accept_request' 
  post '/requests/complete/:id' => 'requests#complete_request'
end
