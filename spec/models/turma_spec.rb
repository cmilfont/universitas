require 'spec_helper'

describe Turma do
  describe "Validações" do
    it { should validate_presence_of :datas }
  end
end
