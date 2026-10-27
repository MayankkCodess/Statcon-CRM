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

    return (
        <>
            <div className="OuterContainer max-w-7xl">
                <div className="InnerContainer">
                    <Label>Mobile Number</Label>
                    <Input className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label>Logger SNo</Label>
                    <Input className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label>Problem Description</Label>
                    <Input className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label>Action Description</Label>
                    <Input className="w-full max-w-48"></Input>
                </div>
                <div className="InnerContainer">
                    <Label>Status</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
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
                    <Label>Vendor Name</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
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
                    <Label>Call On</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
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
                    <Label>Accountability</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
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
                    <Label>Contacted Person</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48">
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
                    <Label>Solved By</Label>
                    <Select>
                        <SelectTrigger className="w-full max-w-48 ">
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
        </>
    )
}

export default WorkPage;   


// Issues :- 1. What is the means of each one in Select of Shadcn 
//           2. .map and .forEach usecase for rendering items of array 
//           3. i have to make UI in such a way that each row has just 3 things to enter 
//           4. what happens from - w-full and max-w-48
//           5. when i was trying to make flex of all above items using outer container was not happening 
//   until i have written max-w-7xl that means we need to first assign a limit to parent then have to start working on child
