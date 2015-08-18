###*
 * @author Pedro Mello (MushDigital)
 * @email: pedro@mushdigital.com
 * @Date:   2015-08-14
###

express 			= require 'express'
webpack_middleware 	= require 'webpack-dev-middleware'
webpack 			= require 'webpack'
webpack_server 		= require 'webpack-dev-server'
webpack_config		= require './config/webpack.config.js'
path 				= require 'path'
fs 					= require 'fs'
package_json		= require './package.json'
engine  			= require 'ejs-locals'

app = express()
assets_path = path.resolve(__dirname, 'src')
port = process.env.PORT || 8080;
host = process.env.YOUR_HOST || '0.0.0.0';

#Settings
app.engine 'ejs', engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get '/', (req, res) ->
	res.render('index',{
		page_title:"Page Title Mate"
		author:package_json.author
	})

app.use(express.static(assets_path))

compiler = webpack(webpack_config)

app.use(webpack_middleware(compiler, {

}))

app.listen port,host,()->
	console.log "Server started on #{port}"