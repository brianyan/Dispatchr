FactoryGirl.define do
  factory :token_data do
    encrypted_access_token "MyString"
    encrypted_access_token_iv "MyString"
    encrypted_refresh_token "MyString"
    encrypted_refresh_token_iv "MyString"
    expires_in 1
    scope "MyString"
    account_id "MyString"
  end
end
