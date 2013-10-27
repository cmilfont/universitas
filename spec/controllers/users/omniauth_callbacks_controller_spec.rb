require 'spec_helper'

describe Users::OmniauthCallbacksController do

  describe 'Logar via Facebook' do

    let(:current_user) {
      FactoryGirl.create :user
    }

    before do

      controller.stub :current_user => current_user

      OmniAuth.config.test_mode =  true
      OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
                                                                      :provider => 'facebook',
                                                                      :uid => '123545',
                                                                      'extra' => {
                                                                        'raw_info' => {
                                                                          'name' => "Teste Nome",
                                                                          'email' => "joesmith@gmail.coa"
                                                                        }
                                                                      },
                                                                      'credentials' => {'token' => "meu_cratim"}
                                                                    })

      request.env["devise.mapping"] = Devise.mappings[:user]
      request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook]



    end

    it "Recebe a resposta do Facebook com os dados do usuário" do
      User.should_receive(:find_for_facebook_oauth).and_return current_user
      get :facebook
    end

  end

end