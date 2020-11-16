class UserController {

    async index(req, res) {

    }

    async create(req, res) {
        console.log(req.body);
        res.send("pegando corpo da requisicao!");
    }
}

module.exports = new UserController();