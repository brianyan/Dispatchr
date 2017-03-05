class StoresController < ApplicationController
  before_action :authenticate_request!
  before_action :set_store, only: [:show, :update, :destroy]

  # GET /stores
  def index
    @stores = Store.all
    render json: @stores
  end

  # GET /stores/1
  def show
    render json: @store
  end

  # POST /stores
  def create
    @store = Store.new(store_params)

    if @store.save
      render :show, status: :created, location: @store
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # POST /stores/hotspot/
  # {"latitude" : 111,
  #  "longitude": 111}
  def hotspot
    in_range = Store.find_nearest_store(params[:latitude], params[:longitude])
    requests = []

    if (in_range != -1)
      requests = Request.find_nearest_requests(@current_user.address.latitude, @current_user.address.longitude)
    end

    render json: requests
  end

  # PATCH/PUT /stores/1
  def update
    if @store.update(store_params)
      render :show, status: :ok, location: @store
    else
      render json: @store.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stores/1
  def destroy
    @store.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_store
      @store = Store.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def store_params
      params.require(:store).permit!
    end
end
