require "jwt"

class Authentication::JsonWebToken
  def self.encode(payload, expiration = 1000.days.from_now)
    payload = {
      'user_id' => payload,
      'exp' => expiration.to_i
    }
    JWT.encode(payload, Rails.application.secrets.json_web_token_secret)
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.secrets.json_web_token_secret).first
  end
end
