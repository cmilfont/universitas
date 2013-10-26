class CreateDatasTurma < ActiveRecord::Migration
  def change
    create_table :datas_turma do |t|
      t.date :data
      t.integer :turma_id

      t.timestamps
    end
  end
end
