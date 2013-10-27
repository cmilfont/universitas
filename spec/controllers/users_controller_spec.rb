require 'spec_helper'

describe UsersController do

  let(:user) { FactoryGirl.build :user, id: 2 }

  describe "GET 'edit'" do

    it "Segue pra tela de edição" do
      User.should_receive(:find).once.with(user.id.to_s).and_return user
      get :edit, id: user.id
    end

  end

  describe "PUT 'update'" do

    it "Atualiza informações do perfil" do
      user.should_receive(:update_attributes).once.with(anything)
      User.should_receive(:find).once.with(user.id.to_s).and_return user
      put :update, id: user.id, user: {cpf: "7800"}
    end

  end

end
