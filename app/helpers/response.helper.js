const responseStatus = (status, data, message) => {
    return {
        apiStatus: status,
        data,
        message
    }
}

module.exports = responseStatus