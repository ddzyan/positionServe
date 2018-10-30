const positionMap = new Map();

exports.setPosition = async (ctx) => {
    try {
        const {
            latitude,
            longitude
        } = ctx.request.body;
        positionMap.set(ctx.ip, {
            latitude,
            longitude,
            createdAt: Date.now()
        });
        ctx.body = {
            code: "1000",
            message: "success",
            data: {
                latitude,
                longitude
            }
        };
    } catch (error) {
        throw error;
    }
}

exports.getPositions = async (ctx) => {
    const savedLocation = [];
    for ([key, value] of positionMap.entries()) {
        const {
            longitude,
            latitude,
        } = value;
        key = key.replace(/[:f]/g, '');
        savedLocation.push({
            longitude,
            latitude,
        })
    }

    ctx.body = {
        code: "1000",
        message: "success",
        data: savedLocation
    };
}