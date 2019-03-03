const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

/* style files regexes */
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

/* tslint-loader - options paramter definition */
const tslintOptions = {
    emitErrors: true,
    configuration: {
        rules: {
            'array-type': [true, 'array'],
            'binary-expression-operand-order': true,
            'class-name': true,
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
            'whitespace': [true, 'check-branch', 'check-operator', 'check-typecast']
        }
    }
};

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const isProductionBuild = !isDevBuild;

    const publicPath = '/';
    const shouldUseRelativeAssetPaths = (publicPath === './');

    // common function to get style loaders
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            //require.resolve('isomorphic-style-loader'),
            isDevBuild && require.resolve('style-loader'),
            isProductionBuild && {
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign(
                    {},
                    shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
                )
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('postcss-preset-env')({
                            autoprefixer: {
                                flexbox: 'no-2009'
                            },
                            stage: 3
                        })
                    ],
                    sourceMap: isProductionBuild && shouldUseSourceMap
                }
            }
        ].filter(Boolean);
        if (preProcessor) {
            loaders.push(
                {
                    loader: require.resolve(preProcessor),
                    options: {
                        sourceMap: isProductionBuild && shouldUseSourceMap
                    }
                }
            );
        }
        return loaders;
    };

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        mode: isDevBuild ? 'development' : 'production',
        stats: {
            modules: false
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        performance: false,
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    enforce: 'pre',
                    use: [{
                        loader: 'tslint-loader',
                        options: tslintOptions
                    }]
                },
                {
                    test: /\.tsx?$/,
                    include: /ClientApp/,
                    use: 'awesome-typescript-loader?silent=true'
                },
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: isProductionBuild && shouldUseSourceMap
                    }),
                    sideEffects: true
                },
                {
                    test: cssModuleRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: isProductionBuild && shouldUseSourceMap,
                        modules: true,
                        getLocalIdent: getCSSModuleLocalIdent
                    })
                },
                {
                    test: sassRegex,
                    exclude: sassModuleRegex,
                    use: getStyleLoaders(
                        {
                            importLoaders: 2,
                            sourceMap: isProductionBuild && shouldUseSourceMap
                        },
                        'sass-loader'
                    ),
                    sideEffects: true
                },
                {
                    test: sassModuleRegex,
                    use: getStyleLoaders(
                        {
                            importLoaders: 2,
                            sourceMap: isProductionBuild && shouldUseSourceMap,
                            modules: true,
                            getLocalIdent: getCSSModuleLocalIdent
                        },
                        'sass-loader'
                    )
                },
                {
                    test: /\.(svg|png|eot|ttf|woff|woff2|bmp|wav|gif|jpe?g)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                    use: 'url-loader?limit=100000'
                }
            ]
        },
        plugins: [
            new CheckerPlugin()
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
        ] : [
            // Plugins that apply in production builds only
        ])
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client': './ClientApp/boot-client.tsx'
        },
        module: {
            rules: [
 
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir)
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
            })
        ].concat(isDevBuild ? [ // Plugins that apply in development builds only           
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [ // Plugins that apply in production builds only
                new MiniCssExtractPlugin({
                    filename: 'site.css'
                })
            ])
    },
    // If PRODUCTION BUILD - add optimization property configuration to clientBundleConfig
    isProductionBuild ? {
        optimization: {
            minimize: isProductionBuild,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2
                        },
                        mangle: {
                            safari10: true
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true
                        },
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: shouldUseSourceMap
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: shouldUseSourceMap
                            ? {
                                inline: false,
                                annotation: true
                            }
                            : false
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                name: false
            },
            runtimeChunk: true
        }
    } : {});

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