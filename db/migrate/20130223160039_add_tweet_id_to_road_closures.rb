class AddTweetIdToRoadClosures < ActiveRecord::Migration
  def change
    add_column :road_closures, :tweet_id, :string
  end
end
