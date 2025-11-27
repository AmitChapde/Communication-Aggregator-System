const { v4: uuid } = require('uuid');  // import UUID
const validate = require('../utils/validator');
const publish = require('../rabbit/publisher');
const logger = require('../utils/logger');

exports.handleMessage = async (req, res) => {
    const body = req.body;

    // ✅ Auto-generate messageId if missing
    if (!body.messageId) {
        body.messageId = uuid();
    }

    // Validate the request after ensuring messageId exists
    const error = validate(body);
    if (error) return res.status(400).json({ error });

    const queue = `${body.channel}_queue`;

    await publish(queue, body);

    logger("ROUTED", body);

    res.json({
        status: "Message routed",
        queue,
        messageId: body.messageId  // return the generated or existing ID
    });
};
