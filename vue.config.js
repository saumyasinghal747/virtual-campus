module.exports = {
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Gunn Campus'
                return args
            })
    }
}
