const axios = require('axios');


module.exports = async function(type, message) {
try {
await axios.post('http://localhost:3003/log', {
timestamp: new Date(), type, message
});
} catch {
console.log("Log svc down");
}
};