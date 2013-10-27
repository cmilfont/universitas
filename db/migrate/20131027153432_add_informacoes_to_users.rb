class AddInformacoesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cpf, :string
    add_column :users, :endereco, :string
  end
end
