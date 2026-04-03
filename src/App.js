import React, { useEffect, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'pickleball-match-organizer-state';

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
  const [scoreboardMatch, setScoreboardMatch] = useState(null);
  const [scoreboardSource, setScoreboardSource] = useState(null);
  const [scoreboardReturnPhase, setScoreboardReturnPhase] = useState('menu');
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [servingTeam, setServingTeam] = useState('A');
  const [serverNumber, setServerNumber] = useState(1);
  const [scoreboardWinner, setScoreboardWinner] = useState('');
  const [scoreboardLog, setScoreboardLog] = useState([]);
  const [scoreUndoStack, setScoreUndoStack] = useState([]);
  const [finishedGames, setFinishedGames] = useState([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        setPhase(parsedState.phase || 'menu');
        setOpenPlayInput(parsedState.openPlayInput || '');
        setOpenPlayCourtCount(parsedState.openPlayCourtCount || '1');
        setOpenPlayError(parsedState.openPlayError || '');
        setOpenPlayTeams(parsedState.openPlayTeams || []);
        setOpenPlayMatches(parsedState.openPlayMatches || []);
        setOpenPlayLog(parsedState.openPlayLog || []);
        setPlayerInput(parsedState.playerInput || '');
        setTournamentError(parsedState.tournamentError || '');
        setTeams(parsedState.teams || []);
        setRoundRobinMatches(parsedState.roundRobinMatches || []);
        setMatchLog(parsedState.matchLog || []);
        setBracketMatches(parsedState.bracketMatches || []);
        setWinnerBracketState(
          parsedState.winnerBracketState || {
            currentTeams: [],
            round: 1,
            champion: null,
          }
        );
        setLoserBracketState(
          parsedState.loserBracketState || {
            currentTeams: [],
            round: 1,
            champion: null,
          }
        );
        setFinalMatch(parsedState.finalMatch || null);
        setFinalChampion(parsedState.finalChampion || '');
        setScoreboardMatch(parsedState.scoreboardMatch || null);
        setScoreboardSource(parsedState.scoreboardSource || null);
        setScoreboardReturnPhase(parsedState.scoreboardReturnPhase || 'menu');
        setTeamAScore(parsedState.teamAScore || 0);
        setTeamBScore(parsedState.teamBScore || 0);
        setServingTeam(parsedState.servingTeam || 'A');
        setServerNumber(parsedState.serverNumber || 1);
        setScoreboardWinner(parsedState.scoreboardWinner || '');
        setScoreboardLog(parsedState.scoreboardLog || []);
        setScoreUndoStack(parsedState.scoreUndoStack || []);
        setFinishedGames(parsedState.finishedGames || []);
      } catch (error) {
        console.log('Saved app data could not be loaded.');
      }
    }

    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        phase,
        openPlayInput,
        openPlayCourtCount,
        openPlayError,
        openPlayTeams,
        openPlayMatches,
        openPlayLog,
        playerInput,
        tournamentError,
        teams,
        roundRobinMatches,
        matchLog,
        bracketMatches,
        winnerBracketState,
        loserBracketState,
        finalMatch,
        finalChampion,
        scoreboardMatch,
        scoreboardSource,
        scoreboardReturnPhase,
        teamAScore,
        teamBScore,
        servingTeam,
        serverNumber,
        scoreboardWinner,
        scoreboardLog,
        scoreUndoStack,
        finishedGames,
      })
    );
  }, [
    hasLoadedStorage,
    phase,
    openPlayInput,
    openPlayCourtCount,
    openPlayError,
    openPlayTeams,
    openPlayMatches,
    openPlayLog,
    playerInput,
    tournamentError,
    teams,
    roundRobinMatches,
    matchLog,
    bracketMatches,
    winnerBracketState,
    loserBracketState,
    finalMatch,
    finalChampion,
    scoreboardMatch,
    scoreboardSource,
    scoreboardReturnPhase,
    teamAScore,
    teamBScore,
    servingTeam,
    serverNumber,
    scoreboardWinner,
    scoreboardLog,
    scoreUndoStack,
    finishedGames,
  ]);

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
    setScoreboardMatch(null);
    setScoreboardSource(null);
    setScoreboardReturnPhase('menu');
    setTeamAScore(0);
    setTeamBScore(0);
    setServingTeam('A');
    setServerNumber(1);
    setScoreboardWinner('');
    setScoreboardLog([]);
    setScoreUndoStack([]);
    setFinishedGames([]);
    localStorage.removeItem(STORAGE_KEY);
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

    const remainingMatches = [];
    const createdMatches = [];
    const lastPlayedRound = {};
    let matchId = 1;
    let currentRound = 1;

    createdTeams.forEach((team) => {
      lastPlayedRound[team.displayName] = 0;
    });

    for (let i = 0; i < createdTeams.length; i += 1) {
      for (let j = i + 1; j < createdTeams.length; j += 1) {
        remainingMatches.push({
          id: matchId,
          teamA: createdTeams[i].displayName,
          teamB: createdTeams[j].displayName,
          winner: '',
          played: false,
        });
        matchId += 1;
      }
    }

    while (remainingMatches.length > 0) {
      const teamsUsedThisRound = [];
      const roundMatches = [];

      while (roundMatches.length < courtTotal) {
        let bestMatchIndex = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < remainingMatches.length; i += 1) {
          const match = remainingMatches[i];

          if (
            teamsUsedThisRound.includes(match.teamA) ||
            teamsUsedThisRound.includes(match.teamB)
          ) {
            continue;
          }

          const restScore =
            (currentRound - lastPlayedRound[match.teamA]) +
            (currentRound - lastPlayedRound[match.teamB]);

          if (restScore > bestScore) {
            bestScore = restScore;
            bestMatchIndex = i;
          }
        }

        if (bestMatchIndex === -1) {
          break;
        }

        const nextMatch = remainingMatches.splice(bestMatchIndex, 1)[0];
        teamsUsedThisRound.push(nextMatch.teamA, nextMatch.teamB);
        roundMatches.push({
          ...nextMatch,
          round: currentRound,
          court: roundMatches.length + 1,
        });
      }

      if (roundMatches.length === 0) {
        const fallbackMatch = remainingMatches.shift();

        if (fallbackMatch) {
          roundMatches.push({
            ...fallbackMatch,
            round: currentRound,
            court: 1,
          });
        }
      }

      roundMatches.forEach((match) => {
        lastPlayedRound[match.teamA] = currentRound;
        lastPlayedRound[match.teamB] = currentRound;
      });

      createdMatches.push(...roundMatches);
      currentRound += 1;
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

  function getScoreboardSnapshot() {
    return {
      teamAScore,
      teamBScore,
      servingTeam,
      serverNumber,
      scoreboardWinner,
      scoreboardLog,
    };
  }

  function loadScoreboardSnapshot(snapshot) {
    setTeamAScore(snapshot.teamAScore);
    setTeamBScore(snapshot.teamBScore);
    setServingTeam(snapshot.servingTeam);
    setServerNumber(snapshot.serverNumber);
    setScoreboardWinner(snapshot.scoreboardWinner);
    setScoreboardLog(snapshot.scoreboardLog);
  }

  function resetScoreboardState() {
    setTeamAScore(0);
    setTeamBScore(0);
    setServingTeam('A');
    setServerNumber(1);
    setScoreboardWinner('');
    setScoreboardLog([]);
    setScoreUndoStack([]);
  }

  function openScoreboard(match, source, returnPhase) {
    setScoreboardMatch({
      id: match.id,
      teamA: match.teamA,
      teamB: match.teamB,
    });
    setScoreboardSource(source);
    setScoreboardReturnPhase(returnPhase);
    setPhase('scoreboard');
    resetScoreboardState();
  }

  function updateMatchFromScoreboard(winnerName, scoreText) {
    if (!scoreboardSource || !scoreboardMatch) {
      return;
    }

    if (scoreboardSource.type === 'openPlay') {
      const updatedOpenPlayMatches = openPlayMatches.map((match) => {
        if (match.id === scoreboardSource.matchId) {
          return {
            ...match,
            winner: winnerName,
            played: true,
          };
        }

        return match;
      });

      setOpenPlayMatches(updatedOpenPlayMatches);

      const playedMatch = updatedOpenPlayMatches.find((match) => match.id === scoreboardSource.matchId);

      if (playedMatch) {
        const loserName = playedMatch.teamA === winnerName ? playedMatch.teamB : playedMatch.teamA;

        setOpenPlayLog((previousLog) => [
          ...previousLog,
          `Round ${playedMatch.round} - Court ${playedMatch.court}: ${winnerName} defeated ${loserName} (${scoreText})`,
        ]);
      }
    }

    if (scoreboardSource.type === 'roundRobin') {
      const updatedMatches = roundRobinMatches.map((match) => {
        if (match.id === scoreboardSource.matchId) {
          return {
            ...match,
            winner: winnerName,
            played: true,
          };
        }

        return match;
      });

      setRoundRobinMatches(updatedMatches);

      const playedMatch = updatedMatches.find((match) => match.id === scoreboardSource.matchId);

      if (playedMatch) {
        const loserName = playedMatch.teamA === winnerName ? playedMatch.teamB : playedMatch.teamA;

        setMatchLog((previousLog) => [
          ...previousLog,
          `${winnerName} defeated ${loserName} (${scoreText})`,
        ]);
      }
    }

    if (scoreboardSource.type === 'bracket') {
      recordBracketWinner(scoreboardSource.matchId, winnerName);
    }

    if (scoreboardSource.type === 'final') {
      recordFinalWinner(winnerName);
    }
  }

  function finishScoreboardGame(winnerName) {
    if (!scoreboardMatch) {
      return;
    }

    const scoreText = `${teamAScore}-${teamBScore}`;

    setScoreboardWinner(winnerName);
    setFinishedGames((previousGames) => [
      ...previousGames,
      {
        id: `${scoreboardMatch.id}-${Date.now()}`,
        teamA: scoreboardMatch.teamA,
        teamB: scoreboardMatch.teamB,
        winner: winnerName,
        scoreText,
      },
    ]);

    updateMatchFromScoreboard(winnerName, scoreText);
  }

  function handleRallyWin(rallyWinner) {
    if (!scoreboardMatch || scoreboardWinner) {
      return;
    }

    setScoreUndoStack((previousStack) => [...previousStack, getScoreboardSnapshot()]);

    const winnerTeamName =
      rallyWinner === 'A' ? scoreboardMatch.teamA : scoreboardMatch.teamB;

    if (servingTeam === rallyWinner) {
      if (rallyWinner === 'A') {
        const nextScore = teamAScore + 1;
        setTeamAScore(nextScore);
        setScoreboardLog((previousLog) => [
          ...previousLog,
          `${winnerTeamName} won the rally and scored. Server ${serverNumber} stays in.`,
        ]);

        if (nextScore >= 11 && nextScore - teamBScore >= 2) {
          finishScoreboardGame(scoreboardMatch.teamA);
        }
      } else {
        const nextScore = teamBScore + 1;
        setTeamBScore(nextScore);
        setScoreboardLog((previousLog) => [
          ...previousLog,
          `${winnerTeamName} won the rally and scored. Server ${serverNumber} stays in.`,
        ]);

        if (nextScore >= 11 && nextScore - teamAScore >= 2) {
          finishScoreboardGame(scoreboardMatch.teamB);
        }
      }
    } else if (serverNumber === 1) {
      setServerNumber(2);
      setScoreboardLog((previousLog) => [
        ...previousLog,
        `${winnerTeamName} won the rally. No point scored. Server moves to player 2.`,
      ]);
    } else {
      const nextServingTeam = servingTeam === 'A' ? 'B' : 'A';
      setServingTeam(nextServingTeam);
      setServerNumber(1);
      setScoreboardLog((previousLog) => [
        ...previousLog,
        `${winnerTeamName} won the rally. No point scored. Serve switches to Team ${nextServingTeam}.`,
      ]);
    }
  }

  function undoScoreboardAction() {
    if (scoreUndoStack.length === 0) {
      return;
    }

    const previousState = scoreUndoStack[scoreUndoStack.length - 1];
    setScoreUndoStack((previousStack) => previousStack.slice(0, previousStack.length - 1));
    loadScoreboardSnapshot(previousState);
  }

  function manualSwitchServer() {
    if (!scoreboardMatch || scoreboardWinner) {
      return;
    }

    setScoreUndoStack((previousStack) => [...previousStack, getScoreboardSnapshot()]);

    if (serverNumber === 1) {
      setServerNumber(2);
      setScoreboardLog((previousLog) => [
        ...previousLog,
        'Manual switch: moved to server 2.',
      ]);
    } else {
      const nextServingTeam = servingTeam === 'A' ? 'B' : 'A';
      setServingTeam(nextServingTeam);
      setServerNumber(1);
      setScoreboardLog((previousLog) => [
        ...previousLog,
        `Manual switch: serve moved to Team ${nextServingTeam}, server 1.`,
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
    const allMatches = [];
    const teamLastPlayedIndex = {};
    const scheduledMatches = [];
    let matchId = 1;

    for (let i = 0; i < teamList.length; i += 1) {
      teamLastPlayedIndex[teamList[i].displayName] = -1000;

      for (let j = i + 1; j < teamList.length; j += 1) {
        allMatches.push({
          id: matchId,
          teamA: teamList[i].displayName,
          teamB: teamList[j].displayName,
          winner: '',
          played: false,
        });
        matchId += 1;
      }
    }

    while (allMatches.length > 0) {
      let bestMatchIndex = 0;
      let bestScore = -Infinity;

      for (let i = 0; i < allMatches.length; i += 1) {
        const match = allMatches[i];
        const lastPlayedA = teamLastPlayedIndex[match.teamA];
        const lastPlayedB = teamLastPlayedIndex[match.teamB];
        const restScore =
          (scheduledMatches.length - lastPlayedA) + (scheduledMatches.length - lastPlayedB);
        const consecutivePenalty =
          lastPlayedA === scheduledMatches.length - 1 || lastPlayedB === scheduledMatches.length - 1
            ? 1000
            : 0;
        const score = restScore - consecutivePenalty;

        if (score > bestScore) {
          bestScore = score;
          bestMatchIndex = i;
        }
      }

      const nextMatch = allMatches.splice(bestMatchIndex, 1)[0];
      scheduledMatches.push(nextMatch);
      teamLastPlayedIndex[nextMatch.teamA] = scheduledMatches.length - 1;
      teamLastPlayedIndex[nextMatch.teamB] = scheduledMatches.length - 1;
    }

    return scheduledMatches.map((match, index) => ({
      ...match,
      round: index + 1,
    }));
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
  const openPlayMatchesByCourt = Array.from(
    { length: Number(openPlayCourtCount) || 0 },
    (_, index) => ({
      court: index + 1,
      matches: openPlayMatches.filter((match) => match.court === index + 1),
    })
  ).filter((courtGroup) => courtGroup.matches.length > 0);
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
              <button className="main-button" onClick={() => setPhase('scoreboard')}>
                Scoreboard Mode
              </button>
              <button className="secondary-button" onClick={resetApp}>
                Reset App
              </button>
            </div>
            {finishedGames.length > 0 && (
              <div className="log-box">
                <h3 className="sub-title">Finished Scoreboard Games</h3>
                {finishedGames
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((game) => (
                    <div className="log-item" key={game.id}>
                      {game.teamA} vs {game.teamB} - {game.winner} won ({game.scoreText})
                    </div>
                  ))}
              </div>
            )}
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
                  <div className="court-groups">
                    {openPlayMatchesByCourt.map((courtGroup) => (
                      <div className="court-column" key={courtGroup.court}>
                        <div className="court-header">Court {courtGroup.court}</div>
                        <div className="match-list">
                          {courtGroup.matches.map((match) => (
                            <div className="match-card" key={match.id}>
                              <div className="match-top-row">
                                <span className="match-badge">Round {match.round}</span>
                              </div>
                              <div className="match-name">
                                {match.teamA} vs {match.teamB}
                              </div>

                              {!match.played ? (
                                <div className="button-group">
                                  <button
                                    className="secondary-button"
                                    onClick={() =>
                                      openScoreboard(
                                        match,
                                        { type: 'openPlay', matchId: match.id },
                                        'openPlay'
                                      )
                                    }
                                  >
                                    Open Scoreboard
                                  </button>
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
                        className="secondary-button"
                        onClick={() =>
                          openScoreboard(
                            match,
                            { type: 'roundRobin', matchId: match.id },
                            'roundRobinView'
                          )
                        }
                      >
                        Open Scoreboard
                      </button>
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
                            className="secondary-button"
                            onClick={() =>
                              openScoreboard(
                                match,
                                { type: 'bracket', matchId: match.id },
                                'bracketView'
                              )
                            }
                          >
                            Open Scoreboard
                          </button>
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
                            className="secondary-button"
                            onClick={() =>
                              openScoreboard(
                                match,
                                { type: 'bracket', matchId: match.id },
                                'bracketView'
                              )
                            }
                          >
                            Open Scoreboard
                          </button>
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
                      className="secondary-button"
                      onClick={() =>
                        openScoreboard(
                          finalMatch,
                          { type: 'final', matchId: finalMatch.id },
                          'finalResult'
                        )
                      }
                    >
                      Open Scoreboard
                    </button>
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

        {phase === 'scoreboard' && (
          <div className="section">
            <h2 className="section-title">Scoreboard Mode</h2>

            {!scoreboardMatch ? (
              <div className="result-box">
                <p className="empty-text">
                  Open a match from Open Play or Tournament Mode to use the live scoreboard.
                </p>
                <div className="button-group">
                  <button className="secondary-button" onClick={() => setPhase('menu')}>
                    Back to Menu
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="result-box scoreboard-box">
                  <div className="scoreboard-match-name">
                    {scoreboardMatch.teamA} vs {scoreboardMatch.teamB}
                  </div>

                  <div className="scoreboard-grid">
                    <div className={`score-team-card ${servingTeam === 'A' ? 'active-team' : ''}`}>
                      <h3 className="sub-title">{scoreboardMatch.teamA}</h3>
                      <div className="score-number">{teamAScore}</div>
                    </div>

                    <div className="score-details">
                      <div className="match-badge">Serving Team {servingTeam}</div>
                      <div className="match-badge">Server {serverNumber}</div>
                      {scoreboardWinner && (
                        <div className="champion-box">Winner: {scoreboardWinner}</div>
                      )}
                    </div>

                    <div className={`score-team-card ${servingTeam === 'B' ? 'active-team' : ''}`}>
                      <h3 className="sub-title">{scoreboardMatch.teamB}</h3>
                      <div className="score-number">{teamBScore}</div>
                    </div>
                  </div>

                  <div className="button-group">
                    <button className="main-button" onClick={() => handleRallyWin('A')}>
                      Team A Rally Win
                    </button>
                    <button className="main-button" onClick={() => handleRallyWin('B')}>
                      Team B Rally Win
                    </button>
                    <button className="secondary-button" onClick={undoScoreboardAction}>
                      Undo
                    </button>
                    <button className="secondary-button" onClick={resetScoreboardState}>
                      Reset Scoreboard
                    </button>
                    <button className="secondary-button" onClick={manualSwitchServer}>
                      Manual Switch Server
                    </button>
                    <button className="secondary-button" onClick={() => setPhase(scoreboardReturnPhase)}>
                      Back to Match
                    </button>
                  </div>
                </div>

                <div className="log-box">
                  <h3 className="sub-title">Rally History</h3>
                  {scoreboardLog.length === 0 ? (
                    <p className="empty-text">No rallies recorded yet.</p>
                  ) : (
                    scoreboardLog
                      .slice()
                      .reverse()
                      .map((logItem, index) => (
                        <div className="log-item" key={`${logItem}-${index}`}>
                          {logItem}
                        </div>
                      ))
                  )}
                </div>

                <div className="log-box">
                  <h3 className="sub-title">Finished Games</h3>
                  {finishedGames.length === 0 ? (
                    <p className="empty-text">No finished games yet.</p>
                  ) : (
                    finishedGames
                      .slice()
                      .reverse()
                      .map((game) => (
                        <div className="log-item" key={game.id}>
                          {game.teamA} vs {game.teamB} - {game.winner} won ({game.scoreText})
                        </div>
                      ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
