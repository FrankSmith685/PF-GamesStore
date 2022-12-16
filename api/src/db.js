require('dotenv').config();
const { Sequelize,Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,API_KEY, DB_NAME,KEY_CHECK
} = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 7667,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );



// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/games`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Videogame } = sequelize.models;
const {Users, Orders, Games, Genres, Platforms, Reviews, Tags, Newsletter} = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);


    //FALTA IMPORTAR USERS
        Users.belongsToMany(Games, {through: 'userGames'});
        Games.belongsToMany(Users, {through: 'userGames'});
        Orders.belongsTo(Users);
      //FALTA IMPORTAR ORDERS
        Orders.belongsToMany(Games, {through: 'orderGames'});
        Games.belongsToMany(Orders, {through: 'orderGames'});

        Genres.belongsToMany(Games, {through: 'genreGames'});
        Games.belongsToMany(Genres, {through: 'genreGames'});

        Games.belongsToMany(Platforms, {through: 'platformGames'});
        Platforms.belongsToMany(Games, {through: 'platformGames'});

        Games.belongsToMany(Tags, {through: 'tagsGames'});
        Tags.belongsToMany(Games,{through: 'tagsGames'});
        // ver relación con juegos y games
        Reviews.belongsTo(Users);
        Reviews.belongsTo(Games);

        //sale
        // Games.hasMany(Sale)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,API_KEY,KEY_CHECK,
  Games,Genres,Platforms,Tags,Orders,Users,Reviews, Newsletter
};
