FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "usern_#{n}@user.com"}
    password "147/258*369"
  end
end