const backendHost = process.env.BACKEND_HOST;

module.exports = {
    devServer: {
        proxy: "http://" + backendHost + ":8081"
    }
}