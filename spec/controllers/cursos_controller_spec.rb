require 'spec_helper'

describe CursosController do
  
  describe "GET new" do
    
    it "Novo curso" do
      Curso.should_receive(:new).once
      get :new
    end
    
  end

  describe "GET show" do
  end
  
  describe "POST create" do
    
    let(:curso) {
      FactoryGirl.build(:curso, :id => 2)
    }
    
    it "Criar curso" do
      Curso.should_receive(:create).once.with(anything).and_return curso
      post :create, curso: curso.attributes
    end
    
  end
  
end