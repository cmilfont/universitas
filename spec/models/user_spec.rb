require 'spec_helper'

describe User do

  describe "#avatar" do
    it { should have_attached_file(:avatar) }
    it { should validate_attachment_presence(:avatar) }
    it { should validate_attachment_content_type(:avatar).
                  allowing('image/png', 'image/jpeg').
                  rejecting('text/plain', 'text/xml') }
    it { should validate_attachment_size(:avatar).
                  in(0..5.megabytes) }
  end


  describe  ".find_for_facebook_oauth" do

    subject { User }
    let(:user) { FactoryGirl.build :user }
    let(:access_token) {

      {
        :provider => 'facebook',
        :uid => '123545',
        'extra' => {
          'raw_info' => {
            'name' => "Teste Nome",
            'email' => "joesmith@gmail.coa"
          }
        },
        'credentials' => {'token' => "meu_cratim"}
      }

    }

    context "Quando usuario existe" do

      it "Devolve um user já cadastrado" do
        User.should_receive(:find_by_email).once.with(anything).and_return user
        User.find_for_facebook_oauth access_token
      end

    end

    context "Quando usuario não existe" do

      it "Cria um novo usuário com base nos dados do provider" do
        User.should_receive(:find_by_email).once.with(anything).and_return nil
        User.should_receive(:create).once.with(anything).and_return user
        User.find_for_facebook_oauth access_token
      end

    end

  end

end
