import LoggerWork from "../models/loggerWork.model.js";
// Always do this Approach - 
// I genuinely like your approach to learning. 
// You're writing the code yourself and adding functionality only when your own reasoning tells you something might be missing. 
// That's a much better way to develop independent problem-solving skills than blindly copying a complete controller from someone else.
// Consistency makes frontend integration and error handling easier.
// List All Functions You have to create

// Short cuts 
// 1. Ctrl + D -> i have deleted all && to make them || (this)
// 2. Ctrl + Shift + L -> Select all occurences in that file of selected text 

// 1. PostData Feature

export const AddLoggerWork = async (req, res) => {
  try {
    // My mind - Very good mayank -  before add work i need to check user is authenticated or not
    // 2nd i have to check is i have given authorization to him for
    console.log(req.body);
    const {
      mobileNumber,
      callOn,
      loggerSerialNumber,
      vendorName,
      problemDescription,
      actionDescription,
      status,
      solvedBy,
      contactedPersonAtSite,
    } = req.body;
    if (
      !mobileNumber ||
      !callOn ||
      !loggerSerialNumber ||
      !vendorName ||
      !problemDescription ||
      !actionDescription ||
      !status ||
      !solvedBy ||
      !contactedPersonAtSite
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }
    // Below feature is not needed and remove unique:true from loggerWork.model.js
    // consider what findOne() returns if no matching document exists. What happens when you then access .loggerSerialNumber on that result? 
    // if (loggerSerialNumber) {
    //   const fetchedUser = await LoggerWork.findOne({ loggerSerialNumber });
    //   if (fetchedUser?.loggerSerialNumber == loggerSerialNumber) {
    //     return res.status(400).json({
    //       success: false,
    //       message:
    //         "This LoggerSrNo has some previous complains . kindly remove those before proceeding.",
    //     });
    //   }
    // }

    await LoggerWork.create({
      mobileNumber,
      callOn,
      loggerSerialNumber,
      vendorName,
      problemDescription,
      actionDescription,
      status,
      solvedBy,
      contactedPersonAtSite,
    });

    return res.status(201).json({
        success:true,
        message:"Logger Issue Listed Successfully."
    })

  } catch (error) {
    next(error);
  }
};

// 

const updateLoggerWork = async(req,res)=>{
    try {
        // suppose you have this pbm - 1. user is authenticated and authorized and 
        // trying to edit a listing of logger issue 
        // 2. you have to think is he have access or not , and also is he right now logged in or not 
        // 3. you need to check what you want him to edit in those details
        // 4. you need to confirm that validation is working even after saving the edited details 
        // 5. use zod to validate if before going to mongodb 
        const 
    } catch (error) {
        console.log(error);
    }
}





