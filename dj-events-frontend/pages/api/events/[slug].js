const { events } = require('./data.json')

export default function handler(req, res) {
  const eventWithThatSlug = events.find(
    (event) => event.slug === req.query.slug,
  )

  if (!eventWithThatSlug) {
    return res.status(404).json({
      error: 'Event not found',
    })
  }

  res.status(200).json(eventWithThatSlug)
}
