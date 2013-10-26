require 'integration_helper'

feature "Novo Curso", %q{
  Para ofertar uma nova data do curso Product On Rails.
  Como um professor.
  Eu quero cadastrar um curso com uma ementa específica.
} do

  background do
    Instrutor.create :nome => "Christiano Milfont"
    Tema.create :nome => "Tema 1"
  end

  scenario "Cadastrar novo curso" do
    visit new_curso_path
    select "Christiano Milfont", from: 'Instrutor'
    fill_in "Titulo", with: "Product On Rails"
    fill_in "Descrição", with: "Sentindo a necessidade do mercado por ..."
    fill_in "Metodologia", with: "Com base em uma aplicação RoR pré-existente..."
    fill_in "Ementa", with: "1 - Topicos Base"
    select "Tema 1", from: 'Tema'
    fill_in "Carga Horária", with: "12h/aula, iniciando as 19h e finalizando as 22h."
    fill_in "Valor", with: "Valor: R$200,00 reais no boleto (consultar cmilfont@milfont.org) ou via paypal."
    fill_in "Link pagamento", with: "https://www.paypal.com/br/"
    click_on "Cadastrar"
    expect(page).to have_content "Curso Product On Rails"
  end

end