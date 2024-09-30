import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://jobshustle-tobl.onrender.com/api/home/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Display error message if fetch fails
  }

  if (!job) {
    return <div>Error loading job details</div>;
  }

  const jobDescription = job.jobDescription || {};

  return (
    <div className="bgcol">
      <div className="job-details-container">
        <h1>{job.title}</h1>
        <h2><i style={{ color: "red" }}>Company: </i>{job.company}</h2>

        <div className="job-summary">
          <div className="job-info">
            <span className="icon experience-icon">📅</span>
            <span>{job.experience}</span>
          </div>
          <div className="job-info">
            <span className="icon salary-icon">💼</span>
            <span>{job.salary}</span>
          </div>
          <div className="job-info">
            <span className="icon qualification-icon">🎓</span>
            <span>{job.qualification}</span>
          </div>
          <div className="job-info">
            <span className="icon location-icon">📍</span>
            <span>{job.location}</span>
          </div>
        </div>
        
        <div className="apply-button-container">
          <button
            className="apply-now-button apply-button"
            onClick={() => window.location.href = job.applyNowLink}
          >
            Apply Now
          </button>
        </div>

        <div className="job-details">
          <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
          <h4>Job Description</h4>
          <p>{jobDescription.description || 'No description available.'}</p>

          <h4>Job Information:</h4>
          <table className="job-details-table">
            <tbody>
              {Object.entries({
                "Workplace Type": jobDescription.workplaceType,
                "Location": jobDescription.location || job.location,
                "Position Title": jobDescription.positionTitle,
                "Job Function": jobDescription.jobFunction,
                "Job Type": jobDescription.jobType,
                "Minimum Education": jobDescription.minEducation,
                "Main Stream": jobDescription.mainStream,
                "Min Experience": jobDescription.minExperience,
              }).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Responsibilities:</h4>
          <ul>
            {jobDescription.responsibilities?.length > 0 ? (
              jobDescription.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities listed.</li>
            )}
          </ul>

          <h4>Required Qualifications, Capabilities, and Skills:</h4>
          <ul>
            {jobDescription.qualifications?.length > 0 ? (
              jobDescription.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))
            ) : (
              <li>No qualifications listed.</li>
            )}
          </ul>

          <h4>Benefits:</h4>
          <ul>
            {jobDescription.benefits?.length > 0 ? (
              jobDescription.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))
            ) : (
              <li>No benefits listed.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../styles/JobDetails.css';

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`https://jobshustle-tobl.onrender.com/api/home/${id}`)
//       .then(response => {
//         setJob(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching job details:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <div></div>
//       </div>
//     );
//   }

//   if (!job) {
//     return <div>Error loading job details</div>;
//   }

//   const jobDescription = job.jobDescription || {};

//   return (
//     <div className="bgcol">
//       <div className="job-details-container">
//         <h1>{job.title}</h1>
//         <h2><i style={{color:"red"}}>Company: </i>{job.company}</h2>

//         <div className="job-summary">
//           <div className="job-info">
//             <span className="icon experience-icon">📅</span>
//             <span>{job.experience}</span>
//           </div>
//           <div className="job-info">
//             <span className="icon salary-icon">💼</span>
//             <span>{job.salary}</span>
//           </div>
//           <div className="job-info">
//             <span className="icon qualification-icon">🎓</span>
//             <span>{job.qualification}</span>
//           </div>
//           <div className="job-info">
//             <span className="icon location-icon">📍</span>
//             <span>{job.location}</span>
//           </div>
//         </div>
//         <div className="apply-button-container">
//         <button className="apply-now-button apply-button"
//           onClick={() => window.location.href = job.applyNowLink} // Uses the correct apply link
//         >
//           Apply Now
//         </button>
//         </div>

//         <div className="job-details">
//           <h3>Posted: {new Date(job.postedDate).toLocaleDateString()}</h3>
//           <h4>Job Description</h4>
//           <p>{jobDescription.description || 'No description available.'}</p>

//           <h4>Job Information:</h4>
//           <table className="job-details-table">
//             <tbody>
//               <tr>
//                 <td>Workplace Type</td>
//                 <td>{jobDescription.workplaceType || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Location</td>
//                 <td>{jobDescription.location || job.location || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Position Title</td>
//                 <td>{jobDescription.positionTitle || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Job Function</td>
//                 <td>{jobDescription.jobFunction || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Job Type</td>
//                 <td>{jobDescription.jobType || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Minimum Education</td>
//                 <td>{jobDescription.minEducation || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Main Stream</td>
//                 <td>{jobDescription.mainStream || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td>Min Experience</td>
//                 <td>{jobDescription.minExperience || 'N/A'}</td>
//               </tr>
//             </tbody>
//           </table>

//           <h4>Responsibilities:</h4>
//           <ul>
//             {jobDescription.responsibilities?.length > 0 ? (
//               jobDescription.responsibilities.map((responsibility, index) => (
//                 <li key={index}>{responsibility}</li>
//               ))
//             ) : (
//               <li>No responsibilities listed.</li>
//             )}
//           </ul>

//           <h4>Required Qualifications, Capabilities, and Skills:</h4>
//           <ul>
//             {jobDescription.qualifications?.length > 0 ? (
//               jobDescription.qualifications.map((qualification, index) => (
//                 <li key={index}>{qualification}</li>
//               ))
//             ) : (
//               <li>No qualifications listed.</li>
//             )}
//           </ul>

//           <h4>Benefits:</h4>
//           <ul>
//             {jobDescription.benefits?.length > 0 ? (
//               jobDescription.benefits.map((benefit, index) => (
//                 <li key={index}>{benefit}</li>
//               ))
//             ) : (
//               <li>No benefits listed.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;
