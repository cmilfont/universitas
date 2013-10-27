FactoryGirl.define do
  
  factory :curso do
    #titulo "Anaconda Choke"
  end

  factory :curso_product_on_rails, class: Curso do
    titulo "Product On Rails"
    descricao "Curso legal"
    metodologia "boa"
    ementa "tudo"
    carga_horaria "200"
    valor "300"
    link_pagamento "paypal.com"

    after(:build) do |f|
			f.instrutor_id = Instrutor.create(nome: "Milfont").id
			f.tema_id = Tema.create(nome: "Rails").id
		end
  end

end