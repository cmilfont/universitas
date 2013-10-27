class InscricoesController < ApplicationController

  respond_to :html

  # POST turma/1/inscricoes
  def create
    @inscricao = Inscricao.create turma_id: params[:turma_id], aluno_id: aluno_ativo.id
    redirect_to  @inscricao.segue_pagamento
  end  # /create

  private

    def aluno_ativo
      Aluno.first
    end  # /aluno_ativo

end  # /InscricoesController
