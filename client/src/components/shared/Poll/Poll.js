import React, { Component } from 'react'
import './Poll.css'

import Poll from 'react-polls'

const pollQuestion1 = 'La Casa Maldita'
const pollAnswers1 = [
    { option: 'Visitar el cementerio', votes: 7 },
    { option: 'Salir de la casa', votes: 2 },
    { option: 'Encender la chimenea', votes: 5 }
]

const pollQuestion2 = 'Los mejores coches de la última década'
const pollAnswers2 = [
    { option: 'Alpine A110', votes: 7 },
    { option: 'Ford Mustang VI', votes: 8 },
    { option: 'Porsche Taycan', votes: 7 }
]

const pollQuestion3 = 'El túnel misterioso'
const pollAnswers3 = [
    { option: 'La familia desaparece', votes: 4 },
    { option: 'El coche se queda parado en el túnel', votes: 8 },
    { option: 'Uno de los niños logra escapar', votes: 1 }
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