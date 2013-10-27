class ChangeCursoIdTypeOnTurmas < ActiveRecord::Migration
  def change
    remove_column :turmas, :curso_id
    add_column :turmas, :curso_id, :integer
  end
end
