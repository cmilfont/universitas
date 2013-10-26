class CreateInstrutors < ActiveRecord::Migration
  def change
    create_table :instrutors do |t|
      t.string :nome

      t.timestamps
    end
  end
end
