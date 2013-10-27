FactoryGirl.define do

  factory :turma_product_on_rails, class: Turma do
		curso_id "1"
		
		after(:build) do |f|
			f.datas << DataTurma.new(data: Date.today)
		end
  end

  factory :turma do
    association :curso, factory: :curso_product_on_rails
    after(:build) do |f|
      f.datas << DataTurma.new(data: Date.today)
    end
  end

end