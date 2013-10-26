require 'spec_helper'

describe CursosController do
  
  let(:curso) {
    FactoryGirl.build(:curso, :id => 2)
  }
  
  describe "GET new" do
    
    it "Novo curso" do
      Curso.should_receive(:new).once
      get :new
    end
    
  end

  describe "GET show" do
    
    it "Mostrar curso" do
      Curso.should_receive(:find).once.with(curso.id.to_s).and_return curso
      get :show, id: curso.id
    end
    
  end
  
  describe "POST create" do
    
    it "Criar curso" do
      Curso.should_receive(:create).once.with(anything).and_return curso
      post :create, curso: curso.attributes
    end
    
  end
  
end