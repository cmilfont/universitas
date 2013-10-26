class CreateCursos < ActiveRecord::Migration
  def change
    create_table :cursos do |t|
      t.belongs_to :instrutor
      t.belongs_to :tema
      t.string :titulo
      t.text :descricao
      t.text :metodologia
      t.text :ementa
      t.string :carga_horaria
      t.string :valor
      t.string :link_pagamento
      t.timestamps
    end
  end
end