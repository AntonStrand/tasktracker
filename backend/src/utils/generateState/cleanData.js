// cleanData :: Model -> {Model}
module.exports = ({ _id: id, _doc: rest }) => ({ id, ...rest })
