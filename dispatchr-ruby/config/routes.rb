Rails.application.routes.draw do
  match '/requests/user/' => 'requests#search_user', :via => :get
  resources :items, :requests, :users, :request_items, :addresses
end
