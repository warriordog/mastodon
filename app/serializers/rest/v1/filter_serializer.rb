# frozen_string_literal: true

class REST::V1::FilterSerializer < ActiveModel::Serializer
  attributes :id, :phrase, :context, :whole_word, :expires_at,
             :irreversible

  delegate :expires_at, to: :custom_filter

  def context
    CustomFilter.legacy_context(object.context)
  end

  def id
    object.id.to_s
  end

  def phrase
    object.keyword
  end

  def irreversible
    custom_filter.irreversible?
  end

  private

  def custom_filter
    object.custom_filter
  end
end
