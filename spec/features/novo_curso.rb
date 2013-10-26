require 'integration_helper'

feature "Novo Curso", %q{
  Para ofertar uma nova data do curso Product On Rails.
  Como um professor.
  Eu quero cadastrar um curso com uma ementa específica.
} do

  background do
    #Dado que o professor Christiano Milfont esta cadastrado
    #Dado que tenha um tema Tema 1 cadastrado
  end

  scenario "Cadastrar novo curso" do
    visit new_cursos_path
    choose "Christiano Milfont"
    fill_in "Titulo", with: "Product On Rails"
    fill_in "Descrição", with: "Sentindo a necessidade do mercado por ..."
    fill_in "Metodologia", with: "Com base em uma aplicação RoR pré-existente..."
    fill_in "Ementa", with: "1 - Topicos Base"
    choose "Tema 1"
    fill_in "Carga Horária", with: "12h/aula, iniciando as 19h e finalizando as 22h."
    fill_in "Valor", with: "Valor: R$200,00 reais no boleto (consultar cmilfont@milfont.org) ou via paypal."
    fill_in "Link paypal", with: "https://www.paypal.com/br/"
    click_on "Cadastrar"
    expect(page).to have_content "Curso Product On Rails"
  end

end