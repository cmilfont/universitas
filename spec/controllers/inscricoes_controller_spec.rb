require 'spec_helper'

describe InscricoesController do

  describe "POST create" do
    let(:inscricao) { FactoryGirl.build :inscricao, id: 2 }
    let(:aluno) { mock_model(Aluno, id: 15) }
    let(:turma) { mock_model(Turma, id: 5) }
    let(:params) {
      {
        turma_id: turma.id.to_s,
        aluno_id: aluno.id
      }
    }

    before :each do
      controller.stub(:aluno_ativo).and_return aluno
    end

    it "Cria a Inscrição" do
      inscricao.should_receive(:segue_pagamento).once.and_return ""
      Inscricao.should_receive(:create).once.with(params).and_return inscricao
      post :create, turma_id: turma.id
    end

  end  # /#create

end  # /InscricoesController
