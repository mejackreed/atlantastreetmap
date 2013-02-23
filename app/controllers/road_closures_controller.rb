class RoadClosuresController < ApplicationController
  def index
    @roads = RoadClosure.all

    headers['Access-Control-Allow-Origin'] = "*"
    render :json => @roads
  end

  def show
    render 'main/index'
  end
end
