let positions = {};

class Positions {
    constructor() {
        this.positionMap = new Map();
        this.checkTimer = setInterval(checkTime.bind(this), 10 * 1000);
    }

    addPosition(uuid, {
        latitude,
        longitude,
        title,
    }) {
        this.positionMap.set(uuid, {
            latitude,
            longitude,
            title,
            isShow: true,
            createAt: Date.now()
        });
    }

    getPositionOfUUid(uuid) {
        if (this.positionMap.has(uuid)) {
            return this.positionMap.get(uuid);
        } else {
            throw new Error("不存在");
        }
    }

    getPositions() {
        return [...this.positionMap.values()];
    }

    delPosition(uuid) {
        this.positionMap.delete(uuid);
    }

    cleanPositions() {
        this.positionMap.clear();
    }
}

const checkTime = function () {
    const nowTime = Date.now();
    for (let [uuid, position] of this.positionMap) {
        const differenceTime = nowTime - position.createAt;
        if (differenceTime > (1000 * 60)) {
            this.delPosition(uuid);
        }
    }
}

module.exports = function () {
    if (!positions.checkTimer) {
        positions = new Positions();
    }

    return positions;
}