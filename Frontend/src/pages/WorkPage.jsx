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

// Every New Learning is Covered Below :- 1. what happens from w-full and max-w-48
function WorkPage() {

    // First you need to create Data for Vendor and then use that data to convert it into React Components
    const vendorList = [
        {label:"Exide",value:"exide"},
        {label:"Genus",value:"genus"},
        {label:"Ecozen",value:"ecozen"},
        {label:"Cheriesh",value:"cheriesh"},
        {label:"ValuePlus",value:"valuePlus"},
        {label:"Dlight",value:"dlight"},
        {label:"Claro",value:"claro"},
        {label:"Statcon",value:"statcon"},
        {label:"Crompton",value:"crompton"}
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

    // const selectChangeHandler = 

    return (
        <>
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
                    <Select value={complaintData.status} onValueChange={changeEventHandler} name="status">
                        <SelectTrigger id="status" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="transferred">Transferred</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="vendorName">Vendor Name</Label>
                    <Select value={complaintData.vendorName} onValueChange={changeEventHandler} name="vendorName">
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
                    <Select value={complaintData.callOn} onValueChange={changeEventHandler} name="callOn">
                        <SelectTrigger id="callOn" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Call On</SelectLabel>
                                <SelectItem value="whatsappCall">Whatsapp Call</SelectItem>
                                <SelectItem value="simpleCall">Simple Call</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="accountability">Accountability</Label>
                    <Select value={complaintData.accountability} onValueChange={changeEventHandler} name="accountability">
                        <SelectTrigger id="accountability" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Accountability</SelectLabel>
                                <SelectItem value="geoconTeam">Geocon Team</SelectItem>
                                <SelectItem value="serviceTeam">Service Team</SelectItem>
                                <SelectItem value="own">Own</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer">
                    <Label htmlFor="contactedPerson">Contacted Person</Label>
                    <Select value={complaintData.contactedPerson} onValueChange={changeEventHandler} name="contactedPerson">
                        <SelectTrigger id="contactedPerson" className="w-full max-w-48">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Contacted Person</SelectLabel>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="siteEngineer">Site Engineer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="InnerContainer ">
                    <Label htmlFor="solvedBy">Solved By</Label>
                    <Select value={complaintData.solvedBy} onValueChange={changeEventHandler} name="solvedBy">
                        <SelectTrigger id="solvedBy" className="w-full max-w-48 ">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Solved By</SelectLabel>
                                <SelectItem value="mayank">Mayank</SelectItem>
                                <SelectItem value="tarun">Tarun</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="complaintLogButton m-4 w-full max-w-160">
                <Button className="w-full">Log Complaint</Button>
            </div>
        </>
    )
}

export default WorkPage;   


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
//           14. Learn about this Function 
