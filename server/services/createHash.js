const bcrypt = require('bcrypt');
const saltRounds =  10;

module.exports = (pass) => {
    return bcrypt.hashSync (pass, saltRounds);
};
