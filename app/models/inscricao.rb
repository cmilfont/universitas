class Inscricao < ActiveRecord::Base
  belongs_to :aluno
  belongs_to :turma
  has_one :curso, through: :turma

  def segue_pagamento
    aluno.perfil_completo? ? curso.link_pagamento : aluno
  end

end
