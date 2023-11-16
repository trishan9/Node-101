const getPagination = (page = 1, limit = 5) => {
    const skip = (parseInt(page) * parseInt(limit)) - parseInt(limit)
    return {
        limit: parseInt(limit),
        skip
    }
}

module.exports = getPagination