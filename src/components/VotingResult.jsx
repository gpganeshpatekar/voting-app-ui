import React, { useEffect, useState } from 'react'
import { PUBLIC_AXIOS } from '../services/axios-config';

const VotingResult = () => {

    const [elections, setElections] = useState([]);

    useEffect(() => {
        fetchAllElections();
    }, [])

    console.log(elections);

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
                    elections[0]?.candidates.map((e, index) => {
                        return <>
                            <div key={index}>
                                <h4>{e.name}<span className='votes'>{e.votes}</span></h4>
                            </div>
                        </>
                    })
                }
            </section>
        </div>
    )
}

export default VotingResult