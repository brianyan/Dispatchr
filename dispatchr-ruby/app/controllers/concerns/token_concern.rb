module TokenConcern
  extend ActiveSupport::Concern

  private

  def account_token
    @account_token ||= TokenData.fresh_token_by! account_id: ENV["DWOLLA_ACCOUNT_ID"]
  end

  def app_token
    @app_token ||= TokenData.fresh_token_by! account_id: nil
  end
end