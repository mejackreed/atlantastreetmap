class RoadClosure < ActiveRecord::Base
  attr_accessible :description, :end_of_closure, :latitude, :longitude, :road_closed, :road_closed_from, :road_closed_to, :start_of_closure, :type
end
