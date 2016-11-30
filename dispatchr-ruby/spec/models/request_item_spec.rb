require 'rails_helper'

RSpec.describe RequestItem, :type => :model do
  context "create list of request items" do
    it "should create a list of request items from the given parameters" do
      json = [
        {
				    max_price: 10,
			      quantity_description: "3",
				    name: "Candy"
        },
        {
				    max_price: 13,
			      quantity_description: "9",
				    name: "Pizza"
        }
      ]
      request_items = RequestItem.create_from_list(json)
      expect(request_items.first.max_price).to eq 10
      expect(request_items.first.quantity_description).to eq "3"
      expect(request_items.first.item.name).to eq "Candy"

      expect(request_items.last.max_price).to eq 13
      expect(request_items.last.quantity_description).to eq "9"
      expect(request_items.last.item.name).to eq "Pizza"
    end
  end
end
