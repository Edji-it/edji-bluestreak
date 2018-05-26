module.exports =  function(req, res, next) {
  if (!validateRequest(req.headers['authorization'])) {
    return res.status(401).send()
  } else {
    next()
  }

  // this will validate tokens sent from the server
  function validateRequest(token) {
    return token == process.env.BLUESTREAK_PW_SECRET
  }
}