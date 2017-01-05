module.exports = function (data) {
  const { content, properties } = data;
  const payload = JSON.parse(data.toString());
  console.log(payload);
}
