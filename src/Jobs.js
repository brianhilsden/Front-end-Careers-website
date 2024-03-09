import './Jobs.css'
//The function displays each job data individually after being mapped in the main function
function Jobs(props){
    return( 
        <div className="job">
            <div className="apply">
                <div className="summary">
                <h2>Job id: {props.item.id}</h2>
                <h2>Job Title:{props.item.Job} </h2>
                <h2>Location:{props.item.Location} </h2>
                
                </div>
                <div className='apply--buttons'>
                    <button className="apply--button" onClick={()=>props.handleApplyDetails(props.item.id)}>Apply</button>
                    <button type="apply--details" onClick={()=>props.handleJobDetails(props.item.id)}>{props.item.details?"Less details":"More Details"}</button>
                </div>
                    
            </div>
            {props.item.details && <div>
            <h2>Requirements:{props.item.Requirements} </h2>
            <h2>Responsibilities:{props.item.Responsibilities} </h2>
            
            <h2>Salary:{props.item.Salary} {props.item.Currency}</h2>
            </div>}
            
        </div>
    )
}
export default Jobs;