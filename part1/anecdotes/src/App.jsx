import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

//This component shows the anecdote with its votes
const StatisticLine = ({ text, voteCount }) => (
  <>
    <div>{text}</div>
    <div>
      has {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
    </div>
  </>
);

const MostVotes = ({ votes, anecdotes }) => {
  const maxVotes = Math.max(...votes);
  const maxVotesIndex = votes.indexOf(maxVotes);
  const maxVotesAnecdote = anecdotes[maxVotesIndex];

  if (maxVotes === 0) {
    return <div>Nothing is voted yet</div>;
  }

  return (
    <StatisticLine text={maxVotesAnecdote} voteCount={maxVotes} />
  );
};


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      <StatisticLine text={anecdotes[selected]} voteCount={votes[selected]} />
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleNextClick} text='next anecdote'/>
      <h1>Anecdote with the most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes}/>
    </>
  );
}

export default App;