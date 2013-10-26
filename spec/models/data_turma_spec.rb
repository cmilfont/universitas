require 'spec_helper'

describe DataTurma do
  describe "Validações" do
    it { should validate_presence_of :data }
  end
end
