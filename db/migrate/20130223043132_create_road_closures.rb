class CreateRoadClosures < ActiveRecord::Migration
  def change
    create_table :road_closures do |t|
      t.float :latitude
      t.float :longitude
      t.string :type
      t.date :start_of_closure
      t.date :end_of_closure
      t.string :road_closed
      t.string :road_closed_from
      t.string :road_closed_to
      t.text :description

      t.timestamps
    end
  end
end
