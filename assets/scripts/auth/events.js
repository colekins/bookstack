'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const hide = require('./hide')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(api.signUpSignIn)
    .then(ui.signInSuccess)
    .then(hide.toggleLogin)
    .then(hide.togglePassword)
    .then(hide.toggleSignout)
    .then(hide.toggleSignup)
    .then(hide.toggleSearch)
    .then(hide.toggleReadNext)
    .then(api.populate)
    .then(ui.populateSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(hide.toggleLogin)
    .then(hide.togglePassword)
    .then(hide.toggleSignout)
    .then(hide.toggleSignup)
    .then(hide.toggleSearch)
    .then(hide.toggleReadNext)
    .then(api.populate)
    .then(ui.populateSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .then(hide.toggleLogin)
    .then(hide.togglePassword)
    .then(hide.toggleSignout)
    .then(hide.toggleSignup)
    .then(hide.togglePanel)
    .then(hide.toggleBookFields)
    .then(hide.toggleSearch)
    .then(hide.toggleReadNext)
    // .then(ui.carousel)
    .then(document.getElementById('login').reset())
    .catch(ui.signOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .then(document.getElementById('change-password').reset())
    .catch(ui.changePasswordFailure)
}

const onClearSignup = (event) => {
  document.getElementById('sign-up').reset()
}

const onClearLogin = (event) => {
  document.getElementById('login').reset()
}

const onClearPass = (event) => {
  document.getElementById('change-password').reset()
}

const getCartoon = function () {
  api.newYorkerCartoon()
    .then(ui.loadCartoon)
}

const clearLoginMessage = function () {
  $('#login-message').text('')
}

// const populateAlbums = function (data) {
//   event.preventDefault()
//   api.populate(data)
//   // .then(ui.allAlbumsSuccess)
// }

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#login').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#clearSignup').on('click', onClearSignup)
  $('#clearLogin').on('click', onClearLogin)
  $('#clearPass').on('click', onClearPass)
  $('#loginModal').on('hidden.bs.modal', clearLoginMessage)
}

module.exports = {
  addHandlers,
  getCartoon
}
