'use strict'

const store = require('../store')
const booksTemplate = require('../templates/book-listing.handlebars')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully! Please sign in.')
  $('#signupModal').modal('hide')
  // console.log('yoooooooo')
}

const signUpFailure = function (error) {
  $('#signup-message').text('Error on sign up. Please try again.')
  console.error(error)
}

const signInSuccess = function (response) {
  $('#message').text('You\'re now signed in.')
  store.user = response.user
  $('#loginModal').modal('hide')
  $('.showForUser').show()
}

const signInFailure = function (error) {
  $('#login-message').text('Error on sign in. Please try again.')
  console.log('signIn failure ran. error is :', error)
}

const signOutSuccess = function () {
  $('#message').text('You\'re now signed out.')
  $('#content').html('')
  $('.showForUser').hide()
  store.user = null
}

const signOutFailure = function (error) {
  $('#message').text('Error on sign out.')
  console.log('signOut failure ran. error is :', error)
}

const changePasswordSuccess = function () {
  $('#message').text('Changed password successfully.')
  console.log('changePassword success ran. and nothing was returned')
  $('#passwordModal').modal('hide')
}

const changePasswordFailure = function (error) {
  $('#password-message').text('There was an error. Please try again.')
  console.log('changePassword failure ran. error is :', error)
}

const populateSuccess = function (data) {
  store.books = data.books
  const booksHtml = booksTemplate({ books: store.books })
  $('.content').append(booksHtml)
}
//
// const albumCount = function () {
//   if (store.albums.length === 0) {
//   } else if (store.albums.length === 1) {
//     $('#message').text('Welcome! You have 1 record in your collection.')
//   } else {
//     $('#message').text('Welcome back! There are ' + store.albums.length + ' albums in your collection.')
//   }
// }

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  populateSuccess
}
