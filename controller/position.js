const positionMap = new Map();

exports.setPosition = async (ctx) => {
    try {
        const {
            latitude,
            longitude,
            uuid,
            title,
        } = ctx.request.body;
        const clientIp = ctx.ip.replace(/[:f]/g, '');
        positionMap.set(uuid, {
            latitude,
            longitude,
            clientIp,
            title,
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
    for ([uuid, value] of positionMap.entries()) {
        const {
            longitude,
            latitude,
            clientIp,
            title
        } = value;
        savedLocation.push({
            longitude,
            latitude,
            clientIp,
            title
        })
    }

    ctx.body = {
        code: "1000",
        message: "success",
        data: savedLocation
    };
}