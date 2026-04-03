import React, { useState } from 'react';
import './App.css';

function App() {
  const [phase, setPhase] = useState('menu');
  const [openPlayInput, setOpenPlayInput] = useState('');
  const [openPlayCourtCount, setOpenPlayCourtCount] = useState('1');
  const [openPlayError, setOpenPlayError] = useState('');
  const [openPlayTeams, setOpenPlayTeams] = useState([]);
  const [openPlayMatches, setOpenPlayMatches] = useState([]);
  const [openPlayLog, setOpenPlayLog] = useState([]);

  const [playerInput, setPlayerInput] = useState('');
  const [tournamentError, setTournamentError] = useState('');
  const [teams, setTeams] = useState([]);

  const [roundRobinMatches, setRoundRobinMatches] = useState([]);
  const [matchLog, setMatchLog] = useState([]);

  const [bracketMatches, setBracketMatches] = useState([]);
  const [winnerBracketState, setWinnerBracketState] = useState({
    currentTeams: [],
    round: 1,
    champion: null,
  });
  const [loserBracketState, setLoserBracketState] = useState({
    currentTeams: [],
    round: 1,
    champion: null,
  });

  const [finalMatch, setFinalMatch] = useState(null);
  const [finalChampion, setFinalChampion] = useState('');

  function resetApp() {
    setPhase('menu');
    setOpenPlayInput('');
    setOpenPlayCourtCount('1');
    setOpenPlayError('');
    setOpenPlayTeams([]);
    setOpenPlayMatches([]);
    setOpenPlayLog([]);
    setPlayerInput('');
    setTournamentError('');
    setTeams([]);
    setRoundRobinMatches([]);
    setMatchLog([]);
    setBracketMatches([]);
    setWinnerBracketState({
      currentTeams: [],
      round: 1,
      champion: null,
    });
    setLoserBracketState({
      currentTeams: [],
      round: 1,
      champion: null,
    });
    setFinalMatch(null);
    setFinalChampion('');
  }

  function shuffleArray(array) {
    const copied = [...array];

    for (let i = copied.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = copied[i];
      copied[i] = copied[randomIndex];
      copied[randomIndex] = temp;
    }

    return copied;
  }

  function randomizeOpenPlay() {
    const openPlayNames = openPlayInput
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name !== '');
    const courtTotal = Number(openPlayCourtCount);

    if (openPlayNames.length < 4) {
      setOpenPlayError('Please enter at least 4 player names for open play.');
      setOpenPlayTeams([]);
      setOpenPlayMatches([]);
      return;
    }

    if (openPlayNames.length % 2 !== 0) {
      setOpenPlayError('Please enter an even number of player names for open play.');
      setOpenPlayTeams([]);
      setOpenPlayMatches([]);
      return;
    }

    if (!courtTotal || courtTotal < 1) {
      setOpenPlayError('Please enter at least 1 court.');
      setOpenPlayTeams([]);
      setOpenPlayMatches([]);
      return;
    }

    const shuffledPlayers = shuffleArray(openPlayNames);
    const createdTeams = [];

    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      createdTeams.push({
        id: i / 2 + 1,
        name: `Open Team ${i / 2 + 1}`,
        players: [shuffledPlayers[i], shuffledPlayers[i + 1]],
        displayName: `${shuffledPlayers[i]} & ${shuffledPlayers[i + 1]}`,
      });
    }

    const createdMatches = [];
    let matchId = 1;

    for (let i = 0; i < createdTeams.length; i += 1) {
      for (let j = i + 1; j < createdTeams.length; j += 1) {
        const queueIndex = createdMatches.length;

        createdMatches.push({
          id: matchId,
          teamA: createdTeams[i].displayName,
          teamB: createdTeams[j].displayName,
          winner: '',
          played: false,
          round: Math.floor(queueIndex / courtTotal) + 1,
          court: (queueIndex % courtTotal) + 1,
        });

        matchId += 1;
      }
    }

    setOpenPlayTeams(createdTeams);
    setOpenPlayMatches(createdMatches);
    setOpenPlayLog([]);
    setOpenPlayError('');
  }

  function recordOpenPlayWinner(matchId, winnerName) {
    const updatedMatches = openPlayMatches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          winner: winnerName,
          played: true,
        };
      }

      return match;
    });

    const selectedMatch = updatedMatches.find((match) => match.id === matchId);
    setOpenPlayMatches(updatedMatches);

    if (selectedMatch) {
      const loserName =
        selectedMatch.teamA === winnerName ? selectedMatch.teamB : selectedMatch.teamA;

      setOpenPlayLog((previousLog) => [
        ...previousLog,
        `Round ${selectedMatch.round} - Court ${selectedMatch.court}: ${winnerName} defeated ${loserName}`,
      ]);
    }
  }

  function getOpenPlayStandings() {
    const standings = openPlayTeams.map((team) => ({
      name: team.displayName,
      wins: 0,
      losses: 0,
      played: 0,
    }));

    openPlayMatches.forEach((match) => {
      if (match.played) {
        const teamARecord = standings.find((item) => item.name === match.teamA);
        const teamBRecord = standings.find((item) => item.name === match.teamB);

        if (teamARecord && teamBRecord) {
          teamARecord.played += 1;
          teamBRecord.played += 1;

          if (match.winner === match.teamA) {
            teamARecord.wins += 1;
            teamBRecord.losses += 1;
          } else if (match.winner === match.teamB) {
            teamBRecord.wins += 1;
            teamARecord.losses += 1;
          }
        }
      }
    });

    standings.sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      return a.losses - b.losses;
    });

    return standings;
  }

  function createTeams() {
    const cleanedNames = playerInput
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name !== '');

    if (cleanedNames.length < 4) {
      setTournamentError('Please enter at least 4 player names.');
      return;
    }

    if (cleanedNames.length % 2 !== 0) {
      setTournamentError('Please enter an even number of player names.');
      return;
    }

    const newTeams = [];

    for (let i = 0; i < cleanedNames.length; i += 2) {
      newTeams.push({
        id: i / 2 + 1,
        name: `Team ${i / 2 + 1}`,
        players: [cleanedNames[i], cleanedNames[i + 1]],
        displayName: `${cleanedNames[i]} & ${cleanedNames[i + 1]}`,
        originalOrder: i / 2,
      });
    }

    setTeams(newTeams);
    setTournamentError('');
    setPhase('teamView');
  }

  function generateRoundRobinMatches(teamList) {
    const matches = [];
    let matchId = 1;

    for (let i = 0; i < teamList.length; i += 1) {
      for (let j = i + 1; j < teamList.length; j += 1) {
        matches.push({
          id: matchId,
          teamA: teamList[i].displayName,
          teamB: teamList[j].displayName,
          winner: '',
          played: false,
        });
        matchId += 1;
      }
    }

    return matches;
  }

  function startRoundRobin() {
    if (teams.length < 2) {
      setTournamentError('You need at least 2 teams to start round robin.');
      return;
    }

    const matches = generateRoundRobinMatches(teams);
    setRoundRobinMatches(matches);
    setMatchLog([]);
    setTournamentError('');
    setPhase('roundRobinView');
  }

  function recordRoundRobinWinner(matchId, winnerName) {
    const updatedMatches = roundRobinMatches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          winner: winnerName,
          played: true,
        };
      }

      return match;
    });

    const selectedMatch = updatedMatches.find((match) => match.id === matchId);

    setRoundRobinMatches(updatedMatches);

    if (selectedMatch) {
      const loserName =
        selectedMatch.teamA === winnerName ? selectedMatch.teamB : selectedMatch.teamA;

      setMatchLog((previousLog) => [
        ...previousLog,
        `${winnerName} defeated ${loserName}`,
      ]);
    }
  }

  function getStandings(matchList) {
    const standings = teams.map((team) => ({
      name: team.displayName,
      wins: 0,
      losses: 0,
      played: 0,
      originalOrder: team.originalOrder,
    }));

    matchList.forEach((match) => {
      if (match.played) {
        const teamARecord = standings.find((item) => item.name === match.teamA);
        const teamBRecord = standings.find((item) => item.name === match.teamB);

        if (teamARecord && teamBRecord) {
          teamARecord.played += 1;
          teamBRecord.played += 1;

          if (match.winner === match.teamA) {
            teamARecord.wins += 1;
            teamBRecord.losses += 1;
          } else if (match.winner === match.teamB) {
            teamBRecord.wins += 1;
            teamARecord.losses += 1;
          }
        }
      }
    });

    standings.sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }

      if (a.losses !== b.losses) {
        return a.losses - b.losses;
      }

      return a.originalOrder - b.originalOrder;
    });

    return standings;
  }

  function generateBracketRoundMatches(teamList, bracketType, roundNumber) {
    const matches = [];
    const autoAdvanceTeams = [];
    let startIndex = 0;
    let matchId = 1;

    if (teamList.length % 2 !== 0 && teamList.length > 1) {
      autoAdvanceTeams.push(teamList[0]);
      startIndex = 1;
    }

    for (let i = startIndex; i < teamList.length; i += 2) {
      if (teamList[i + 1]) {
        const currentId = `${bracketType}-${roundNumber}-${matchId}`;

        matches.push({
          id: currentId,
          teamA: teamList[i].displayName,
          teamB: teamList[i + 1].displayName,
          winner: '',
          played: false,
          bracketType: bracketType,
          round: roundNumber,
        });

        matchId += 1;
      }
    }

    return {
      matches,
      autoAdvanceTeams,
    };
  }

  function createBrackets() {
    const standings = getStandings(roundRobinMatches);
    const sortedTeams = standings
      .map((standing) => teams.find((team) => team.displayName === standing.name))
      .filter(Boolean);

    if (sortedTeams.length < 2) {
      return;
    }

    const splitPoint = Math.ceil(sortedTeams.length / 2);
    const winnerTeams = sortedTeams.slice(0, splitPoint);
    const loserTeams = sortedTeams.slice(splitPoint);

    const winnerRoundInfo = generateBracketRoundMatches(winnerTeams, 'winner', 1);
    const loserRoundInfo = generateBracketRoundMatches(loserTeams, 'loser', 1);

    setBracketMatches([...winnerRoundInfo.matches, ...loserRoundInfo.matches]);

    setWinnerBracketState({
      currentTeams: winnerTeams,
      round: 1,
      champion: winnerTeams.length === 1 ? winnerTeams[0] : null,
    });

    setLoserBracketState({
      currentTeams: loserTeams,
      round: 1,
      champion: loserTeams.length === 1 ? loserTeams[0] : null,
    });

    const automaticFinalMatch = createFinalMatch(
      winnerTeams.length === 1 ? winnerTeams[0] : null,
      loserTeams.length === 1 ? loserTeams[0] : null
    );

    if (automaticFinalMatch) {
      setFinalMatch(automaticFinalMatch);
      setFinalChampion('');
      setPhase('finalResult');
    } else {
      setFinalMatch(null);
      setFinalChampion('');
      setPhase('bracketView');
    }
  }

  function getTeamByName(teamName) {
    return teams.find((team) => team.displayName === teamName) || null;
  }

  function buildNextBracketState(stateObject, updatedMatches, bracketType) {
    if (!stateObject.currentTeams.length || stateObject.champion) {
      return {
        state: stateObject,
        newMatches: [],
      };
    }

    const currentRoundMatches = updatedMatches.filter(
      (match) => match.bracketType === bracketType && match.round === stateObject.round
    );

    if (!currentRoundMatches.length || !currentRoundMatches.every((match) => match.played)) {
      return {
        state: stateObject,
        newMatches: [],
      };
    }

    const roundInfo = generateBracketRoundMatches(
      stateObject.currentTeams,
      bracketType,
      stateObject.round
    );

    const winningTeams = currentRoundMatches
      .map((match) => getTeamByName(match.winner))
      .filter(Boolean);

    const nextTeams = [...roundInfo.autoAdvanceTeams, ...winningTeams];

    if (nextTeams.length <= 1) {
      return {
        state: {
          currentTeams: nextTeams,
          round: stateObject.round,
          champion: nextTeams[0] || null,
        },
        newMatches: [],
      };
    }

    const nextRoundInfo = generateBracketRoundMatches(
      nextTeams,
      bracketType,
      stateObject.round + 1
    );

    return {
      state: {
        currentTeams: nextTeams,
        round: stateObject.round + 1,
        champion: null,
      },
      newMatches: nextRoundInfo.matches,
    };
  }

  function createFinalMatch(winnerChampion, loserChampion) {
    if (!winnerChampion || !loserChampion) {
      return null;
    }

    return {
      id: 'final-match',
      teamA: winnerChampion.displayName,
      teamB: loserChampion.displayName,
      winner: '',
      played: false,
    };
  }

  function recordBracketWinner(matchId, winnerName) {
    let updatedMatches = bracketMatches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          winner: winnerName,
          played: true,
        };
      }

      return match;
    });

    const chosenMatch = updatedMatches.find((match) => match.id === matchId);
    let nextWinnerState = winnerBracketState;
    let nextLoserState = loserBracketState;

    if (chosenMatch) {
      if (chosenMatch.bracketType === 'winner') {
        const winnerResult = buildNextBracketState(
          winnerBracketState,
          updatedMatches,
          'winner'
        );

        nextWinnerState = winnerResult.state;
        updatedMatches = [...updatedMatches, ...winnerResult.newMatches];
      }

      if (chosenMatch.bracketType === 'loser') {
        const loserResult = buildNextBracketState(
          loserBracketState,
          updatedMatches,
          'loser'
        );

        nextLoserState = loserResult.state;
        updatedMatches = [...updatedMatches, ...loserResult.newMatches];
      }
    }

    setBracketMatches(updatedMatches);
    setWinnerBracketState(nextWinnerState);
    setLoserBracketState(nextLoserState);

    const possibleFinalMatch = createFinalMatch(
      nextWinnerState.champion,
      nextLoserState.champion
    );

    if (possibleFinalMatch) {
      setFinalMatch(possibleFinalMatch);
      setFinalChampion('');
      setPhase('finalResult');
    }
  }

  function recordFinalWinner(winnerName) {
    if (!finalMatch) {
      return;
    }

    setFinalMatch({
      ...finalMatch,
      winner: winnerName,
      played: true,
    });
    setFinalChampion(winnerName);
  }

  const openPlayStandings = getOpenPlayStandings();
  const standings = getStandings(roundRobinMatches);
  const allRoundRobinPlayed =
    roundRobinMatches.length > 0 && roundRobinMatches.every((match) => match.played);
  const winnerBracketChampion = winnerBracketState.champion
    ? winnerBracketState.champion.displayName
    : '';
  const loserBracketChampion = loserBracketState.champion
    ? loserBracketState.champion.displayName
    : '';

  return (
    <div className="app">
      <div className="app-card">
        <h1 className="title">Pickleball Match Organizer</h1>
        <p className="app-subtitle">Built for quick match organizing on phones and tablets.</p>

        {phase === 'menu' && (
          <div className="section">
            <div className="result-box intro-box">
              <h2 className="section-title">Choose a Mode</h2>
              <p className="empty-text">
                Open Play lets you shuffle from a list of player names. Tournament Mode builds
                teams, standings, brackets, and a final champion.
              </p>
            </div>
            <div className="button-group">
              <button className="main-button" onClick={() => setPhase('openPlay')}>
                Open Play Mode
              </button>
              <button
                className="main-button"
                onClick={() => {
                  setTournamentError('');
                  setPhase('tournamentSetup');
                }}
              >
                Tournament Mode
              </button>
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
            </div>
          </div>
        )}

        {phase === 'openPlay' && (
          <div className="section">
            <h2 className="section-title">Open Play Mode</h2>
            <label className="label">How many courts are available?</label>
            <input
              className="text-input"
              type="number"
              min="1"
              value={openPlayCourtCount}
              onChange={(event) => setOpenPlayCourtCount(event.target.value)}
              placeholder="Enter number of courts"
            />

            <label className="label">Enter player names, one per line</label>
            <textarea
              className="text-area"
              value={openPlayInput}
              onChange={(event) => setOpenPlayInput(event.target.value)}
              placeholder={'Alex\nSam\nMia\nJohn'}
              rows="8"
            />

            {openPlayError && <p className="error-message">{openPlayError}</p>}

            <div className="button-group">
              <button className="main-button" onClick={randomizeOpenPlay}>
                Randomize Schedule
              </button>
              <button className="secondary-button" onClick={randomizeOpenPlay}>
                Shuffle Again
              </button>
              <button className="secondary-button" onClick={() => setPhase('menu')}>
                Back to Menu
              </button>
            </div>

            {openPlayTeams.length > 0 && (
              <div className="result-box">
                <h3 className="sub-title">Randomized Open Play Teams</h3>
                <div className="player-list">
                  {openPlayTeams.map((team) => (
                    <div className="small-card" key={team.id}>
                      <strong>{team.name}:</strong> {team.displayName}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openPlayMatches.length > 0 && (
              <>
                <div className="result-box">
                  <h3 className="sub-title">Open Play Match Schedule</h3>
                  <div className="match-list">
                    {openPlayMatches.map((match) => (
                      <div className="match-card" key={match.id}>
                        <div className="match-top-row">
                          <span className="match-badge">Round {match.round}</span>
                          <span className="match-badge">Court {match.court}</span>
                        </div>
                        <div className="match-name">
                          {match.teamA} vs {match.teamB}
                        </div>

                        {!match.played ? (
                          <div className="button-group">
                            <button
                              className="small-button"
                              onClick={() => recordOpenPlayWinner(match.id, match.teamA)}
                            >
                              {match.teamA} Wins
                            </button>
                            <button
                              className="small-button"
                              onClick={() => recordOpenPlayWinner(match.id, match.teamB)}
                            >
                              {match.teamB} Wins
                            </button>
                          </div>
                        ) : (
                          <div className="winner-text">Winner: {match.winner}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="standings-box">
                  <h3 className="sub-title">Open Play Standings</h3>
                  <div className="table-wrap">
                    <table className="standings-table">
                      <thead>
                        <tr>
                          <th>Team</th>
                          <th>Wins</th>
                          <th>Losses</th>
                          <th>Played</th>
                        </tr>
                      </thead>
                      <tbody>
                        {openPlayStandings.map((team) => (
                          <tr key={team.name}>
                            <td>{team.name}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.played}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="log-box">
                  <h3 className="sub-title">Open Play History</h3>
                  {openPlayLog.length === 0 ? (
                    <p className="empty-text">No open play results recorded yet.</p>
                  ) : (
                    openPlayLog.map((logItem, index) => (
                      <div className="log-item" key={`${logItem}-${index}`}>
                        {logItem}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {phase === 'tournamentSetup' && (
          <div className="section">
            <h2 className="section-title">Tournament Mode Setup</h2>
            <label className="label">Enter player names, one per line</label>
            <textarea
              className="text-area"
              value={playerInput}
              onChange={(event) => setPlayerInput(event.target.value)}
              placeholder={'Alex\nSam\nMia\nJohn'}
              rows="10"
            />

            {tournamentError && <p className="error-message">{tournamentError}</p>}

            <div className="button-group">
              <button className="main-button" onClick={createTeams}>
                Create Teams
              </button>
              <button className="secondary-button" onClick={() => setPhase('menu')}>
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {phase === 'teamView' && (
          <div className="section">
            <h2 className="section-title">Team View</h2>

            {teams.map((team) => (
              <div className="match-card" key={team.id}>
                <strong>{team.name}:</strong> {team.displayName}
              </div>
            ))}

            {tournamentError && <p className="error-message">{tournamentError}</p>}

            <div className="button-group">
              <button className="main-button" onClick={startRoundRobin}>
                Start Round Robin
              </button>
              <button className="secondary-button" onClick={() => setPhase('tournamentSetup')}>
                Back to Tournament Setup
              </button>
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
            </div>
          </div>
        )}

        {phase === 'roundRobinView' && (
          <div className="section">
            <h2 className="section-title">Round Robin Matches</h2>

            <div className="match-list">
              {roundRobinMatches.map((match) => (
                <div className="match-card" key={match.id}>
                  <div className="match-name">
                    {match.teamA} vs {match.teamB}
                  </div>

                  {!match.played ? (
                    <div className="button-group">
                      <button
                        className="small-button"
                        onClick={() => recordRoundRobinWinner(match.id, match.teamA)}
                      >
                        Team A Wins
                      </button>
                      <button
                        className="small-button"
                        onClick={() => recordRoundRobinWinner(match.id, match.teamB)}
                      >
                        Team B Wins
                      </button>
                    </div>
                  ) : (
                    <div className="winner-text">Winner: {match.winner}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="standings-box">
              <h3 className="sub-title">Standings</h3>
              <div className="table-wrap">
                <table className="standings-table">
                  <thead>
                    <tr>
                      <th>Team</th>
                      <th>Wins</th>
                      <th>Losses</th>
                      <th>Played</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => (
                      <tr key={team.name}>
                        <td>{team.name}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.played}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="log-box">
              <h3 className="sub-title">Match Log / History</h3>
              {matchLog.length === 0 ? (
                <p className="empty-text">No matches played yet.</p>
              ) : (
                matchLog.map((logItem, index) => (
                  <div className="log-item" key={`${logItem}-${index}`}>
                    {logItem}
                  </div>
                ))
              )}
            </div>

            <div className="button-group">
              <button className="secondary-button" onClick={() => setPhase('teamView')}>
                Back to Team View
              </button>
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
              {allRoundRobinPlayed && (
                <button className="main-button" onClick={createBrackets}>
                  Create Brackets
                </button>
              )}
            </div>
          </div>
        )}

        {phase === 'bracketView' && (
          <div className="section">
            <h2 className="section-title">Bracket View</h2>

            <div className="bracket-section">
              <h3 className="sub-title">Winner Bracket</h3>
              {winnerBracketChampion ? (
                <div className="champion-box">Winner Bracket Champion: {winnerBracketChampion}</div>
              ) : (
                bracketMatches
                  .filter((match) => match.bracketType === 'winner')
                  .map((match) => (
                    <div className="match-card" key={match.id}>
                      <div className="match-name">
                        Round {match.round}: {match.teamA} vs {match.teamB}
                      </div>
                      {!match.played ? (
                        <div className="button-group">
                          <button
                            className="small-button"
                            onClick={() => recordBracketWinner(match.id, match.teamA)}
                          >
                            Team A Wins
                          </button>
                          <button
                            className="small-button"
                            onClick={() => recordBracketWinner(match.id, match.teamB)}
                          >
                            Team B Wins
                          </button>
                        </div>
                      ) : (
                        <div className="winner-text">Winner: {match.winner}</div>
                      )}
                    </div>
                  ))
              )}

              {!winnerBracketChampion &&
                bracketMatches.filter((match) => match.bracketType === 'winner').length === 0 && (
                  <div className="small-card">No winner bracket matches were needed.</div>
                )}
            </div>

            <div className="bracket-section">
              <h3 className="sub-title">Loser Bracket</h3>
              {loserBracketChampion ? (
                <div className="champion-box">Loser Bracket Champion: {loserBracketChampion}</div>
              ) : (
                bracketMatches
                  .filter((match) => match.bracketType === 'loser')
                  .map((match) => (
                    <div className="match-card" key={match.id}>
                      <div className="match-name">
                        Round {match.round}: {match.teamA} vs {match.teamB}
                      </div>
                      {!match.played ? (
                        <div className="button-group">
                          <button
                            className="small-button"
                            onClick={() => recordBracketWinner(match.id, match.teamA)}
                          >
                            Team A Wins
                          </button>
                          <button
                            className="small-button"
                            onClick={() => recordBracketWinner(match.id, match.teamB)}
                          >
                            Team B Wins
                          </button>
                        </div>
                      ) : (
                        <div className="winner-text">Winner: {match.winner}</div>
                      )}
                    </div>
                  ))
              )}

              {!loserBracketChampion &&
                bracketMatches.filter((match) => match.bracketType === 'loser').length === 0 && (
                  <div className="small-card">No loser bracket matches were needed.</div>
                )}
            </div>

            <div className="button-group">
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
            </div>
          </div>
        )}

        {phase === 'finalResult' && (
          <div className="section">
            <h2 className="section-title">Final Result</h2>

            <div className="result-box">
              <div className="champion-box">
                Winner Bracket Champion: {winnerBracketChampion || 'Not decided yet'}
              </div>
              <div className="champion-box">
                Loser Bracket Champion: {loserBracketChampion || 'Not decided yet'}
              </div>
            </div>

            {finalMatch && (
              <div className="match-card">
                <div className="match-name">
                  Final Championship: {finalMatch.teamA} vs {finalMatch.teamB}
                </div>

                {!finalMatch.played ? (
                  <div className="button-group">
                    <button
                      className="small-button"
                      onClick={() => recordFinalWinner(finalMatch.teamA)}
                    >
                      {finalMatch.teamA} Wins Final
                    </button>
                    <button
                      className="small-button"
                      onClick={() => recordFinalWinner(finalMatch.teamB)}
                    >
                      {finalMatch.teamB} Wins Final
                    </button>
                  </div>
                ) : (
                  <div className="winner-text">Final Match Winner: {finalMatch.winner}</div>
                )}
              </div>
            )}

            {finalChampion && (
              <div className="champion-result">
                Tournament Champion: {finalChampion}
              </div>
            )}

            <div className="button-group">
              <button className="main-button" onClick={() => setPhase('menu')}>
                Back to Menu
              </button>
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
