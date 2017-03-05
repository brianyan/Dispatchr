Rails.application.routes.draw do
  get '/users/username/' => 'users#show_by_username'
  get '/users/email/' => 'users#show_by_email'
  get '/requests/user/:id' => 'requests#search_user'
  get '/request_items/request/' => 'request_items#search_request'
  post '/users' => 'users#create'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  post '/sign_up' => 'registrations#create'
  post '/requests/accept/:id' => 'requests#accept_request'
  post '/requests/complete/:id' => 'requests#complete_request'
  post '/users/reputation/:id/:score' => 'users#update_reputation'
  get '/notifications/get/:user_id' => 'notifications#get_notifications'
  get '/users/:id' => 'users#show'
  post '/payments/transfer/:src_id/:dest_id/:amount' => 'payments#transfer'
  post '/requests/hero_complete/:id' => 'requests#hero_complete'
  post '/stores/hotspot/' => 'stores#hotspot'
  resources :items, :requests, :users, :request_items, :addresses, :notifications, :payments, :stores
end
