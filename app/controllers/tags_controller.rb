class TagsController < ApplicationController

  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.new(tag_params)
    category_params = params[:tag][:categories]
    category_params.delete("")
    categories = Category.find(category_params)
    @tag.categories << categories
    name = []
    name << categories.map { |c| c.name }
    @tag.category = name[0][0]
    if @tag.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
      if @tag.categories.empty?
        category_params = params[:tag][:categories]
        category_params.delete("")
        categories = Category.find(category_params)
        @tag.categories << categories
        name = []
        name << categories.map { |c| c.name }
        @tag.category = name[0][0]
      else
        tag_categories = JointCategory.where(tag_id: params[:id])
        tag_categories.destroy_all
        category_params = params[:tag][:categories]
        category_params.delete("")
        categories = Category.find(category_params)
        @tag.categories << categories
        name = []
        name << categories.map { |c| c.name }
        @tag.category = name[0][0]
      end
    @tag.update(tag_params)
    redirect_to dashboard_path
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    redirect_to dashboard_path
  end

  private

  def tag_params
    params.require(:tag).permit(:name, :rate)
  end
end
