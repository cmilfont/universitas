Universitas::Application.routes.draw do
  
  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks"
  }

  resources :cursos
  
  resources :turmas

  root "turmas#index"

end
