// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { events } = require('./data.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.statusCode = 200
    res.json({
      events,
    })
  } else {
    res.statusCode = 405
    res.setHeader('Allow', ['GET'])
    res.end(`Method ${req.method} Not Allowed`)
  }
}
