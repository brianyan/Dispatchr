class Notification < ApplicationRecord
	validates :user_id, presence: true
	validates :message, presence: true
end
