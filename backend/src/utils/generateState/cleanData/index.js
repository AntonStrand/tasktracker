const R = require('ramda')

const structure = ({ _id: id, _doc: rest }) => ({ id, ...rest })

// cleanData :: Model -> {Model}
module.exports = R.compose(R.dissoc('_id'), R.dissoc('__v'), structure)
