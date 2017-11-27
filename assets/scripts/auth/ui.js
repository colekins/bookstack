'use strict'

const store = require('../store')

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
  // console.log('signIn success ran. data is :', response)
  store.user = response.user
  $('#loginModal').modal('hide')
  $('#mainheader').text('Your collection:')
}

const signInFailure = function (error) {
  $('#login-message').text('Error on sign in. Please try again.')
  console.log('signIn failure ran. error is :', error)
}

const signOutSuccess = function () {
  $('#message').text('You\'re now signed out.')
  $('#content').html('')
  $('#mainheader').text('Sign in to start your collection.')
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

// const albumCover = function (id, img) {
//   const panel = document.getElementsByClassName(id)
//   const albImage = document.createElement('img')
//   albImage.src = (img)
//   $(panel).find('p').append(albImage)
// }

// const populateSuccess = function (data) {
//   store.albums = data.albums
//   const albumsHtml = albumsTemplate({ albums: store.albums })
//   $('.content').append(albumsHtml)
//   for (let i = 0; i < store.albums.length; i++) {
//     const artist = store.albums[i].artist
//     const title = store.albums[i].title
//     art(artist, title, 'large', function (err, url) {
//       store.albums[i].image = url
//       const error = err
//       albumCover(store.albums[i].id, store.albums[i].image)
//     })
//   }
// }
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
  changePasswordFailure
}
