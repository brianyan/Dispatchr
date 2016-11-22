class RequestItemsController < ApplicationController
  before_action :set_request_item, only: [:show, :update, :destroy]

  # GET /request_items
  # GET /request_items.json
  def index
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
    @request_item.item = Item.new(name: params[:request_item][:item][:name])

    if @request_item.save
      render json: @request_item 
    else
      render json: @request_item.errors, status: :bad_request
    end
  end

  # PATCH/PUT /request_items/1
  # PATCH/PUT /request_items/1.json
  def update

    #update the item of request_item
    if (params[:request_item].present?)
      @request_item.item = params[:request_item][:item].present? ? Item.new(name: params[:request_item][:item][:name]) : @request_item.item
    end
    #update all other parameters
    if @request_item.update(request_item_params)
      render json: @request_item
    else
      render json: @request_item.errors, status: :bad_request
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
      #this enforces strong parameters
      params.fetch(:request_item, {}).permit(:request_id, :max_price, :quantity_description, :item)
    end
end
