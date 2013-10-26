Universitas::Application.routes.draw do
  
  devise_for :users

  resources :cursos
  
  resources :turmas

  root "turmas#index"

end
