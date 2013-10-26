class Turma < ActiveRecord::Base
  has_many :datas, :class_name => "DataTurma"

  validates :datas, :presence => true

  accepts_nested_attributes_for :datas, :allow_destroy => true
end  # /Turma
