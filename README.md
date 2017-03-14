# Dispatchr
Dispatcher enables consumers to receive any item from local businesses, saving them time and providing additional convenience 

# Usage
For clientside app (iOS):
- npm install
- react-native run-ios

For backend API:
If running locally:
- bundle install
- rails s

Otherwise, you can deploy to Heroku and use that public endpoint instead of the local server.

# Files
## dispatchr-ruby/
- This is the directory for the API we built with Rails 5.0
- Most of the endpoints and logic is within /app/controllers
- DB migrations are in /db/migrate
- Models (with associations) are in /app/models
