class MainsController < ApplicationController
  # GET /mains
  # GET /mains.json
  def index
    @mains = Main.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @mains }
    end
  end

  # GET /mains/1
  # GET /mains/1.json
  def show
    @main = Main.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @main }
    end
  end

  # GET /mains/new
  # GET /mains/new.json
  def new
    @main = Main.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @main }
    end
  end

  # GET /mains/1/edit
  def edit
    @main = Main.find(params[:id])
  end

  # POST /mains
  # POST /mains.json
  def create
    @main = Main.new(params[:main])

    respond_to do |format|
      if @main.save
        format.html { redirect_to @main, notice: 'Main was successfully created.' }
        format.json { render json: @main, status: :created, location: @main }
      else
        format.html { render action: "new" }
        format.json { render json: @main.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /mains/1
  # PUT /mains/1.json
  def update
    @main = Main.find(params[:id])

    respond_to do |format|
      if @main.update_attributes(params[:main])
        format.html { redirect_to @main, notice: 'Main was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @main.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mains/1
  # DELETE /mains/1.json
  def destroy
    @main = Main.find(params[:id])
    @main.destroy

    respond_to do |format|
      format.html { redirect_to mains_url }
      format.json { head :no_content }
    end
  end
end
