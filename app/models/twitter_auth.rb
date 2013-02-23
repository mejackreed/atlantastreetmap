class TwitterAuth < ActiveRecord::Base
  attr_accessible :consumer_key, :consumer_secret, :oauth_token, :oauth_token_secret
end
