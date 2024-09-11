// src/frontend/src/pages/api/health.js

export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ status: 'Frontend is healthy' });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  