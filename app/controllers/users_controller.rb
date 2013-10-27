class UsersController < ApplicationController

  respond_to :html

  def edit
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    @user.update_attributes params.require(:user)
    respond_with @user
  end

end
