json.extract! request_item, :id, :created_at, :updated_at
json.url request_item_url(request_item, format: :json)