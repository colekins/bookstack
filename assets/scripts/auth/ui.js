'use strict'

const store = require('../store')
const booksTemplate = require('../templates/book-listing.handlebars')
const books = require('google-books-search')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully! Please login.')
  document.getElementById('sign-up').reset()
}

const signUpFailure = function (error) {
  $('#message').text('Error on sign up. Please try again.')
  console.error(error)
}

const signInSuccess = function (response) {
  $('#message').text('You\'re now signed in.')
  store.user = response.user
  // console.log(store.user)
  $('#loginModal').modal('hide')
  $('.showForUser').show()
  $('.cartoon').hide()
  $('.jumbotron').hide()
  document.getElementById('sign-up').reset()
  $('#username').text(response.user.email)
}

const signInFailure = function (error) {
  $('#login-message').text('Error on sign in. Please try again.')
  console.log('signIn failure ran. error is :', error)
}

const signOutSuccess = function () {
  $('#message').html('<br>')
  $('#content').html('')
  $('.showForUser').hide()
  $('.cartoon').show()
  $('.jumbotron').show()
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

const setCover = function (id, img) {
  const panel = document.getElementsByClassName(id)
  const imageHtml = ("<img class='cover' src='" + img + "'>")
  $(panel).find('p').append(imageHtml)
}

const populateSuccess = function (data) {
  store.books = data.books
  const booksHtml = booksTemplate({ books: store.books })
  $('.content').append(booksHtml)
  if (store.books.length === 0) {
    $('#message').text('Welcome! Start adding to your collection below.')
  } else if (store.books.length === 1) {
    $('#message').text('Welcome! You have one book in your collection.')
  } else {
    $('#message').text('Welcome back! You have ' + store.books.length + ' books in your collection.')
  }
  for (let i = 0; i < store.books.length; i++) {
    const title = store.books[i].title
    books.search(title, function (error, results) {
      if (error) {
        console.log(error)
      }
      store.books[i].image = results[0].thumbnail
      setCover(store.books[i].id, store.books[i].image)
    })
  }
}

const loadCartoon = function (data) {
  const imgLink = data[0].src
  const caption = data[0].caption
  const imgHtml = ("<img class='cartoon' src='" + imgLink + "'>")
  const captionHtml = ("<br>" + caption)
  $('#cartoon').append(imgHtml)
  $('#caption').append(captionHtml)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  populateSuccess,
  loadCartoon
}
