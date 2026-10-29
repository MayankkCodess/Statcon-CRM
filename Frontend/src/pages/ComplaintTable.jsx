import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx"
import { useEffect } from "react";
import axios from "axios";
import {COMPLAINT_API_ENDPOINT} from "../utils/constants.js";
import { useState } from "react";

function ComplaintTable() {
 
    const [complaintsData,setComplaintsData] = useState([]);

    // learn the syntax of useEffect
    useEffect(()=>{
        // write response always instead of allComplaintsData because axios gives too much chained data
        // check the structure of axios after returning data
        // Error - Reason Behind this - axios first returns a promise not response directly 
        const fetchComplaints = async () => {
          try {
             const response = await axios.get(`${COMPLAINT_API_ENDPOINT}/getAllComplaints`)
           console.log(response);
        // optional chaining worked here - before that it was showing undefined for allComplaints
        setComplaintsData(response?.data?.allComplaints);
        // nothing was coming in below console.log of complaintsData , try to learn 
        console.log(complaintsData);
          } catch (error) {
            console.log(error);
          }
        };
        fetchComplaints();// you were not able to find where to write this statement.. 
    },[]);

    return (
        <>
            <Table>
                <TableCaption>A list of all Complaints</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Mobile Number</TableHead>
                        <TableHead>CallOn</TableHead>
                        <TableHead>Logger Serial Number</TableHead>
                        <TableHead className="text-right">Vendor Name</TableHead>
                        <TableHead className="text-right">Problem Description</TableHead>
                        <TableHead className="text-right">Action Description</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Accountability</TableHead>
                        <TableHead className="text-right">SolvedBy</TableHead>
                        <TableHead className="text-right">Contacted Person</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                          complaintsData?.map((complaint)=>(
                    <TableRow key={complaint?._id}>                
                        <TableCell className="font-medium">{complaint?.mobileNumber}</TableCell>
                        <TableCell>{complaint?.callOn}</TableCell>
                        <TableCell>{complaint?.loggerSerialNumber}</TableCell>
                        <TableCell className="text-right">{complaint?.vendorName}</TableCell>
                        <TableCell className="text-right whitespace-normal break-words">{complaint?.problemDescription}</TableCell>
                        <TableCell className="text-right whitespace-normal break-words">{complaint?.actionDescription}</TableCell>
                        <TableCell className="text-right">{complaint?.status}</TableCell>
                        <TableCell className="text-right">{complaint?.accountability}</TableCell>
                        <TableCell className="text-right">{complaint?.solvedBy}</TableCell>
                        <TableCell className="text-right">{complaint?.contactedPerson}</TableCell>
                        <TableCell>{complaint?.createdAt.split("T")[0]}</TableCell>
                    </TableRow>
                          ))
                        }    
                </TableBody>
            </Table>
        </>
    )
}

export default ComplaintTable;


// 1. Try to learn status code when writing code in backend
// 2. Before implementing any Controller Function Try to think of Edge Cases and all Possiblities
// 3. After sending a response like res.json({}) you actually send response = {{allComplaints:[],success:true}} so to access it you have to use response.allComplaints[0].mobileNumber
// 4. Because you have not done Requirement Gathering and Database Design Before building application , You might have noticed that you need to change many things later while working 
// 5. Now , i have got the point that why do we need Redux - here i have to share data between ComplaintTable.jsx and Complaints.jsx 
// 6. Think why to implement useEffect of fetching data in parent page - Complaints.jsx rather than in ComplaintTable.jsx - It's mainly about separating data management from data presentation and keeping the data-fetching lifecycle independent of search operations.
// 7. Need to learn how to iterate over a object containing array in javascript
// 8. Error - i was trying to use response of axios directly with .map but then finds that it is better to use state Variable here 
// 9. Another Error - jsx expression must have one parent element but as you have added all tablecell inside .map without any parent tag
// 10. you have used .map in wrong way try to learn both .map and .forEach - you missed key in .map

// 11. Error :- promise <pending> appearing -> then i have used async and await and trycatch block 
// 12. learn async and await and infact revise whole javascript with building
// 13. you dont know what is the structure of callback while writing fetchComplaints - why i have to write { } instead of ()