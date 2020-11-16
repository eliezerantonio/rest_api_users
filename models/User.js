''
var knex = require("../database/connection");
var bcrypt = require("bcrypt");

//Service
class User {

    //FIND ALL USERS
    async findAll() {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).table("Users");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    //FIND BY ID
    async findById(id) {
        try {
            try {
                var result = await knex.select(["id", "email", "role", "name"]).table("Users").where({ id: id });
                if (result.length > 0) {
                    return result[0];
                } else {
                    return undefined;

                }
            } catch (error) {
                console.log(error);
                return [];
            }
        } catch (error) {

        }
    }

    ///CREATE USER
    async new(email, password, name) {
        try {

            var hash = await bcrypt.hash(password, 10);

            await knex.insert({ email, password: hash, name, role: 0 }).table("Users");
        } catch (error) {
            console.log(error);
        }

    }
    //FIND BY EMAIL
    async findEmail(email) {

        try {
            var result = await knex.select("*").from("Users").where({ email: email })

            if (result.length > 0) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;

        }

    }

    //UPEDATE
    async update(id, email, name, role) {
        var user = await this.findById(id);
        if (user != undefined) {

            var editUser = {};
            if (email != undefined) { //eliezer@gmail.com
                if (email != user.email) {
                    var result = await this.findEmail(email);
                    if (!result) {
                        editUser.email = email
                    } else {
                        return { status: false, err: "Usuario ja  existe!" }
                    }

                }
            }
            if (name != undefined) {
                editUser.name = name
            }
            if (role != undefined) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({ id: id }).table("Users");
                return { status: true, err: "Usuario ja  existe!" }
            } catch (error) {
                return { status: true, err: error }
            }
        } else {
            return { status: false, err: "Usuario nao existe!" }
        }
    }

    //DELETE 
    async delete(id) {
        var user = this.findById(id);
        if (user != undefined) {
            try {
                await knex.delete().where({ id: id }).table("Users")
                return { status: true }

            } catch (error) {
                return { status: false, err: error }
            }

        } else {
            return { status: false, err: "Usuario nao existe" }
        }
    }

}

module.exports = new User();