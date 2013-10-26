class CreateInscricoes < ActiveRecord::Migration
  def change
    create_table :inscricoes do |t|
      t.boolean :pago

      t.belongs_to :turma
      t.belongs_to :aluno

      t.timestamps
    end
  end
end
