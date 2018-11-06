const position = require("../model/Positions")();

exports.setPosition = async (ctx) => {
    try {
        const {
            latitude,
            longitude,
            uuid,
            title,
        } = ctx.request.body;
        position.addPosition(uuid, {
            latitude,
            longitude,
            title
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
    try {
        const savedLocation = position.getPositions();

        ctx.body = {
            code: "1000",
            message: "success",
            data: savedLocation
        };
    } catch (error) {
        throw error;
    }
}

exports.delPositions = async (ctx) => {
    try {
        const {
            uuid
        } = ctx.request.body;

        position.delPosition(uuid);
        ctx.body = {
            code: "1000",
            message: "success",
            data: {}
        };
    } catch (error) {
        throw error;
    }
}

exports.clearPositions = async (ctx) => {
    try {
        position.cleanPositions();
        ctx.body = {
            code: "1000",
            message: "success",
            data: {}
        };
    } catch (error) {
        throw error;
    }
}