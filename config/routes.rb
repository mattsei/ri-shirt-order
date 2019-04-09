Rails.application.routes.draw do

  resources :order, only: [:index, :create]

  get 'order/created'

  root 'order#index'
end
