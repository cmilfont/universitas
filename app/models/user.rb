class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
    @email = access_token['extra']['raw_info']['email']
    @facebook_data = mapear_facebook access_token
    unless @user = User.find_by_email( @email.force_encoding("UTF-8") )
      @user = User.create :email => @email.force_encoding("UTF-8"), :password => Devise.friendly_token[0,20]
    end
    #@user.try(:profile).try(:update_attributes, @facebook_data)
    @user
  end

  private

  def self.mapear_facebook access_token
    @data = access_token['extra']['raw_info']
    return {
      :facebook_id => access_token['uid'],
      :token_facebook => access_token['credentials']['token'],
      :picture_facebook_square => "http://graph.facebook.com/#{access_token['uid']}/picture?type=square",
      :picture_facebook_small => "http://graph.facebook.com/#{access_token['uid']}/picture?type=small",
      :picture_facebook_normal => "http://graph.facebook.com/#{access_token['uid']}/picture?type=normal",
      :picture_facebook_large => "http://graph.facebook.com/#{access_token['uid']}/picture?type=large",
      :link_facebook => @data["link"],
      :location => @data['location'].present? ?  @data['location']['name'] : "",
      :name => @data['name'].force_encoding("ISO-8859-1").force_encoding("UTF-8"),
      :locale => @data['locale'],
      :login => @data['username']
    }
  end


end
