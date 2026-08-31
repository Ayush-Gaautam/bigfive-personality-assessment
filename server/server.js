import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory and DB file exist
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
  }
} catch (err) {
  console.error('[DB INIT WARNING]', err.message);
}

// Helper to read DB
function readSubmissions() {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading database file:', err);
    return [];
  }
}

// Helper to write DB
function writeSubmissions(submissions) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing to database file:', err);
    return false;
  }
}

// API Routes

// GET /api/submissions - Fetch all saved responses
app.get('/api/submissions', (req, res) => {
  const submissions = readSubmissions();
  res.json({ success: true, count: submissions.length, data: submissions });
});

// POST /api/submissions - Submit a new response
app.post('/api/submissions', (req, res) => {
  const { name, email, age, gender, occupation, organization, answers, scores } = req.body;

  if (!name || !answers || !scores) {
    return res.status(400).json({ success: false, message: 'Missing required fields (name, answers, scores).' });
  }

  const submissions = readSubmissions();
  const newSubmission = {
    id: 'SUB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
    name: name.trim(),
    email: (email || '').trim(),
    age: (age || '').trim(),
    gender: (gender || '').trim(),
    occupation: (occupation || '').trim(),
    organization: (organization || '').trim(),
    answers,
    scores,
    submittedAt: new Date().toISOString()
  };

  submissions.unshift(newSubmission);
  writeSubmissions(submissions);

  console.log(`[DB] New submission saved for: ${name} (${newSubmission.id})`);
  res.status(201).json({ success: true, data: newSubmission });
});

// DELETE /api/submissions/:id - Delete a submission
app.delete('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  let submissions = readSubmissions();
  const initialCount = submissions.length;
  submissions = submissions.filter(s => s.id !== id);

  if (submissions.length === initialCount) {
    return res.status(404).json({ success: false, message: 'Submission not found.' });
  }

  writeSubmissions(submissions);
  res.json({ success: true, message: 'Submission deleted successfully.' });
});

// GET /api/stats - Class & Demographic Analytics
app.get('/api/stats', (req, res) => {
  const submissions = readSubmissions();
  const total = submissions.length;

  if (total === 0) {
    return res.json({
      success: true,
      total: 0,
      averages: {
        extraversion: 0,
        agreeableness: 0,
        adjustment: 0,
        conscientiousness: 0,
        openness: 0,
        totalScore: 0
      },
      ageDistribution: {},
      genderDistribution: {},
      occupationDistribution: {}
    });
  }

  const totals = {
    extraversion: 0,
    agreeableness: 0,
    adjustment: 0,
    conscientiousness: 0,
    openness: 0,
    totalScore: 0
  };

  const ageDist = {};
  const genderDist = {};
  const occDist = {};

  submissions.forEach(s => {
    if (s.scores && s.scores.dimensionScores) {
      totals.extraversion += s.scores.dimensionScores.extraversion || 0;
      totals.agreeableness += s.scores.dimensionScores.agreeableness || 0;
      totals.adjustment += s.scores.dimensionScores.adjustment || 0;
      totals.conscientiousness += s.scores.dimensionScores.conscientiousness || 0;
      totals.openness += s.scores.dimensionScores.openness || 0;
      totals.totalScore += s.scores.totalScore || 0;
    }

    const age = s.age || 'Unspecified';
    const gender = s.gender || 'Unspecified';
    const occ = s.occupation || 'Other';

    ageDist[age] = (ageDist[age] || 0) + 1;
    genderDist[gender] = (genderDist[gender] || 0) + 1;
    occDist[occ] = (occDist[occ] || 0) + 1;
  });

  const averages = {
    extraversion: (totals.extraversion / total).toFixed(1),
    agreeableness: (totals.agreeableness / total).toFixed(1),
    adjustment: (totals.adjustment / total).toFixed(1),
    conscientiousness: (totals.conscientiousness / total).toFixed(1),
    openness: (totals.openness / total).toFixed(1),
    totalScore: (totals.totalScore / total).toFixed(1)
  };

  res.json({
    success: true,
    total,
    averages,
    ageDistribution: ageDist,
    genderDistribution: genderDist,
    occupationDistribution: occDist
  });
});

// GET /api/export - Export all responses as CSV
app.get('/api/export', (req, res) => {
  const submissions = readSubmissions();
  let csvHeaders = 'Submission ID,Name,Gmail / Email,Age,Gender,Occupation,Organization Name,Submitted Date,Total Score,Extraversion,Agreeableness,Emotional Stability,Conscientiousness,Openness,Dominant Trait\n';
  
  let csvRows = submissions.map(s => {
    const dim = s.scores?.dimensionScores || {};
    return [
      `"${s.id}"`,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.age || '').replace(/"/g, '""')}"`,
      `"${(s.gender || '').replace(/"/g, '""')}"`,
      `"${(s.occupation || '').replace(/"/g, '""')}"`,
      `"${(s.organization || '').replace(/"/g, '""')}"`,
      `"${s.submittedAt}"`,
      s.scores?.totalScore || 0,
      dim.extraversion || 0,
      dim.agreeableness || 0,
      dim.adjustment || 0,
      dim.conscientiousness || 0,
      dim.openness || 0,
      `"${s.scores?.dominantTrait || ''}"`
    ].join(',');
  }).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=Personality_Assessment_Results.csv');
  res.send(csvHeaders + csvRows);
});

// Serve built frontend static assets in production
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Serve static assets from dist folder
app.use(express.static(DIST_DIR));

// 404 handler for missing API endpoints
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// SPA wildcard fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Big Five Personality Assessment</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .card { background: #0f172a; padding: 2rem; border-radius: 1rem; border: 1px solid #334155; max-width: 450px; }
            h1 { color: #6366f1; margin-top: 0; }
            p { color: #94a3b8; font-size: 0.95rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>App Initializing...</h1>
            <p>The frontend static build is currently generating. If this screen persists, please run <code>npm run build</code>.</p>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Backend REST API running on port ${PORT}`);
});

