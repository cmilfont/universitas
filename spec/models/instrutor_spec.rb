require 'spec_helper'

describe Instrutor do

  describe "Validações" do
    it { should validate_presence_of :nome }
  end

end
