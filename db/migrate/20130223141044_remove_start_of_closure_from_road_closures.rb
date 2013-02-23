class RemoveStartOfClosureFromRoadClosures < ActiveRecord::Migration
  def up
    remove_column :road_closures, :start_of_closure
  end

  def down
    add_column :road_closures, :start_of_closure, :date
  end
end
