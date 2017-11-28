const store = require('../store')
const bookTemplate = require('../templates/new-book.handlebars')

const showClearSearch = function () {
  $('.search').show()
}

const addBookSuccess = function (data) {
  const bookHtml = bookTemplate({ books: data })
  store.newBook = data.book
  store.books.push(data.book)
  $('.content').append(bookHtml)
  $('#message').text(data.book.title + ' has been added to your collection!')
}

const editBookSuccess = function (data) {
  store.newBook = data
  $('#message').text(data.book.title + ' by ' + data.book.author + ' has been updated.')
  $('#editModal').modal('hide')
}

const searchSuccess = function () {
  $('#add-book').hide()
  showClearSearch()
}

const clearSearch = function () {
  $('#add-book').show()
  $('.search').hide()
  $('#message').html('<br>')
}

module.exports = {
  addBookSuccess,
  editBookSuccess,
  searchSuccess,
  clearSearch
}
