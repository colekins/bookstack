const store = require('../store')
const bookTemplate = require('../templates/new-book.handlebars')

const addBookSuccess = function (data) {
  const bookHtml = bookTemplate({ books: data })
  store.newBook = data.book
  store.books.push(data.book)
  console.log('new book is ', data)
  $('.content').append(bookHtml)
  $('#message').text(data.book.title + ' has been added to your collection!')
}

module.exports = {
  addBookSuccess
}
