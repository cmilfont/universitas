# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131026174923) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cursos", force: true do |t|
    t.integer  "instrutor_id"
    t.integer  "tema_id"
    t.string   "titulo"
    t.text     "descricao"
    t.text     "metodologia"
    t.text     "ementa"
    t.string   "carga_horaria"
    t.string   "valor"
    t.string   "link_pagamento"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "datas_turma", force: true do |t|
    t.date     "data"
    t.integer  "turma_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "instrutors", force: true do |t|
    t.string   "nome"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "temas", force: true do |t|
    t.string   "nome"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "turmas", force: true do |t|
    t.string   "curso_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
