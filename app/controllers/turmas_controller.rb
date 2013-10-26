class TurmasController < ApplicationController
  
	respond_to :html

  def new
  	@turma = Turma.new(datas: [DataTurma.new])
  	#@turma.datas << DataTurma.new
  end

  def create
  	@turma = Turma.create turma_params
  	respond_with @turma
  end

  def show
  	Turma.find(params[:id])
  end
  
  private
  	def turma_params
    	params.require(:turma).permit(:curso_id, datas_attributes: [:data])
		end


end
