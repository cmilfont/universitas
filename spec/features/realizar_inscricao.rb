require 'integration_helper'

feature "Realizar Inscricao", %q{
  Para cursar uma nova turma
  Como um aluno cadastrado
  Eu quero me inscrever na turma 
} do

  background do
    @turma = FactoryGirl.create :turma_product_on_rails
  end

  context "Com Perfil Completo" do
    scenario "Redireciona para realizar pagamento" do
      visit turma_path(@turma)
      click_on "Me Inscrever"
      expect(page).to redirect_to @turma.curso.link_pagamento
    end
  end  # /perfil completo

  context "Com Perfil Incompleto" do
    xscenario "Redireciona para o meu perfil" do
       visit turma_path(@turma)
       click_on "Me Inscrever" 
       expect(page).to redirect_to @perfil
       expect(page).to have_content "Complete seu Perfil"
    end
  end  # /perfil incompleto

end  # /realizar inscricao

