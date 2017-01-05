const fs =require( 'fs' )

if( fs.existsSync( '.env' ) ){
  require( 'dotenv' ).config()
}

const connectionString = process.env.DATABASE_URL

const pgp = require( 'pg-promise' )()

const db = pgp( connectionString )

const GET_ALL = 'SELECT * FROM todo'

const DELETE_ONE = 'DELETE FROM todo WHERE id = $1'

const CREATE_ONE = 'INSERT INTO todo(task) VALUES ($1)'

const UPDATE_ONE = 'UPDATE todo SET task = $2 WHERE id = $1'

const Todos = {
  getAll: () => {
    return db.any(GET_ALL,[])
  },

  deleteOne: (id) => {
    return db.none(DELETE_ONE, [id])
  },

  createTodo: (taskItem) => {
    return db.none(CREATE_ONE, [taskItem])
  },

  updateTodo: (id, task) => {
    return db.none(UPDATE_ONE, [id, task])
  }

}



module.exports = {Todos};
