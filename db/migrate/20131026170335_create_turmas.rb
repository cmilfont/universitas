class CreateTurmas < ActiveRecord::Migration
  def change
    create_table :turmas do |t|
      t.string :curso_id

      t.timestamps
    end
  end
end
