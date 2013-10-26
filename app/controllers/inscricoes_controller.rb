class InscricoesController < ApplicationController

  respond_to :html

  def create
    @inscricao = Inscricao.create inscricao_params.merge(aluno_id: aluno_ativo.id)
    if @inscricao.try(:aluno).try(:completo?)
      redirect_to @inscricao.try(:curso).try(:link_pagamento)
    else
      redirect_to @inscricao.try(:aluno)
    end
  end

  private

    def inscricao_params
      params.require(:inscricao).permit(:pago, :turma_id)
    end

    def aluno_ativo

    end
end  # /InscricoesController
