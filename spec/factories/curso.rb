FactoryGirl.define do
  
  factory :curso do
  end

  factory :curso_product_on_rails, class: Curso do
    titulo "Product On Rails"
    descricao "Curso legal"
    metodologia "boa"
    ementa "tudo"
    carga_horaria "200"
    valor "300"
    link_pagamento "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GM9CJF3KD99NC"

    after(:build) do |f|
			f.instrutor_id = Instrutor.create(nome: "Milfont").id
			f.tema_id = Tema.create(nome: "Rails").id
		end
  end

end