# config/initializers/dwolla.rb
require 'dwolla_v2'

if ActiveRecord::Base.connection.table_exists? 'token_data'
  $dwolla = DwollaV2::Client.new(key: "JeXCrq3oN7ELpIWyAnB7TQqvfZWUU8hnOkLRvERr8B76vqJqsr", secret: "yEp8Uu0fOdBLbIPfulBBBZ792jxDJFQae2oWewaT2Ro5W6rist") do |config|
    config.environment = :sandbox
    config.on_grant do |token|
    	TokenData.create! token
    end
  end
end


# create an application token if one doesn't already exist
if ActiveRecord::Base.connection.table_exists? 'token_data'
  begin
    TokenData.fresh_token_by! account_id: nil
  rescue ActiveRecord::RecordNotFound => e
    $dwolla.auths.client # this gets saved in our on_grant callback
  end
end

# create an account token if one doesn't already exist
if ActiveRecord::Base.connection.table_exists? 'token_data'
  begin
    TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
  rescue ActiveRecord::RecordNotFound => e
    TokenData.create! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164",
                      refresh_token: "PEXmPrX1LixnGNn8khtS86UGQgRBbUNUpGiUQogd05l8FZl86X",
                      expires_in: -1
  end
end