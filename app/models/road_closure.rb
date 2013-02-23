class RoadClosure < ActiveRecord::Base
  require 'twitter_integration'
  attr_accessible :description, :end_of_closure, :latitude, :longitude, :road_closed, :road_closed_from, :road_closed_to, :start_of_closure, :type

  after_create :tweet_closure

  private
  def tweet_closure
    message =  "#{road_closed} from #{road_closed_from} to #{road_closed_to}, closed until #{human_time_string} "
    # XXX Don't have time to fix
    # TODO Fix this to be sane
    message += Rails.application.routes.url_helpers.road_closure_url(id, host: 'atlantastreetmap.herokuapp.com')

    t = TwitterIntegration.init(TwitterAuth.first)
    resp = TwitterIntegration.update(t, message)

    self.tweet_id = resp.attrs[:id]
  end

  def human_time_string
    end_of_closure.strftime('%b %d, %Y')
  end
end
