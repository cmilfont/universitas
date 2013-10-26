class DataTurma < ActiveRecord::Base
	belongs_to :turma

	validates :data , :presence => true
end
