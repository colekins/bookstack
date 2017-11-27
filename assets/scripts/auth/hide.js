const toggleLogin = function () {
  $('#showLogin').toggleClass('hidden unhidden')
  // console.log(parentElement)
}

const togglePassword = function () {
  $('#showPass').toggleClass('hidden unhidden')
  // console.log(parentElement)
}

const toggleSignout = function () {
  $('#signout').toggleClass('hidden unhidden')
  // console.log(parentElement)
}

const toggleSignup = function () {
  $('#signup').toggleClass('hidden unhidden')
  // console.log(parentElement)
}

const toggleBookFields = function () {
  $('#bookFields').toggleClass('hidden unhidden')
}

const toggleSearch = function () {
  $('#showSearch').toggleClass('hidden unhidden')
}

const toggleReadNext = function () {
  $('#showReadNext').toggleClass('hidden unhidden')
}

// const carousel = function () {
//   $('#coverSlide').toggleClass('hidden unhidden')
// }

module.exports = {
  toggleLogin,
  togglePassword,
  toggleSignout,
  toggleSignup,
  toggleBookFields,
  toggleSearch,
  toggleReadNext
}
