require 'spec_helper'

describe Inscricao do
  
  describe "Relacionamentos" do
    it { should belong_to :aluno }
  end  # /Relacionamentos

  describe "Validações" do
  end  # /Validações
  
end  # /Inscricao
