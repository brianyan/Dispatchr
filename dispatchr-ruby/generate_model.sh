rails generate model TokenData \
  encrypted_access_token \
  encrypted_access_token_iv \
  encrypted_refresh_token \
  encrypted_refresh_token_iv \
  expires_in:integer \
  scope \
  account_id