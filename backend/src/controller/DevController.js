const axios = require('axios');
const Dev = require('../model/Dev')

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [ // "$and" vai aplicar os três filtros ao mesmo tempo, como se fosse três "&&"
                { _id: { $ne: user } }, // "$ne" "not equal" para evitar que ele veja a si mesmo
                { _id: { $nin: loggedDev.likes } }, // "$nin" "not in" Para evitar que ele veja quem ele já deu like
                { _id: { $nin: loggedDev.deslikes } }, // Para evitar que ele veja quem ele já deu deslike
            ],
        })

        return res.json(users)
    },

    async store(req, res) { // Toda vez que uma função precisa esperar um retorno como fazemos abaixo usando o "await", a função que tem essa espera dentro precisa ser marcada com o "async"
        console.log(req.body.username)
        const { username } = req.body; // Extrai apenas userName da requisição

        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json({ userExists });
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
};


/* 
E o "CRUD" disso é mais ou menos: INDEX (lista todos), SHOW(lista apenas 1), STORE, UPDATE, DELETE.
Não é legal colocar mais que esses 5 métodos na controller 
*/