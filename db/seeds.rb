# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'factory_girl'
Dir[Rails.root.join("#{Rails.root}/spec/factories/**/*.rb")].each {|f| require f}

# Instrutor.create :nome => "Christiano Milfont"
# Tema.create :nome => "Template azul"

Aluno.create nome: 'Aluno'

curso = FactoryGirl.create :curso_product_on_rails
FactoryGirl.create :turma_product_on_rails, curso_id: curso.id
