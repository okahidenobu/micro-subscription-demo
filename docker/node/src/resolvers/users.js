const {User} = require('../models')

exports.getAllUsers = async where => {
  return User.findAll({
    where: where
  })
}

exports.getUser = async id => {
  return User.findByPk(id)
}

exports.createUser = async param => {
  return User.create(param)
}

exports.updateUser = async (id, param) => {
  const ret = User.update(param, {
    where: {id: id}
  })
  console.log(ret)
  return true
}

exports.deleteUser = async id => {
  return User.destroy({
    where: {id: id}
  })
}