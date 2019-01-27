const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

process.traceDeprecation = true;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        mode: isDevBuild ? 'development' : 'production',
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    enforce: 'pre',
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                            configuration: {
                                rules: {
                                    //'align': [true, 'parameters', 'arguments', 'statements', 'members', 'elements'],
                                    'array-type': [true, 'array'],
                                    'binary-expression-operand-order': true,
                                    'class-name': true,
                                    //'curly': true,
                                    'import-spacing': true,
                                    'new-parens': true,
                                    'no-consecutive-blank-lines': true,
                                    'no-irregular-whitespace': true,
                                    'no-trailing-whitespace': true,
                                    'one-line': [true, 'check-catch', 'check-finally', 'check-else', 'check-open-brace', 'check-whitespace'],
                                    'ordered-imports': [true, {
                                        'import-sources-order': 'any',
                                        'named-imports-order': 'case-insensitive'
                                    }],
                                    'prefer-const': true,
                                    'prefer-template': true,
                                    'quotemark': [true, 'single'],
                                    'semicolon': [true, 'always'],
                                    'switch-final-break': [true, 'always'],
                                    //'triple-equals': true,
                                    'whitespace': [true, 'check-branch', 'check-operator', 'check-typecast']
                                }
                            }
                        }
                    }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    include: /ClientApp/,
                    use: 'awesome-typescript-loader?silent=true'
                },
                {
                    test: /\.(svg|png|eot|ttf|woff|woff2|bmp|wav|gif|jpe?g)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                    use: 'url-loader?limit=100000'
                }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin()
        ])
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        isDevBuild ? 'css-loader' : 'css-loader?minimize',
                        'sass-loader'
                    ]
                }
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir)
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'site.css'
            })
        ].concat(isDevBuild ? [ // Plugins that apply in development builds only           
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [ // Plugins that apply in production builds only           
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: {
            mainFields: ['main']
        },
        entry: {
            'main-server': './ClientApp/boot-server.tsx'
        },
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};