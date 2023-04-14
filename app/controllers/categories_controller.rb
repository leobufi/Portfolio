class CategoriesController < ApplicationController
  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    @category.update(category_params)
    redirect_to dashboard_path
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    redirect_to dashboard_path
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
