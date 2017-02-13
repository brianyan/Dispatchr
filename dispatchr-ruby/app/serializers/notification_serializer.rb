class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :message, :created_at
end
