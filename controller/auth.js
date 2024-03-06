const jwt = require('jsonwebtoken');

const SECRET_KEY = '033698b1ee858499615f876ea6432adeef1cdb0d4df2c435ece9d3bb9c43c1acd977ebf207cbfcf4cf48e9f4c37dc72f3fae51abff551618d66c815738d49488'
;

module.exports.login = (req, res) => {
    try {
        const token = jwt.sign(
            { user: 'testUser', role: 'testRole' }, 
            SECRET_KEY,
            { expiresIn: '1h' } 
        );

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error while attempting to log in.' });
    }
};