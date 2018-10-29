
const positionMap = new Map();

exports.setPosition = async (ctx) => {
    try {
        const { latitude, longitude } = ctx.request.body;
        positionMap.set(ctx.ip, {
            latitude,
            longitude,
            createdAt: Date.now()
        });
        ctx.body = {
            code: "1000",
            message: "上传成功",
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
        const { longitude, latitude, createdAt } = value;
        key = key.replace(/[:f]/g, '');
        savedLocation.push({
            ip: key,
            longitude,
            latitude,
            createdAt,
        })
    }

    ctx.body = {
        code: "1000",
        message: "上传成功",
        data: savedLocation
    };
}