class ProjectsController < ApplicationController

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    tag_params = params[:project][:tags]
    tag_params.delete("")
    tags = Tag.find(tag_params)
    @project.tags << tags
    if @project.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    if @project.tags.empty?
      tag_params = params[:project][:tags]
      tag_params.delete("")
      tags = Tag.find(tag_params)
      @project.tags << tags
    else
      project_tags = Joint.where(project_id: params[:id])
      project_tags.destroy_all
      tag_params = params[:project][:tags]
      tag_params.delete("")
      tags = Tag.find(tag_params)
      @project.tags << tags
    end
    @project.update(project_params)
    redirect_to dashboard_path
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    redirect_to dashboard_path
  end

  private

  def project_params
    params.require(:project).permit(:name, :year, :tags, :link, photos: [])
  end
end
