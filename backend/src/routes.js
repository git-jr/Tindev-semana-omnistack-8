const express = require('express')
const DevController = require('./controller/DevController')
const LikeController = require('./controller/LikeControllerr')
const DislikeController = require('./controller/DeslikeController')

const routes = express.Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/deslikes', DislikeController.store)


/* 
routes.get('/', (req, res) => {
    return res.json({ message: `Hello! ${req.query.name}` });
});

routes.post('/devs', (req, res) => {
    return res.json(req.body);
})
 */

module.exports = routes;