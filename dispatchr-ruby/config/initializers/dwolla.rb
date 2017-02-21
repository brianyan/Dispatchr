# config/initializers/dwolla.rb
require 'dwolla_v2'

$dwolla = DwollaV2::Client.new(key: "JeXCrq3oN7ELpIWyAnB7TQqvfZWUU8hnOkLRvERr8B76vqJqsr", secret: "yEp8Uu0fOdBLbIPfulBBBZ792jxDJFQae2oWewaT2Ro5W6rist") do |config|
  config.environment = :sandbox
  config.on_grant do |token|
  	TokenData.create! token
  end
end

# create an application token if one doesn't already exist
begin
  TokenData.fresh_token_by! account_id: nil
rescue ActiveRecord::RecordNotFound => e
  $dwolla.auths.client # this gets saved in our on_grant callback
end

# create an account token if one doesn't already exist
begin
  TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
rescue ActiveRecord::RecordNotFound => e
  TokenData.create! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164",
                    refresh_token: "0tQPXeU90RPRdbQm9mbNf6WfMIRaByMp4cRV0g71PLzzLhZdvv",
                    expires_in: -1
end