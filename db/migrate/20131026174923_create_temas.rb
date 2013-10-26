class CreateTemas < ActiveRecord::Migration
  def change
    create_table :temas do |t|
      t.string :nome

      t.timestamps
    end
  end
end
