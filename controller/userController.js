import User from "../models/userModel.js";
import genrateTokenAndSetCookie from "../utils/helpers/genrateTokenAndSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists try to log in" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    if (newUser) {
      genrateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user Data" });
    }
  } catch (err) {
    res.status(500);
    console.log("Error in signup user ", err);
  }
};

export { signupUser };
