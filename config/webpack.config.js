var webpack 			= require('webpack');
var path 				= require('path');
var node_modules_path 	= path.resolve(__dirname,'node_modules');
var node_config_path 	= path.resolve(__dirname,'config');
var build_path 			= path.resolve(__dirname, 'src');
var main_path 			= path.resolve(__dirname, 'src', 'main.coffee');

var config =  {
	entry:[
		'font-awesome-webpack!./config/font-awesome.config.js',
		'bootstrap-webpack!./config/bootstrap.config.js',
		'./src/assets/scripts/main.coffee',
	],
	output:{
		path:build_path,
		filename:'bundle.js',
	},
	module: {
		loaders: [
			//{test: /\.js$/,loader: 'babel',exclude: [node_modules_path,node_config_path]},
    		{test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
    		// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{ test: /\.(png)$/, loader: 'url-loader?limit=100000' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      		{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

    		{test: /\.css$/,loader: 'style!css'},
    		{test: /\.coffee$/, loader: "coffee-loader"},
            {test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate"},
            {test: /\.ejs$/, loader: "ejs-loader?variable=data"},
            {test: /\.less$/,loader: "style!css!less?strictMath&noIeCompat"}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.ProvidePlugin({_: "underscore"}),
    	new webpack.ProvidePlugin({$: "jquery",jQuery: "jquery","window.jQuery": "jquery"})
	]
};

module.exports = config;