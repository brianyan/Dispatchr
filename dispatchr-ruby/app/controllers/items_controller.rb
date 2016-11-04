class ItemsController < ApplicationController
  def index
    render json: Item.all
  end

  def show

  end

  def create
    item_name = params[:name]
    item = Item.create(name: item_name)
    render json: item
  end


end
