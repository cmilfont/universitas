require 'spec_helper'

describe Curso do
  
  describe "Relacionamentos" do
    it { should belong_to :instrutor }
    it { should belong_to :tema }
  end

  describe "Validações" do
    it { should validate_presence_of :titulo }
    it { should validate_presence_of :descricao }
    it { should validate_presence_of :metodologia }
    it { should validate_presence_of :ementa }
    it { should validate_presence_of :carga_horaria }
    it { should validate_presence_of :valor }
    it { should validate_presence_of :link_pagamento }
  end
  
end