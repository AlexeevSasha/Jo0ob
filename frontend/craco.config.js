const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FF9900',
                            "@text-color-secondary": '#FF9900',
                            '@text-color': '#48464C'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};