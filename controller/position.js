exports.setPosition = async (ctx) => {
    try {
        const { latitude, longitude } = ctx.request.body;
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