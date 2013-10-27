FactoryGirl.define do
   factory :inscricao do
      pago false

      association :aluno
      association :turma
   end  # /inscricao
end
