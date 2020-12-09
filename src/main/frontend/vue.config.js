const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, "../" + "resources/static"),
    devServer: {
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        proxy: {
            '/': {
                target: 'http://localhost:9000',
                ws: true,
                changeOrigin: true
            },
        }
    }
}