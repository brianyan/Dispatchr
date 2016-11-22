class RequestItemsController < ApplicationController
  before_action :set_request_item, only: [:show, :update, :destroy]

  # GET /request_items
  # GET /request_items.json
  def index
    # @request_items = RequestItem.all
    render json: RequestItem.all
  end

  # GET /request_items/1
  # GET /request_items/1.json
  def show
    render json: @request_item
  end

  # POST /request_items
  # POST /request_items.json
  def create
    @request_item = RequestItem.new(request_item_params)
    @request_item.item = Item.new(name: params[:item][:name])

    if @request_item.save
      #render :show, status: :created, location: @request_item
      render json: @request_item 
    else
      render json: @request_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /request_items/1
  # PATCH/PUT /request_items/1.json
  def update
    @request_item.item = params[:item].present? ? Item.new(name: params[:item][:name]) : @request_item.item
    if @request_item.update(request_item_params)
      render :show, status: :ok, location: @request_item
    else
      render json: @request_item.errors, status: :unprocessable_entity
    end

  end

  # DELETE /request_items/1
  # DELETE /request_items/1.json
  def destroy
    render status: 200, json: @request_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_request_item
      @request_item = RequestItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def request_item_params
      params.fetch(:request_item, {})
      params.require(:request_item).permit(:id, :request_id, :max_price, :quantity_description, :item)
    end
end
