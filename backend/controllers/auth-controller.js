const DetailsUser = require("../models/userForm-schema");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "This is home" });
  } catch (error) {
    res.status(400).json({ msg: "error from home" });
  }
};

const allAlumnis = async(req,res)=>{
  try {
    const alumniUsers = await DetailsUser.find();
    console.log("user found successfully");
    return res.status(200).json({msg:alumniUsers});
  } catch (error) {
    return res.status(400).json({msg:"can't fetch the alumni details"});
  }
}

module.exports = { home, allAlumnis };
