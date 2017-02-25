ActiveSupport::Inflector.inflections(:en) do |inflect|
  # If you don't add this, Rails will name your model TokenDatum
  # when you run the command in generate_model.sh
  inflect.irregular "data", "data"
end