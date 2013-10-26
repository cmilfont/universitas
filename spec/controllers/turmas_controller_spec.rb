require 'spec_helper'

describe TurmasController do

  let(:turma) {
    FactoryGirl.build(:turma_product_on_rails, :id => 2)
  }

  describe "GET 'new'" do
    it "Deve chamar o metodo new" do
      Turma.should_receive(:new).once
      get 'new'
    end
  end

  describe "GET 'create'" do
    it "Deve chamar o metodo create" do
      Turma.should_receive(:create).with(anything).once.and_return turma
      post 'create', turma: turma.attributes
    end
  end

  describe "GET 'show' " do
    it "Deve chamar o metodo show" do
      Turma.should_receive(:find).once
      get 'show', id: 1
    end
  end
end
