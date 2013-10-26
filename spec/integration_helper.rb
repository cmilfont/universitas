require 'spec_helper'

require 'capybara/rspec'
require 'capybara/rails'

Capybara.configure do |config|
  config.ignore_hidden_elements = true
  config.default_selector = :css
  config.default_wait_time = 10
end

RSpec.configure do |config|
  config.include Capybara::DSL, :type => :request
  config.use_transactional_fixtures = false
end