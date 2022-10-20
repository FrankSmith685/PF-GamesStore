//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const { getAllGames } = require('../Client/src/redux/Actions/Index.js');
const server = require('./src/app.js');
const { conn, Users } = require('./src/db.js');
const { getVideogamesByPlatforms } = require('./src/handlers/getAllVideoGames.js');
const { getVideoGamesDB } = require('./src/handlers/getGamesDB.js');
const getGenres = require('./src/handlers/getGenres.js');
const getPlatforms = require('./src/handlers/getPlataforms.js');
const getTags = require('./src/handlers/getTags.js');

const { getVideogamesApi } = require('./src/handlers/getVideoGamesApi.js');
require('dotenv').config();
const {
    PORT,
  } = process.env;

// Syncing all the models at once.

conn.sync({ force: false }).then(() => {

  server.listen(PORT, async() => {
    await getVideogamesApi()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});