require 'spec_helper'

describe Inscricao do
  
  describe "Relacionamentos" do
    it { should belong_to :aluno }
  end  # /Relacionamentos

  describe "Validações" do
  end  # /Validações


  describe "#segue_pagamento" do

    let(:inscricao) { FactoryGirl.build(:inscricao) }
    let(:link) { "http://paypal.com" }

    context 'Quando tem perfil completo' do

      before do
        inscricao.stub_chain(:curso, :link_pagamento).and_return link
        Aluno.any_instance.should_receive(:perfil_completo?).and_return true
      end

      it 'Retorna o link de pagamento do curso' do
        expect(inscricao.segue_pagamento).to match(link)
      end
    end  # /perfil completo

    context 'Quando o perfil está incompleto' do

      before do
        Aluno.any_instance.should_receive(:perfil_completo?).and_return false
      end

      it 'Retorna o aluno para indicar que precisa completar o perfil' do
        expect(inscricao.segue_pagamento).to eq(inscricao.aluno)
      end

    end  # /perfil incompleto

  end
  
end  # /Inscricao