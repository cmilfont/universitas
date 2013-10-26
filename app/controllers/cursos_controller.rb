class CursosController < ApplicationController
  
  respond_to :html, :json
  
  def new
    @curso = Curso.new
  end
  
  def create
    @curso = Curso.create params
    respond_with @curso
  end
  
end