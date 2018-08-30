const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '588305',
  key: '6c4c9b974f24e9775fd7',
  secret: 'db55517e1e51e99be358',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
  res.send('')
})
router.post('/', (req, res) => {
  pusher.trigger('who-poll', 'who-vote', {
    points: 1,
    "message": "hello world"
  });
    return res.json({success: true, message: 'Thanks for Voting!'});
})

module.exports = router;
