const prod = process.env.NODE_ENV === 'production';
module.exports = {
  backendUrl: prod ? 'http://3.36.99.161' : 'http://localhost:3065',
};
