require 'integration_helper'	
feature "Cadastro de Artes Marciais", %q(
	Para oferecer uma maneira de categorizar as tecnicas.
	Como um administrador
	Eu quero cadastrar uma arte marcial
) do
	background do
		FactoryGirl.create(:curso_product_on_rails)
	end

	scenario "Nova turma" do
		visit new_turma_path
		select "Product On Rails", from: "Curso"
		fill_in "Data", with: "02/02/2013"
		
		expect(page).to have_content "Product On Rails"
	end
end