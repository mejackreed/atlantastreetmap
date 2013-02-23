class RoadClosuresController < ApplicationController
  def index
    @roads = RoadClosure.all
    respond_to do |format|
      format.json { render :json => @roads }
    end
  end
end
