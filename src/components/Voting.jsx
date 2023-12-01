import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/userContext';
import { PRIVATE_AXIOS, PUBLIC_AXIOS } from '../services/axios-config';

const Voting = () => {

    const { user } = useContext(userContext);

    const [elections, setElections] = useState([]);
    const [voted, setVoted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [vote, setVote] = useState({
        electionId: 0,
        voterId: user.data?.id,
        candidateId: 0
    })

    useEffect(() => {
        fetchAllElections();
    }, [])

    const mytoken = sessionStorage.getItem('data').token;
    console.log(mytoken);

    const fetchAllElections = async () => {

        try {
            const response = await PUBLIC_AXIOS.get('/elections/elections-info');
            setElections(response.data);
            setVote(prevVote => ({
                ...prevVote,
                electionId: response.data[0].id // Set election ID from the first election
            }));
        } catch (error) {
            console.log(error);


        }
    }

    const handleSubmitVote = async (e) => {
        e.preventDefault();
        console.log("vote details", vote)
        try {
            const response = await PRIVATE_AXIOS.post('vote', vote);
            console.log('Vote submitted:', response);
            setVote({ ...vote, 'candidateId': 0 })
            setVoted(true)
            setSuccessMessage('You have successfully voted.')
            // You can perform any additional actions here, such as showing a success message
        } catch (error) {
            console.error('Error submitting vote:', error);
            // You can show an error message or perform other error handling
        }


    }

    const isVoted = elections.some(election => election.voters.some(v => v.id === user.data?.id));


    return (
        <div className='evm'>
            <form onSubmit={handleSubmitVote}>
                {
                    (isVoted === false) ?
                        <>
                            <div>
                                <h2>VOTE HERE</h2>
                            </div>
                            {
                                elections[0]?.candidates.map((candidate) => (
                                    <>
                                        <div key={candidate.id}>
                                            <input type='radio' name='candidateId' value={candidate.id}
                                                onChange={() => {
                                                    setVote(prevVote => ({
                                                        ...prevVote,
                                                        candidateId: candidate.id,
                                                    }))
                                                }}
                                            />&nbsp;<label htmlFor='candidate'>{candidate.name}</label>
                                        </div>
                                    </>
                                ))
                            }
                            <div className='vote-btn'>
                                <button type='submit' disabled={voted === true}>Vote</button>

                            </div>

                                {
                                (voted === true) ? <div><h3 className='success'>{successMessage}</h3></div> : ''
                                }

                        </> :
                        <>
                            <div className='voted'>
                                <h4>You Have Already Voted</h4>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}

export default Voting