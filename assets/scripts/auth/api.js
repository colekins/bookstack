'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  store.onSignUpSignIn = data
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
    // data: data
  })
}

const signUpSignIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: store.onSignUpSignIn
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
    // data: data
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = function (data) {
  console.log('data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const populate = function () {
  return $.ajax({
    url: config.apiOrigin + '/books/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newYorkerCartoon = function () {
  return $.ajax({
    url: 'https://www.newyorker.com/cartoons/random/randomAPI1',
    method: 'GET'
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  populate,
  newYorkerCartoon,
  signUpSignIn
}
