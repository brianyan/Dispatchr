Rails.application.routes.draw do
  match '/requests/user' => 'requests#test', via: :get	
  resources :items, :requests, :users, :request_items, :addresses
end
