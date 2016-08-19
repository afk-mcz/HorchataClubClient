var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'js/app.js');

const bowerPlugin = new Webpack.ResolverPlugin(
    new Webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
)

var config = {
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components']
    },

    // Makes sure errors in console map to the correct file
    // and line number
    devtool: 'eval',
    entry: [

        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',

        // Our application
        mainPath
    ],
    output: {

        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel?presets[]=es2015']
            },{
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },{
                test: /\.styl$/,
                loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
            },{
                test: /particles\.js/,
                loader: 'exports?particlesJS=window.particlesJS,pJSDom=window.pJSDom'
            }
        ]
    },

    stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
    },

    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
        bowerPlugin,
        new Webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
