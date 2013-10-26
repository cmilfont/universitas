class CursosController < ApplicationController
  
  respond_to :html, :json
  
  def new
    @curso = Curso.new
  end
  
  def show
    @curso = Curso.find params[:id]
    respond_with @curso
  end
  
  def create
    @curso = Curso.create params.require(:curso).permit!
    respond_with @curso
  end
  
end