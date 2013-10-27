require 'integration_helper'	
feature "Nova turma", %q(
  Para abrir inscrições de uma nova turma.
  Como um professor.
  Eu quero ofertar uma nova data do curso Product On Rails.
) do
	background do
		FactoryGirl.create(:curso_product_on_rails)
	end

	scenario "Nova turma" do
		visit new_turma_path
		select "Product On Rails", from: "Curso"
		fill_in "Data", with: "02/02/2013"
    click_on "Cadastrar"
		expect(page).to have_content "Matriculas abertas"
	end
end