import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const idx = Math.floor(Math.random() * 500) + 1; // generate a num between 1-100
    // const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const randomAvatar = `https://api.dicebear.com/9.x/lorelei/svg?seed=${idx}`;


    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser}`);
    } catch (error) {
        console.log("Error creating Stream user:" , error);

    }

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("error in signup cotroller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect)
      return res.status(401).json({ mesage: "invalid email or password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout succesful" });
};

export const onboard = async (req, res) =>{
  try {
    const userId = req.user._id;
    const {fullName, bio, nativeLanguage, learningLanguage, location}= req.body;

    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
      return res.status(400).json({
        message:"All fields are required",
        missingFieldes:[
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativelanguage",
          !learningLanguage && "learinglanguage",
          !location && "loction",
        ].filter(Boolean),
      }) 
    }
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          ...req.body,
          isOnboarded:true,
        },
        {new: true}
    );
     
    
    if(!updatedUser) return res.status(404).json({message:"User not found"});   
    
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user update after onboarding for ${updatedUser.fullName}`);
    } catch (error) {
      console.log("error updating Stream user during onbording :", streamError.message);
    }


    res.status(200).json({success:true, user: updatedUser});
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({message:"Internal Server Error"});
  }
}
