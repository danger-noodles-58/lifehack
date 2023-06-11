const db = require('../models/models')

const controller = {}

// Get data from the database:

controller.getData = (req, res, next) => {
  // const SQLQuery = `
  // SELECT * FROM hacks
  // `

  // How will request come in?  req.body
  const category = 'Money'

  // hacks: content, likes, dislikes // h
  // users: username // u
  // Categories: Name // C

  // SQL query string to return all hacks in database:
  const allHackQuery = `SELECT h.content, h.likes, h.dislikes, u.username, C.Name AS category 
  FROM hacks h INNER JOIN users u 
  ON u.ID = h.user_id
  INNER JOIN Categories C
  ON C.ID = h.category_id;`

  // SQL query string to return all categories in database:
  const categoryQuery = `SELECT h.content, h.likes, h.dislikes, u.username, C.Name AS category 
  FROM hacks h INNER JOIN users u 
  ON u.ID = h.user_id
  INNER JOIN Categories C
  ON C.ID = h.category_id
  WHERE C.Name = '${category}';`

  db.query(categoryQuery)
    .then(data => {
      const { rows } = data
      console.log('From Database: ', rows)
      res.locals.data = rows
      return next()
    })
}

// Post a new hack to the database:

controller.makeHack = (req, res, next) => {
  // console.log(req)
  // console.log(req.body)
  const { category, content, user } = req.body
  console.log('Category: ', category, ' Content: ', content, ' User: ', user)

  // const content = 'get a really noice jorb with lots o chedda'
  // const category = 'Money'
  // const user = 'mysteryio'

  // nextval is a method that generates the next primary key, pass it the sequence name
  const postHack = `INSERT INTO hacks (ID, content, likes, dislikes, user_id, category_id) VALUES (nextval('hack_sequence'), '${content}', 0,0, (SELECT ID FROM users WHERE username = '${user}'), (SELECT ID FROM Categories WHERE Name = '${category}'));`

  db.query(postHack)
    .then(data => {
      const { rows } = data
      console.log('From Database: ', rows)
      res.locals.data = rows
      return next()
    })
  // return next()
}

// Post a new user to the database:
controller.makeUser = (req, res, next) => {
  const postUser = 'INSERT INTO hacks (ID, googlename, username) VALUES (nextval(\'user_sequence\'), *****, ***** );'
  db.query(postUser)
    .then(data => {
      const { rows } = data
      console.log('From Database: ', rows)
      res.locals.data = rows
      return next()
    })
}

module.exports = controller

// CREATE SEQUENCE user_sequence
// start with 2
// increment by 1
// minvalue 0
// maxvalue 999
// cycle;

// SELECT * FROM information_schema.sequences;
