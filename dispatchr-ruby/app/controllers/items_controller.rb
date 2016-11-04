class ItemsController < ApplicationController
  def index
    render json: Item.all
  end

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
        error_str = 'No item name entered or name is invalid. Please try a valid name and try again'
        render json: error_str, status: :unprocessable_entity
    end
  end

  def update
    if params[:id].present? && params[:name].present?
      item = Item.find(params[:id])
      item.name = params[:name]
      if item.save
        render json: item
      else
        error_str = 'No item name entered or name is invalid. Please try a valid name and try again'
        render json: error_str, status: :unprocessable_entity
      end
    else
      error_str = 'No item name entered or name is invalid. Please try a valid name and try again'
      render json: error_str, status: :unprocessable_entity
    end
  end

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
