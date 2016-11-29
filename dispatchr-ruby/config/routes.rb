Rails.application.routes.draw do
  resources :items, :requests, :users, :request_items, :addresses
end
