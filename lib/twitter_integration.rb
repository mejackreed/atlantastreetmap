module TwitterIntegration
  def self.init(config)
    Twitter::Client.new(consumer_key: config.consumer_key,
                        consumer_secret: config.consumer_secret,
                        oauth_token: config.oauth_token,
                        oauth_token_secret: config.oauth_token_secret)
  end

  def self.update(twitter, message)
    twitter.update(message)
  end
end
