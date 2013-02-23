class RoadClosuresController < ApplicationController
  def index
    @roads = RoadClosure.all
    render :json => @roads
  end
end
