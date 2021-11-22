'use strict'

const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cors=require('cors')
const fileSystem=require('file-system')
const app=express()
const config=require('./config')
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const http = require('http').createServer(app);
const io=require('socket.io')(http);
const cron = require('node-cron');
 


app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


  const whitelist = ['http://localhost:4200', 'http://localhost']
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
//configuracion lectura models
const models = path.join(__dirname, './models');
fileSystem.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

//midlewares
//app.use(cors({origin: 'http://localhost:4200'}))
app.use(cors({corsOptions}))
app.use(bodyParser.urlencoded({extended: false, limit: '50mb',}))
app.use(bodyParser.json({limit: '50mb'}))
//app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'))

//valores por defecto


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cliente API",
      description: "API Informacion",
      contact: {
        name: "Jhuanca"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ['routes/*.js']
  //apis: ["app.js"]
};


//rutas


//const actualizacion_datos=require('./controllers/actualizacion_datos')


const swaggerDocs = swaggerJsDoc(swaggerOptions);

const fs = require('fs');
const basename = path.basename(__filename);

fs
  .readdirSync(path.join(__dirname,'routes'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    
    let f=file.replace('.js','');
    let name=f.replace(/_/g,'-');
    const dir = path.join(__dirname, '..','public','uploads',`${name}s`);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    app.use(`/${f}`, require(`./routes/${f}`)); 
    //app.use(`/node/node/${f}`, require(`./routes/${f}`)); 
  });




app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 


app.use(express.static('./public'));

io.on('connection', function(socket){
  console.log('Client connected..');
});


app.set('socketV', io);
app.set('trust proxy', true);

http.listen(config.port,()=>{
  
  console.log(`API REST: corriendo en el puerto: ${config.port}`)
})


cron.schedule('14 0 * * *', () => {
    //actualizacion_datos.actualizarDeudores();
});

function get(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}
