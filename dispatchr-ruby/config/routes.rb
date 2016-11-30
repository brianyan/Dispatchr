Rails.application.routes.draw do
  match '/requests/user/' => 'requests#search_user', :via => :get
  match '/request_items/request/' => 'request_items#search_request', :via => :get
  resources :items, :requests, :users, :request_items, :addresses
end
