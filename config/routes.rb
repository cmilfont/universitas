Universitas::Application.routes.draw do
  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks"
  }

  resources :cursos
  resources :turmas
  resources :inscricoes
  resources :alunos

  root "turmas#index"
end
