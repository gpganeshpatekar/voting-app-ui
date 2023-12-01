import React, { useEffect, useState } from 'react'
import { PUBLIC_AXIOS } from '../services/axios-config';
import VotedUsers from './VotedUsers';

const VotingResult = () => {


    const [elections, setElections] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleCandidateClick = (candidateId) => {

        if (selectedCandidate === candidateId) {
            setSelectedCandidate(null);
        } else {
            setSelectedCandidate(candidateId)
        }

    }


    useEffect(() => {
        fetchAllElections();
    }, [])


    const fetchAllElections = async () => {

        try {
            const response = await PUBLIC_AXIOS.get('/elections/elections-info');
            setElections(response.data);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='voting-result'>
            <section>
                <div>
                    <h2>VOTING RESULT</h2>
                </div>
                {
                    elections[0]?.candidates.map((candidate) => (

                        <div key={candidate.id}>
                            <h4>{candidate.name}<span className='votes' onClick={() => handleCandidateClick(candidate.id)}>{candidate.votes}</span></h4>
                            {
                                selectedCandidate === candidate.id && <VotedUsers candidate={candidate} />
                            }
                            </div>

                    ))

                }
            </section>
        </div>
    )
}

export default VotingResult