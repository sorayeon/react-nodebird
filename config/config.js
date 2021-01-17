const prod = process.env.NODE_ENV === 'production';
module.exports = {
  backendUrl: prod ? 'http://api.sorayeon.shop' : 'http://localhost:3065',
};
