require 'spec_helper'

describe TurmasController do

  describe "GET 'new'" do
    it "Deve chamar o metodo new" do
      Turma.should_receive(:new).once
      get 'new'
    end
  end

  describe "GET 'create'" do
    it "Deve chamar o metodo create" do
      turma = FactoryGirl.build(:turma_product_on_rails)
      Turma.should_receive(:create).with(turma.attributes).once
      get 'create', turma: turma.attributes
    end
  end

  describe "GET 'show' " do
    it "Deve chamar o metodo show" do
      Turma.should_receive(:find).once
      get 'show', id: 1
    end
  end
end
