require 'integration_helper'

feature "Realizar Inscricao", %q{
  Para cursar uma nova turma
  Como um aluno cadastrado
  Eu quero me inscrever na turma 
} do

  let(:link_pagamento) { 'http://example.com' }
  let(:curso) { FactoryGirl.create :curso_product_on_rails, link_pagamento: link_pagamento }

  background do
    @aluno = Aluno.create nome: 'Aluno'
    @turma = FactoryGirl.create :turma_product_on_rails,
              curso_id: curso.id
  end

  context "Com Perfil Completo" do
    background do
      FakeWeb.register_uri(:get, link_pagamento, :body => 'LINK_PAGAMENTO OK')
    end

    xscenario "Redireciona para realizar pagamento" do
      visit turma_path(@turma)
      click_on "Me Inscrever"
      expect(page).to have_content('LINK_PAGAMENTO OK')
    end
  end  # /perfil completo

  context "Com Perfil Incompleto" do
    scenario "Redireciona para o meu perfil" do
       visit turma_path(@turma)
       click_on "Me Inscrever" 
       expect(page).to have_content "Complete seu Perfil"
    end
  end  # /perfil incompleto

end  # /realizar inscricao

