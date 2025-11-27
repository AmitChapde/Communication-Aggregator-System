const channels = ["email", "sms", "whatsapp"];

module.exports = function(body) {
    if (!body.messageId) return "Missing messageId";
    if (!body.channel) return "Missing channel";

    if (!channels.includes(body.channel)) return "Invalid channel";

    if (!body.payload) return "Missing payload";
    if (!body.payload.to) return "Missing payload.to";
    if (!body.payload.message) return "Missing payload.message";

    return null;
};
