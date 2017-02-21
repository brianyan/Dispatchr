FactoryGirl.define do
  factory :payment do
    user_id 1
    customer "MyString"
    funding_source "MyString"
    routing_number "MyString"
    account_number "MyString"
    type ""
    account_name "MyString"
  end
end
