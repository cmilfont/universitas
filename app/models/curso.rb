class Curso < ActiveRecord::Base
  
  belongs_to :tema
  belongs_to :instrutor
  
  validates_presence_of :titulo
  validates_presence_of :descricao
  validates_presence_of :metodologia
  validates_presence_of :ementa
  validates_presence_of :carga_horaria
  validates_presence_of :valor
  validates_presence_of :link_pagamento
  
end