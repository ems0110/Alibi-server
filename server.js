const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// ===== GAME DATA =====
const SCENARIOS = [
  {
  id: 1,
  title: "Le midi de trop",
  text: "C'est un mardi de mai, il fait 28 degrés. Vous êtes en Première et vous avez décidé de profiter de la pause déjeuner de 1h30 pour aller 'prendre l'air'. Le groupe : Valentin, Bland, Max, Ems, Lucas et Marti. Valentin a ramené une bouteille de gnôle de son grand-père, une vieille bouteille en verre avec une étiquette jaunie écrite à la main. Vous vous installez derrière les buts du terrain de foot du quartier. Lucas a apporté une enceinte bluetooth rouge. Marti a un sandwich jambon-beurre qu'elle ne mange pas. On passe la bouteille, on chante du Jul, les pigeons s'enfuient. Lucas glisse sur l'herbe en voulant danser et se retrouve assis par terre en riant. Il reste 20 minutes avant les cours quand Ems dit 'on rentre ?'. Retour en classe. Lucas s'assoit à l'envers sur sa chaise. Bland rigole sans raison. En sortant des cours, Laetitia — la CPE — attend dans le couloir bras croisés. Elle regarde le groupe et dit : 'Vous sentez la pharmacie, venez avec moi.' Dans son bureau, elle pose des questions. Valentin répond en parlant très lentement. Max fixe le mur. Elle finit par dire 'Rentrez chez vous, on en reparlera demain' et appelle les parents de Lucas en premier.",
  questions: [
    "Quel jour de la semaine ?",
    "Quelle température il faisait ?",
    "Combien étiez-vous dans le groupe ?",
    "D'où venait la bouteille de Valentin ?",
    "De quelle couleur était l'enceinte de Lucas ?",
    "Quelle chanson vous chantiez ?",
    "Qu'est-ce que Marti avait apporté à manger ?",
    "Qui a glissé sur l'herbe ?",
    "Combien de minutes avant les cours Ems a proposé de rentrer ?",
    "Que dit Laetitia en voyant le groupe dans le couloir ?"
  ]
},
  {
    id: 2,
    title: "Le parc en automne",
    text: "Vous vous retrouvez dans un parc un jeudi après-midi d'octobre. Les feuilles tombent, certaines sont orange, d'autres rouges. Une fontaine coule au centre. Un vieil homme en manteau vert nourrit des pigeons avec du pain blanc. Une fillette en robe jaune joue au cerf-volant bleu. Vous vous asseyez sur un banc en bois près d'un lampadaire. Un cycliste en veste orange passe devant vous. Un couple mange une glace à la pistache sur l'herbe.",
    questions: [
      "Quel jour de la semaine ?",
      "En quel mois ?",
      "Que fait le vieil homme ?",
      "De quelle couleur est son manteau ?",
      "Avec quoi nourrit-il les pigeons ?",
      "Que fait la fillette ?",
      "De quelle couleur est son cerf-volant ?",
      "Que mange le couple assis sur l'herbe ?",
      "De quelle couleur est la veste du cycliste ?",
      "De quelle couleur est la robe de la fillette ?"
    ]
  },
  {
    id: 3,
    title: "La gare du soir",
    text: "Vous êtes dans une grande gare à 18h30, un vendredi. Votre train part du quai numéro 7 avec 8 minutes de retard. Vous portez une valise rouge à roulettes et un sac à dos noir. Vous achetez un sandwich thon-mayo au kiosque. La caissière s'appelle Lucie, elle porte des lunettes rondes. Sur l'écran des départs, votre train est indiqué en orange. Un groupe de musiciens joue de la guitare sur le quai 5. Un enfant court après un ballon vert qui roule sur le sol.",
    questions: [
      "À quelle heure se déroule la scène ?",
      "Quel jour de la semaine ?",
      "De quel quai part le train ?",
      "De combien de minutes est le retard ?",
      "De quelle couleur est la valise à roulettes ?",
      "Que commandez-vous au kiosque ?",
      "Comment s'appelle la caissière ?",
      "Quelle particularité physique a-t-elle ?",
      "Sur quel quai jouent les musiciens ?",
      "De quelle couleur est le ballon de l'enfant ?"
    ]
  },
  {
    id: 4,
    title: "Le café du matin",
    text: "Vous entrez dans un café parisien un lundi à 8h00. Le sol est en carrelage noir et blanc. Un barista aux cheveux bouclés vous accueille. Vous commandez un café crème et une tartine beurrée. À la table près de la fenêtre, un homme lit un journal rose. Une femme en tailleur bleu travaille sur un ordinateur argenté. La radio annonce de la pluie pour l'après-midi. Le chat roux du café dort sur une chaise rouge près du comptoir.",
    questions: [
      "Quel jour de la semaine ?",
      "À quelle heure êtes-vous là ?",
      "Comment est le sol du café ?",
      "Comment sont les cheveux du barista ?",
      "Que commandez-vous ?",
      "De quelle couleur est le journal de l'homme ?",
      "De quelle couleur est le tailleur de la femme ?",
      "De quelle couleur est son ordinateur ?",
      "Qu'annonce la radio ?",
      "De quelle couleur est le chat du café ?"
    ]
  },
  {
    id: 5,
    title: "Le marché du dimanche",
    text: "Vous déambulez sur un marché en plein air un dimanche matin. Il fait frais et vous portez une veste verte. Un vendeur de fruits crie 'Fraises, 2 euros la barquette !'. Vous achetez des tomates cerises et un bouquet de tulipes jaunes. Une dame en chapeau rouge négocie le prix d'un vieux livre. Un chien dalmatien est attaché à un lampadaire. L'odeur des crêpes vient d'un stand au fond. Un enfant renverse accidentellement un étal de poires.",
    questions: [
      "Quel jour de la semaine ?",
      "Quelle est la météo ?",
      "De quelle couleur est votre veste ?",
      "Quel est le prix annoncé par le vendeur de fruits ?",
      "Que vendait-il ?",
      "Qu'achetez-vous comme fleurs ?",
      "De quelle couleur sont ces fleurs ?",
      "De quelle couleur est le chapeau de la dame ?",
      "Quelle race est le chien attaché ?",
      "Quelle odeur vient du fond du marché ?"
    ]
  },
  {
    id: 6,
    title: "L'appartement mystère",
    text: "Vous pénétrez dans un appartement au 4ème étage. La porte est rouge. À l'intérieur, il fait sombre. Sur la table de la cuisine, il y a deux verres de vin rouge à moitié pleins et une bougie allumée. Un manteau noir est jeté sur le canapé bleu. La télévision est allumée sur une chaîne info. Dans la chambre, un tiroir est ouvert et des vêtements débordent. Sur le rebord de la fenêtre, il y a une plante cactus et une photo encadrée d'une famille en vacances à la mer.",
    questions: [
      "À quel étage est l'appartement ?",
      "De quelle couleur est la porte ?",
      "Combien y a-t-il de verres sur la table ?",
      "Que contiennent ces verres ?",
      "Qu'est-ce qui est allumé sur la table ?",
      "De quelle couleur est le manteau sur le canapé ?",
      "De quelle couleur est le canapé ?",
      "Sur quelle chaîne est la télévision ?",
      "Quelle plante est sur le rebord de la fenêtre ?",
      "Que montre la photo encadrée ?"
    ]
  }
];

// ===== IN-MEMORY GAME ROOMS =====
const rooms = {};

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getRoom(code) { return rooms[code]; }

function broadcastRoom(code) {
  const room = getRoom(code);
  if (!room) return;
  io.to(code).emit('room_update', sanitizeRoom(room));
}

function sanitizeRoom(room) {
  // Don't send other players' answers to players (only to GM)
  return {
    code: room.code,
    phase: room.phase,
    players: room.players.map(p => ({ id: p.id, name: p.name, duo: p.duo, role: p.role, connected: p.connected })),
    gmId: room.gmId,
    currentManche: room.currentManche,
    totalManches: room.totalManches,
    currentQuestion: room.currentQuestion,
    scenario: room.scenario ? { title: room.scenario.title, text: room.scenario.text, totalQ: room.scenario.questions.length } : null,
    questionText: room.scenario && (room.phase === 'interrogation' || room.phase === 'compare') ? room.scenario.questions[room.currentQuestion] : null,
    scores: room.scores,
    mancheScores: room.mancheScores,
    answerTimer: room.answerTimer,
    duoOrder: room.duoOrder,
    answersSubmitted: room.answers ? Object.keys(room.answers).filter(id => room.answers[id] !== undefined).length : 0,
    totalAnswersExpected: room.totalAnswersExpected || 0,
  };
}

io.on('connection', (socket) => {
  console.log('connect', socket.id);

  // ===== CREATE ROOM (GM) =====
  socket.on('create_room', ({ name }) => {
    let code;
    do { code = generateCode(); } while (rooms[code]);

    rooms[code] = {
      code,
      phase: 'lobby', // lobby | scenario | reading | interrogation | compare | manche_result | final
      gmId: socket.id,
      players: [{ id: socket.id, name, role: 'gm', duo: null, connected: true }],
      currentManche: 0,
      totalManches: null,
      duoOrder: [], // list of duo letters in play order
      currentDuoIndex: 0,
      scenario: null,
      currentQuestion: 0,
      answers: {},
      totalAnswersExpected: 0,
      scores: {},
      mancheScores: [],
      answerTimer: 15,
      compareData: [],
    };

    socket.join(code);
    socket.emit('room_created', { code });
    broadcastRoom(code);
  });

  // ===== JOIN ROOM (Player) =====
  socket.on('join_room', ({ code, name }) => {
    const room = getRoom(code);
    if (!room) { socket.emit('error', { msg: 'Partie introuvable.' }); return; }
    if (room.phase !== 'lobby') { socket.emit('error', { msg: 'La partie a déjà commencé.' }); return; }

    room.players.push({ id: socket.id, name, role: 'player', duo: null, connected: true });
    socket.join(code);
    socket.emit('room_joined', { code });
    broadcastRoom(code);
  });

  // ===== ASSIGN DUO =====
  socket.on('assign_duo', ({ code, playerId, duo }) => {
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;
    const p = room.players.find(p => p.id === playerId);
    if (p) p.duo = duo;
    broadcastRoom(code);
  });

  // ===== START GAME (GM sets manches & order) =====
  socket.on('start_game', ({ code, totalManches }) => {
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;

    // Build duo order from assigned players
    const duos = [...new Set(room.players.filter(p => p.duo).map(p => p.duo))].sort();
    room.duoOrder = duos;
    room.totalManches = totalManches;
    room.currentManche = 0;
    room.currentDuoIndex = 0;

    // Init scores
    duos.forEach(d => room.scores[d] = 0);

    // Pick scenario
    room.scenario = pickScenario(room);
    room.phase = 'scenario';

    broadcastRoom(code);
  });

  // ===== GM: START READING TIMER =====
  socket.on('start_reading', ({ code }) => {
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;
    clearInterval(room.readingInterval);
    clearInterval(room.questionInterval);
    room.phase = 'reading';
    broadcastRoom(code);
    let t = 120;
    room.readingInterval = setInterval(() => {
      t--;
      io.to(code).emit('reading_tick', { t });
      if (t <= 0) {
        clearInterval(room.readingInterval);
        room.readingInterval = null;
        room.phase = 'interrogation';
        room.currentQuestion = 0;
        room.answers = {};
        room.totalAnswersExpected = duoMemberCount(room);
        broadcastRoom(code);
      }
    }, 1000);
  });

  // ===== GM: NEXT QUESTION =====
  socket.on('next_question', ({ code }) => {
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;
    clearInterval(room.questionInterval);
    clearInterval(room.readingInterval);
    room.readingInterval = null;
    room.answers = {};
    room.answerTimer = 15;
    room.phase = 'interrogation';
    broadcastRoom(code);
    let t = 15;
    room.questionInterval = setInterval(() => {
      t--;
      io.to(code).emit('answer_tick', { t });
      if (t <= 0) {
        clearInterval(room.questionInterval);
        room.questionInterval = null;
        sendAnswersToGM(room);
      }
    }, 1000);
  });

  // ===== PLAYER: SUBMIT ANSWER =====
  socket.on('submit_answer', ({ code, answer }) => {
    const room = getRoom(code);
    if (!room) return;
    room.answers[socket.id] = answer;
    // Check if all answered
    const duo = room.players.find(p => p.id === socket.id)?.duo;
    const expected = duoMemberCount(room);
    const submitted = Object.keys(room.answers).length;
    io.to(room.gmId).emit('answer_progress', { submitted, expected });
    if (submitted >= expected) {
      clearInterval(room.questionInterval);
      sendAnswersToGM(room);
    }
  });

  // ===== GM: SCORE QUESTION =====
  socket.on('score_question', ({ code, duoScores }) => {
    // duoScores: { 'A': true/false, 'B': true/false, ... }
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;

    if (!room.compareData[room.currentManche]) room.compareData[room.currentManche] = [];
    room.compareData[room.currentManche].push({ q: room.currentQuestion, duoScores });

    Object.entries(duoScores).forEach(([duo, match]) => {
      if (match) room.scores[duo] = (room.scores[duo] || 0) + 1;
    });

    room.currentQuestion++;
    const totalQ = room.scenario.questions.length;

    if (room.currentQuestion >= totalQ) {
      // End of manche
      room.mancheScores.push({ ...room.scores });
      room.phase = 'manche_result';
      broadcastRoom(code);
    } else {
      room.phase = 'interrogation';
      room.answers = {};
      broadcastRoom(code);
    }
  });

  // ===== GM: NEXT MANCHE =====
  socket.on('next_manche', ({ code }) => {
    const room = getRoom(code);
    if (!room || room.gmId !== socket.id) return;
    // Clear any running timers
    clearInterval(room.readingInterval);
    clearInterval(room.questionInterval);
    room.readingInterval = null;
    room.questionInterval = null;
    room.currentManche++;
    if (room.currentManche >= room.totalManches) {
      room.phase = 'final';
    } else {
      room.scenario = pickScenario(room);
      room.currentQuestion = 0;
      room.answers = {};
      room.totalAnswersExpected = duoMemberCount(room);
      room.phase = 'scenario';
    }
    broadcastRoom(code);
  });

  // ===== DISCONNECT =====
  socket.on('disconnect', () => {
    for (const code in rooms) {
      const room = rooms[code];
      const p = room.players.find(p => p.id === socket.id);
      if (p) {
        p.connected = false;
        broadcastRoom(code);
      }
    }
  });
});

function duoMemberCount(room) {
  return room.players.filter(p => p.role === 'player' && p.duo).length;
}

function sendAnswersToGM(room) {
  // Group answers by duo
  const byDuo = {};
  room.players.filter(p => p.role === 'player' && p.duo).forEach(p => {
    if (!byDuo[p.duo]) byDuo[p.duo] = [];
    byDuo[p.duo].push({ name: p.name, answer: room.answers[p.id] || '(sans réponse)' });
  });
  io.to(room.gmId).emit('show_answers', {
    question: room.scenario.questions[room.currentQuestion],
    qIndex: room.currentQuestion,
    byDuo
  });
  room.phase = 'compare';
  broadcastRoom(room.code);
}

const usedScenarios = {};
function pickScenario(room) {
  if (!usedScenarios[room.code]) usedScenarios[room.code] = [];
  const available = SCENARIOS.filter(s => !usedScenarios[room.code].includes(s.id));
  const pick = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
  usedScenarios[room.code].push(pick.id);
  return pick;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Alibi server running on port ${PORT}`));
