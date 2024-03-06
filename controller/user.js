const User = require('../model/user');

module.exports.getAllUser = async (req, res) => {
    const limit = parseInt(req.query.limit) || 0;
    const sort = req.query.sort === 'desc' ? -1 : 1;

    try {
        const users = await User.find().limit(limit).sort({ _id: sort });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports.addUser = async (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        },
        address: req.body.address,
        phone: req.body.phone,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports.editUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
