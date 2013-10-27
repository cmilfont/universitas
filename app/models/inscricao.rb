class Inscricao < ActiveRecord::Base
  belongs_to :aluno
  belongs_to :turma
  has_one :curso, through: :turma
end
