require 'integration_helper'	
feature "Cadastro de Artes Marciais", %q(
	Para oferecer uma maneira de categorizar as tecnicas.
	Como um administrador
	Eu quero cadastrar uma arte marcial
) do
	background do
		FactoryGirl.create(:turma_product_on_rails)
	end

	scenario "Nova turma" do
		visit new_turma_path
		#TODO - escolher o Product on rails em especifico
		all('#curso_id option')[0].select_option
		#TODO - E escolhi as datas "10 a 13 de Setembro de 2012"
		
		expect(page).to have_content ["Matrículas abertas","Curso Product On Rails"]
	end
end