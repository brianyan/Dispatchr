require "rails_helper"

RSpec.describe RequestItemsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/request_items").to route_to("request_items#index")
    end

    it "routes to #show" do
      expect(:get => "/request_items/1").to route_to("request_items#show", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/request_items").to route_to("request_items#create")
    end

    it "routes to #update" do
      expect(:put => "/request_items/1").to route_to("request_items#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/request_items/1").to route_to("request_items#destroy", :id => "1")
    end

  end
end
