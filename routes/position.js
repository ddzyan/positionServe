const router = require("koa-router")();

const position = require("../controller/position");

router.post('/position', position.setPosition);

module.exports = router;