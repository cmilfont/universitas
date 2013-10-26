require 'spec_helper'

describe Tema do
  
  describe "Validações" do
    it { should validate_presence_of :nome }
  end
  
end
