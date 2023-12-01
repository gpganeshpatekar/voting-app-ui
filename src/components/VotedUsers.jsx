import React from 'react'

const VotedUsers = ({ candidate }) => {
    console.log(candidate, "VotedUsers");
    const sortedVotedUsers = candidate.votedUsers.sort((a, b) => b.id - a.id);
    return (
        <div className='votedUsers'>
            <h5>Voted Users Name</h5>
            {
                sortedVotedUsers.map((votedUser) => (
                    <span key={votedUser.id}>{votedUser.username}</span>
                ))
            }
        </div>
    )
}

export default VotedUsers