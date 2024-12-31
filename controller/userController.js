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
     const token = genrateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
        token
      });
    } else {
      res.status(400).json({ error: "Invalid user Data" });
    }
  } catch (err) {
    res.status(500);
    console.log("Error in signup user ", err);
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exists, Please try to signUp" });
    }

    if (password != user.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
   const token =  genrateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500);
    console.log("Error in LogIn user ", error);
  }
};
export { signupUser, logInUser };
