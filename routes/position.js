const router = require("koa-router")();

const position = require("../controller/position");

router.post('/position', position.setPosition);
router.get('/positions', position.getPositions);
router.get('/', async (ctx, next) => {
    await ctx.render('index');
})

module.exports = router;