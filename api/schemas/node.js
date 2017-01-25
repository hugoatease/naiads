const Schema = require('mongoose').Schema;

const Node = new Schema({
  home_id: Number,
  node_id: Number,
  last_seen: Date,
  manufacturer_id: Number,
  product_id: Number,
  product_type: Number,
  manufacturer: String,
  product: String,
  type: String,
  name: String,
  loc: String
});

Node.index({ home_id: 1 });
Node.index({ home_id: 1, node_id: 1 });

module.exports = mongoose.model('Node', Node);
