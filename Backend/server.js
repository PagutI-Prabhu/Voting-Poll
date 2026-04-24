import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

const db = { polls: [] };

//Creating API poll

app.post("/polls", (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res.send("Invalid input");
  }

  const poll = {
    id: Date.now().toString(),
    question,
    options: options.map((opt) => ({ text: opt, votes: 0 })),
  };

  db.polls.push(poll);
  res.send(poll);
});

// Increasing vote count

app.post("/polls/:id/vote", (req, res) => {
  const poll = db.polls.find((p) => p.id === req.params.id);

  if (!poll) {
    return res.send("Poll not found");
  }

  const index = req.body.optionIndex;

  if (index < 0 || index >= poll.options.length) {
    return res.send("Invalid option");
  }

  poll.options[index].votes += 1;

  res.send(poll);
});

// Deleting Poll

app.delete("/polls/:id", (req, res) => {
  const id = req.params.id;

  db.polls = db.polls.filter((p) => p.id !== id);

  res.send("Poll deleted");
});

app.get("/polls", (req, res) => {
  res.json(db.polls);
});

// calculating the percentage
app.get("/polls/:id/results", (req, res) => {
  const poll = db.polls.find((p) => p.id === req.params.id);

  if (!poll) return res.send("Poll not found");

  // total votes (short way)
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  // results
  const results = poll.options.map((opt) => ({
    text: opt.text,
    votes: opt.votes,
    percentage: totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0,
  }));

  res.json({
    question: poll.question,
    totalVotes,
    results,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`your server is running in port ${PORT}`));
