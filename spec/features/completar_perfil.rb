require 'integration_helper'
feature "Completar Perfil", %q(
  Para realizar minha inscrição em uma nova turma.
  Como um aluno.
  Eu quero completar meu perfil.
) do
  background do
    #criar conta
    @user = FactoryGirl.create :user
  end

  scenario "Editar minhas informações" do
    visit edit_user_path(@user)
    fill_in "Nome", with: "Christiano Milfont"
    fill_in "CPF", with: "78006325391"
    fill_in "Endereço", with: "Rua Eurico Medina, 185"
    click_on "Salvar"
    expect(page).to have_content "Informações salvas com sucesso!"
  end
end