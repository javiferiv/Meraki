import React, { Component } from 'react'
import './Poll.css'

import Poll from 'react-polls'

const pollQuestion1 = 'Libro 1'
const pollAnswers1 = [
    { option: 'Muere', votes: 7 },
    { option: 'Permanece en el hospital', votes: 2 },
    { option: 'Vive', votes: 5 },
]

const pollQuestion2 = 'Libro 2'
const pollAnswers2 = [
    { option: 'Casa', votes: 4 },
    { option: 'Dormir', votes: 8 },
    { option: 'Correr', votes: 1 },
]

const pollQuestion3 = 'Libro 3'
const pollAnswers3 = [
    { option: 'Va al parque', votes: 4 },
    { option: 'Va de cruising', votes: 8 },
    { option: 'Se queda en casa', votes: 1 },
]

const pollStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'red'
}



export default class thePoll extends Component {
    
    state = {
        pollAnswers1: [...pollAnswers1],
        pollAnswers2: [...pollAnswers2], 
        pollAnswers3: [...pollAnswers3]

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
        const { pollAnswers1, pollAnswers2, pollAnswers3 } = this.state

        return (
            <>
                <Poll className='poll main' question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles} noStorage />
                <Poll className='poll main' question={pollQuestion2} answers={pollAnswers2} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers2, 1)} customStyles={pollStyles} noStorage />
                <Poll className='poll main' question={pollQuestion3} answers={pollAnswers3} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers3, 1)} customStyles={pollStyles} noStorage />
            </>
            )
    }
}