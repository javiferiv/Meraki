import React, { Component } from 'react'
import './Poll.css'

import Poll from 'react-polls'

const pollAnswers1 = [
    { option: 'Muere', votes: 7 },
    { option: 'Permanece en el hospital', votes: 2 },
    { option: 'Vive', votes: 5 },
]

const pollStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'red'
}

const pollAnswers2 = [
    { option: 'Casa', votes: 4 },
    { option: 'Dormir', votes: 8 },
    { option: 'Correr', votes: 1 },
]



export default class thePoll extends Component {
    
    state = {
        pollAnswers1: [...pollAnswers1],
        pollAnswers2: [...pollAnswers2]
    }

    handleVote = (voteAnswer, pollAnswers, pollNumber) => {
        const newPollAnswers = pollAnswers.map(answer => {
            if (answer.option === voteAnswer) answer.votes++
            return answer
        })

        if (pollNumber === 1) {
            this.setState({
                pollAnswers1: newPollAnswers
            })
        }
    }

    componentDidMount() {
        const { pollAnswers1 } = this.state
        this.autoAddVotes(pollAnswers1, 1)
    }

    autoAddVotes = (pollAnswers, pollNumber) => {
        setTimeout(() => {
            const choseAnswer = parseInt(Math.random() * 2, 10)
            this.handleVote(pollAnswers[choseAnswer].option, pollAnswers, pollNumber)
            this.autoAddVotes(pollAnswers, pollNumber)
        }, Math.random() * 5000)
    }

    render() {
        const { pollAnswers1 } = this.state

        return (
            <>
            <Poll className='poll main' answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles} noStorage />
            <Poll className='poll main' answers={pollAnswers2} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles} noStorage />
            </>
            )
    }
}