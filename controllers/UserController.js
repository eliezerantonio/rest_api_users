const User = require("../models/User");
var user = require("../models/User");

class UserController {

    async index(req, res) {

        var users = await User.findAll();
        res.json(users);

    }
    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);
        if (user == undefined) {
            res.status(404)
            res.json({});
        } else {
            res.status(200)
            res.json(user);
        }
    }

    async create(req, res) {
        var { email, name, password } = req.body;


        if (email == undefined) {
            res.status(400);
            res.json({ err: "O Email  invalio!!!" });
            return
        }
        var emailExists = await User.findEmail(email);

        if (emailExists) {
            res.status(406)
            res.json({ err: "email ja esta cadastrado" });
            return;
        }
        await User.new(email, password, name);

        res.status = 200;
        res.send("Tudo OK!");
    }

    //UPEDATE

    async edit(req, res) {
        var { id, name, role, email } = req.body;
        var result = await User.update(id, email, name, role);
        if (result != undefined) {
            if (result.status) {
                res.status(200)
                res.send("TUDO OK")
            } else {
                res.status(406);
                res.send(result.err)
            }
        } else {
            res.status(406);
            res.send("Erro no servidor")
        }

    }

    async remove(req, res) {


        var id = req.params.id;

        var result = await User.delete(id)

        if (result.status) {
            res.status(200);
            res.status("tudo ok");

        } else {
            res.status(406)
            res.send(result.err);
        }


    }
}

module.exports = new UserController();