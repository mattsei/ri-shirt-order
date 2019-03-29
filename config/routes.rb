Rails.application.routes.draw do

  resources :order
  
  get 'order/index'
  get 'order/created'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'order#index'
end
