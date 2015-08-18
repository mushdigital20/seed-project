/* 
* @Author: Pedro Mello (MushDigital)
* @email: pedro@mushdigital.com
* @Date:   2015-08-14
*/
var webpack 			= require('webpack');
var path 				= require('path');
var root_path			= path.resolve(__dirname,'..');
var node_modules_path 	= path.resolve(root_path,'node_modules');
var node_config_path 	= path.resolve(root_path,'config');
var build_path 			= path.resolve(root_path, 'src');
var main_path 			= path.resolve(build_path, 'src', 'main.coffee');
var assets_path			= path.join(build_path,'assets');
var scripts_path		= path.join(assets_path,'scripts');
var controllers_path	= path.join(scripts_path,'controllers');

console.log(root_path);
var config =  {
	entry:[
		//Files that will generate the final bundle.js
		'font-awesome-webpack!./config/font-awesome.config.js',
		'bootstrap-webpack!./config/bootstrap.config.js',
		'./src/assets/scripts/angular.coffee',
		//Controllers
		path.join(controllers_path,'main-view-controller.coffee'),
		//Services
		//Directives
		//Factories
		
	],
	output:{
		path:build_path,
		filename:'bundle.js',
	},
	module: {
		loaders: [
    		{test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
			// loads bootstrap's css.
			{test: /\.(png)$/, loader: 'url-loader?limit=100000'},
			{test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      		{test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},

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