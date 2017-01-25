const Schema = require('mongoose').Schema;
const { Mixed } = Schema.Types;

const Value = new Schema({
  home_id: Number,
  node_id: Number,
  value_id: String,
  class_id: Number,
  last_seen: Date,
  type: String,
  genre: String,
  instance: Number,
  index: Number,
  label: String,
  units: String,
  help: String,
  read_only: Boolean,
  write_only: Boolean,
  min: Mixed,
  max: Mixed,
  is_polled: Boolean,
  values: [Mixed],
  value: Mixed
});

Value.index({ home_id: 1 });
Value.index({ home_id: 1, node_id: 1 });
Value.index({ home_id: 1, node_id: 1, value_id: 1 });

module.exports = mongoose.model('value', Value);
