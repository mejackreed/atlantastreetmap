class RoadClosuresController < ApplicationController
  def index
    @roads = RoadClosure.all

    headers['Access-Control-Allow-Origin'] = "*"
    render :json => @roads
  end

  def show
    @road = RoadClosure.find_by_id(params[:id])
    render 'main/index'
  end
end
