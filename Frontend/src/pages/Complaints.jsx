import ComplaintForm from "./ComplaintForm.jsx"
import ComplaintTable from "./ComplaintTable.jsx"

function Complaints() {
    return (
        <>
            <div className="m-4">
                <ComplaintForm />
                <ComplaintTable />
            </div>
        </>
    )
}

export default Complaints;