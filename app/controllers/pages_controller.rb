class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    @projects = Project.all
    @tags = Tag.all
    @categories = Category.all
  end

  def dashboard
    @projects = Project.all
    @tags = Tag.all
    @categories = Category.all
  end

end
