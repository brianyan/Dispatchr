class ItemsController < ApplicationController

  before_action :authenticate_request!

  def bad_name
    error_str = 'No item name entered or name is invalid. Please try a valid name and try again'
    render json: error_str, status: :unprocessable_entity
  end

  # GET
  def index
    render json: Item.all
  end

  # GET
  def show
    if params[:id].present?
      item_id = params[:id]
      item = Item.find(item_id)

      if item.present?
        render json: item
      else
        render json: item.errors, status: :unprocessable_entity
      end

    else
      error_str = "No/Invalid item ID entered"
      render json: error_str, status: :unprocessable_entity
    end
  end

  # POST
  def create
    if params[:name].present?
      item_name = params[:name]
      item = Item.new(name: item_name)

      if item.save
        render json: item
      else
        render json: item.errors, status: :unprocessable_entity
      end

    else
        bad_name
    end
  end

  # PATCH/PUT
  def update
    if params[:id].present? && params[:name].present?
      item = Item.find(params[:id])
      item.name = params[:name]
      if item.save
        render json: item
      else
        bad_name
      end
    else
      bad_name
    end
  end

  # DELETE
  def destroy
    if params[:id].present?
      item = Item.find(params[:id])
      render status: 200, json: item.destroy
    else
      error_str = 'Invalid item ID. Try again.'
      render json: error_str, status: :unprocessable_entity
    end
  end


end
