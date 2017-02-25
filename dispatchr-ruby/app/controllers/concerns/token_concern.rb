module TokenConcern
  extend ActiveSupport::Concern

  private

  def account_token
    @account_token ||= TokenData.fresh_token_by! account_id: "4661e311-a4ff-46ee-8e51-baf725f67164"
    #usage: account_token.get "customers"
  end

  def app_token
    @app_token ||= TokenData.fresh_token_by! account_id: nil
  end
end