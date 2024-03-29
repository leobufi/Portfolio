Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard'
  resources :projects, only: [:new, :create, :edit, :update, :destroy]
  resources :tags, only: [:new, :create, :edit, :update, :destroy]
  resources :categories, only: [:new, :create, :edit, :update, :destroy]

end
