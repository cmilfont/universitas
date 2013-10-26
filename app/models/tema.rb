class Tema < ActiveRecord::Base
  validates_presence_of :nome
end