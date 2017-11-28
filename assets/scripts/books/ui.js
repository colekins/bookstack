const store = require('../store')
const bookTemplate = require('../templates/new-book.handlebars')
const books = require('google-books-search')

const showClearSearch = function () {
  $('.search').show()
}

const setCover = function (id, img) {
  const panel = document.getElementsByClassName(id)
  const imageHtml = ("<img class='cover' src='" + img + "'>")
  $(panel).find('p').append(imageHtml)
}

const google = function (title) {
  books.search(title, function (error, results) {
    store.newBook.image = results[0].thumbnail
    const err = error
    setCover(store.newBook.id, store.newBook.image)
  })
}

const addBookSuccess = function (data) {
  const bookHtml = bookTemplate({ books: data })
  store.newBook = data.book
  store.books.push(data.book)
  $('.content').append(bookHtml)
  $('#message').text(data.book.title + ' has been added to your collection!')
  google(store.newBook.title)
}

const editBookSuccess = function (data) {
  store.newBook = data
  $('#message').text(data.book.title + ' by ' + data.book.author + ' has been updated.')
  $('#editModal').modal('hide')
}

const deleteSuccess = function (data) {
  // console.log(data)
  $('#message').text('Book deleted.')
}

const restoreCovers = function () {
  for (let i = 0; i < store.books.length; i++) {
  //   const title = store.books[i].title
  //   books.search(title, function (error, results) {
  //     store.books[i].image = results[0].thumbnail
  //     const err = error
    setCover(store.books[i].id, store.books[i].image)
    // })
  }
}

const searchSuccess = function () {
  $('#add-book').hide()
  showClearSearch()
  restoreCovers()
}

const clearSearch = function () {
  $('#add-book').show()
  $('.search').hide()
  $('#message').html('<br>')
  restoreCovers()
}

module.exports = {
  addBookSuccess,
  editBookSuccess,
  searchSuccess,
  clearSearch,
  deleteSuccess
}
