import { User } from "../models/user.model.js"
import { generateVerificationToken } from "../utils/index.util.js"
import { sendVerificationEmail } from "../mailtrap/emails.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId)

    const token = await user.generateToken()

    return token
  } 
  catch (error) {
    console.log(`Generate Token Error: ${error}`);
    throw new Error({
      success: false,
      message: "Something went wrong while generating token",
    })
  }
};

export const signUp = async (req, res) => {
  const { email, name, password } = req.body

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const verificationToken = generateVerificationToken();

    const user = await User.create({
      email,
      password,
      name, 
      verificationToken,
      verificationExpiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
    }); 

    const token = await generateToken(user._id);

    await sendVerificationEmail(user.email, verificationToken)


    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
 
    return res
    .status(201)
    .cookie("token", token, options)
    .json({
        success: true,
        message: "User created successfully",
        user: createdUser
    });
  } 
  catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};




export const login = async (req, res) => {
  try {
    res.send("LOGIN");
  } catch (err) {}
};




export const logout = async (req, res) => {
  try {
    res.send("LOGOUT");
  } catch (err) {}
};
