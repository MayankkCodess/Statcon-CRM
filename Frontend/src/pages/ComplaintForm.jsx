import { Label } from "../components/ui/label.jsx"
import { Input } from "../components/ui/input.jsx"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select.jsx"
import {Button} from "../components/ui/button.jsx";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { COMPLAINT_API_ENDPOINT } from "../utils/constants.js";
// Every New Learning is Covered Below :- 1. what happens from w-full and max-w-48
function ComplaintForm() {

    // First you need to create Data for Vendor and then use that data to convert it into React Components
    const vendorList = [
        {label:"Exide",value:"Exide"},
        {label:"Genus",value:"Genus"},
        {label:"Ecozen",value:"Ecozen"},
        {label:"Cheriesh",value:"Cheriesh"},
        {label:"ValuePlus",value:"ValuePlus"},
        {label:"Dlight",value:"Dlight"},
        {label:"Claro",value:"Claro"},
        {label:"Statcon",value:"Statcon"},
        {label:"Crompton",value:"Crompton"}
    ]

    const [complaintData , setComplaintData] = useState({
        mobileNumber:"",
        loggerSerialNumber:"",
        problemDescription:"",
        actionDescription:"",
        status:"",
        vendorName:"",
        callOn:"",
        contactedPerson:"",
        solvedBy:"",
        accountability:""
    });

    const changeEventHandler = (e)=>{
        // why do we need to pass everything as a object below
        setComplaintData({...complaintData, [e.target.name]:e.target.value})
        // console.log(complaintData)
    }
    // try to understand the flow of below handler carefully 
    const selectChangeHandler = (name) => (value) => {
        setComplaintData({
          ...complaintData , [name]:value
        })
    }
    // okk so till now i have gathered the form data entered by user , now it's time to send that to backend 

    const submitDataHandler = async (e) => {
        e.preventDefault();
        // first you need to use try catch , then use axios.post to send data to backend know where to send means on which api (create route at backend) 
        // or is user login or not , is he authorized or not 

        try {
            const responseByAxios = await axios.post(`${COMPLAINT_API_ENDPOINT}/addComplaint`, complaintData , 
                {headers: {"Content-Type" : "application/json"} 
                //, withCredentials:true // you can add this later when you have something like authenticated
                }
            )

            if(responseByAxios?.data?.success){
                // But remember , below you need to write error and success comes from backend res.json
                toast.success("Complaint Created Successfully.");
            }
        } catch (error) {
            console.log(error);
            // you need to show the error .. so use toast 
            // return error?.message;
            toast.error("Some Error Occured While adding Complaint.")
        }


    }

    return (
        <>
        <form action="" onSubmit={submitDataHandler}>
            <div className="OuterContainer max-w-7xl grid grid-cols-3 gap-4 mx-4 mt-4">
                <div className="InnerContainer">
                    <Label htmlFor="mobileNumber" >Mobile Number</Label>
                    <Input id="mobileNumber" value={complaintData.mobileNumber} onChange={changeEventHandler} name="mobileNumber" className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="loggerSerialNumber">Logger SNo</Label>
                    <Input id="loggerSerialNumber" value={complaintData.loggerSerialNumber} onChange={changeEventHandler} name="loggerSerialNumber" className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="problemDescription">Problem Description</Label>
                    <Input id="problemDescription" value={complaintData.problemDescription} onChange={changeEventHandler} name="problemDescription" className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="actionDescription">Action Description</Label>
                    <Input id="actionDescription" value={complaintData.actionDescription} onChange={changeEventHandler} name="actionDescription" className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="status">Status</Label>
                    <Select value={complaintData.status} onValueChange={selectChangeHandler("status")} name="status">
                        <SelectTrigger id="status" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                                <SelectItem value="Transferred">Transferred</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="vendorName">Vendor Name</Label>
                    <Select value={complaintData.vendorName} onValueChange={selectChangeHandler("vendorName")} name="vendorName">
                        <SelectTrigger id="vendorName" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Vendors</SelectLabel>
                                {
                                    vendorList.map((vendor)=>(
                                        <SelectItem key={vendor.value} value={vendor.value}>{vendor.label}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="callOn">Call On</Label>
                    <Select value={complaintData.callOn} onValueChange={selectChangeHandler("callOn")} name="callOn">
                        <SelectTrigger id="callOn" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Call On</SelectLabel>
                                <SelectItem value="Whatsapp Call">Whatsapp Call</SelectItem>
                                <SelectItem value="Simple Call">Simple Call</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="accountability">Accountability</Label>
                    <Select value={complaintData.accountability} onValueChange={selectChangeHandler("accountability")} name="accountability">
                        <SelectTrigger id="accountability" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Accountability</SelectLabel>
                                <SelectItem value="Geocon Team">Geocon Team</SelectItem>
                                <SelectItem value="Service Team">Service Team</SelectItem>
                                <SelectItem value="Own">Own</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="contactedPerson">Contacted Person</Label>
                    <Select value={complaintData.contactedPerson} onValueChange={selectChangeHandler("contactedPerson")} name="contactedPerson">
                        <SelectTrigger id="contactedPerson" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Contacted Person</SelectLabel>
                                <SelectItem value="Customer">Customer</SelectItem>
                                <SelectItem value="Site Engineer">Site Engineer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer ">
                    <Label htmlFor="solvedBy">Solved By</Label>
                    <Select value={complaintData.solvedBy} onValueChange={selectChangeHandler("solvedBy")} name="solvedBy">
                        <SelectTrigger id="solvedBy" className="w-full max-w-48 ">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Solved By</SelectLabel>
                                <SelectItem value="Mayank">Mayank</SelectItem>
                                <SelectItem value="Tarun">Tarun</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="complaintLogButton m-4 w-full max-w-160">
                <Button type="submit" className="w-full">Log Complaint</Button>
            </div>
        </form>    
        </>
    )
}

export default ComplaintForm;   


// Issues :- 1. What is the means of each one in Select of Shadcn 
//           2. .map and .forEach usecase for rendering items of array [why dont use forEach as it returns undefined]
//           3. i have to make UI in such a way that each row has just 3 things to enter 
//           4. what happens from - w-full and max-w-48 & max-w-6xl
//           5. when i was trying to make flex of all above items using outer container, it was not happening , try to know how to do this with flex-wrap and with grid
//           6. until i have written max-w-7xl that means we need to first assign a limit to parent then have to start working on child
//           7. flow till now - my question , suppose a user is entering somethings in every input but it is must that 
//              i have to store the values so that i can share those to backend via apis 
//           8. What is this - React state holds values in browser memory; the backend and database handle persistent storage.
//           9. my question is - why to write name there and id at other in select in shadcn - answer from gpt - name identifies the field when collecting form data.he field's name tells your form-handling code that the selected value belongs to vendorName.
//           10. Think this as DSA Question- you have declared a variables in a object(now first learn this in javascript) 
//           11. Important Question - Try to find out the usage of all attriutes like value , name , id and htmlFor usage in DOM , console.log() and Backend Data Sending
//           12. learn about the control on Input tag value by useState variable like we make somethings that when user type our variable value changes and then that displays on screen , learn why till adding changeEventHandler we can able to type anything in input
//           13. you need to use onValueChange instead of onChange for select in shadcn -  onChange gives you an event object (e). But shadcn's Select uses onValueChange, which passes the selected value directly instead of an event object.
//           14. if my state is simply a javascript object in react's memory , then how does it works after deployment on aws , is it happen in user browser or my aws space
//           15. learn full flow from selecting a option to how data goes in state variable in select of shadcn
//           16. learn something about higher order functions 
//           17. 1. Need to implement Zod for data validation , 2. Responsiveness and DarkMode and all will be later rightnow the main motive is of MVP
//           18. now after gathering , you need to learn how to send the data to backend through apis on behalf of different type of data 
//           19. learn about toaster also - and also a brief summary of frontend flow
//           20. Errors Found in Browser Inspect - 1. Wrong route in axios.post 2. Toaster 3. api endpoint import issue 4. accountability missing in controller
//           21. CORS Error - Access to XMLHttpRequest at 'http://localhost:3000/api/v1/complaint/addComplaint' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// CORS 21 - {       // WorkPage.jsx?t=1793179185250:96 AxiosError: Network Error
//     at XMLHttpRequest.handleError (axios.js?v=5aafef59:2790:16)
//     at Axios$1.request (axios.js?v=5aafef59:3804:37)
//     at async submitDataHandler (WorkPage.jsx?t=1793179185250:87:28)
// :3000/api/v1/complaint/addComplaint:1  Failed to load resource: net::ERR_FAILED
// }
//          22. CORS Error - Very Long and time taking due to dotenv.config() in index.js as it is loading late so i have to shift that in app.js 