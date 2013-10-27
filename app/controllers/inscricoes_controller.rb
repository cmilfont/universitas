class InscricoesController < ApplicationController

  respond_to :html

  # POST turma/1/inscricoes
  def create
    @inscricao = Inscricao.create( turma_id: create_params[:turma_id], aluno_id: aluno_ativo.id)
    if @inscricao.try(:aluno).try(:perfil_completo?)
      redirect_to @inscricao.curso.try(:link_pagamento)
    else
      redirect_to @inscricao.try(:aluno)
    end
  end  # /create

  private

    # def inscricao_params
    #   params.require(:inscricao).permit(:pago, :turma_id)
    # end

    def aluno_ativo
      Aluno.first
    end  # /aluno_ativo

    def create_params
      params.permit(:turma_id)
    end

end  # /InscricoesController
