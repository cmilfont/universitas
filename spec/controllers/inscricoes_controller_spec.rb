# encoding: UTF-8
require 'spec_helper'

describe InscricoesController do

  describe "POST create" do
    let(:inscricao) {
      FactoryGirl.build :inscricao, id: 2
    }

    before :each do
        @aluno = mock_model(Aluno, id: 1)
        controller.stub(:aluno_ativo).and_return(@aluno)
    end

    it "Cria a Inscrição" do
      params = inscricao.attributes.slice('turma_id', 'pago').merge('aluno_id' => @aluno.id)
      Inscricao.any_instance.stub(:aluno).and_return(@aluno)
      Inscricao.should_receive(:create).once.with(params).and_return(inscricao)
      post :create, inscricao: params.slice('turma_id', 'pago')
    end

    context 'com perfil completo' do
      it 'Rediciona para Realizar Pagamento' do
        params = inscricao.attributes
        Inscricao.any_instance.stub_chain(:aluno,:completo?).and_return(true)
        Inscricao.any_instance.stub_chain(:curso, :link_pagamento).and_return(inscricoes_path)
        post :create, inscricao: params
        expect(response).to redirect_to(inscricao.curso.link_pagamento)
      end
    end  # /perfil completo
    context 'com perfil incompleto' do
      it 'Rediciona o perfil do aluno' do
        Inscricao.any_instance.stub(:aluno).and_return(@aluno)
        inscricao.stub_chain(:curso, :link_pagamento).and_return(inscricoes_path)

        post :create, inscricao: inscricao.attributes
        expect(response).to redirect_to(inscricao.aluno)
      end
    end  # /perfil incompleto
  end  # /#create

end  # /InscricoesController
