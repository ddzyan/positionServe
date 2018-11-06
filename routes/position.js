const router = require("koa-router")();

const position = require("../controller/position");

router.post('/position', position.setPosition);
router.get('/positions', position.getPositions);
router.del('/positions', position.delPositions);
router.del('/allPositions', position.clearPositions);
router.get('/', async (ctx, next) => {
    await ctx.render('index');
})

module.exports = router;