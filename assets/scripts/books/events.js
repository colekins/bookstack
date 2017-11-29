'use strict'
const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const hide = require('../auth/hide')

const booksTemplate = require('../templates/book-listing.handlebars')

const onAddBook = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.create(data)
    .then(ui.addBookSuccess)
    .then(document.getElementById('add-book').reset())
    .catch(ui.addBookFail)
}

const clearStore = function (id) {
  const index = store.books.map(function (book) {
    return book.id
  }).indexOf(parseInt(id))
  store.books.splice(index, 1)
}

const onDeleteBook = function (event) {
  event.preventDefault()
  const button = event.target
  const panel = button.parentElement.parentElement.parentElement
  const data = $(button).attr('data-id')
  clearStore(data)
  api.destroy(data)
    .then(ui.deleteSuccess)
    .then(panel.remove())
    .catch(ui.deleteFail)
}

let bookId = 0
let currentPanel

const openEdit = function (event) {
  event.preventDefault()
  const button = event.target
  const panelTitle = button.parentElement.previousSibling.previousSibling
  const bookTitle = panelTitle.firstChild
  const titleArray = bookTitle.textContent.split(" ")
  const bookAuthor = bookTitle.nextSibling
  currentPanel = panelTitle
  bookId = $(button).attr('data-id')
  $('#editTitle').text(bookTitle.textContent)
  $('#editAuthor').text(bookAuthor.textContent)
  document.getElementById('edit-title').value = bookTitle.textContent
  document.getElementById('edit-author').value = bookAuthor.textContent
  const current = store.books.filter(function (book) { return book.id == bookId })
  if (current[0].notes) {
    document.getElementById('edit-notes').value = current[0].notes
  } else {
    document.getElementById('edit-notes').value = null
  }
  if (current[0].next !== true) {
    document.getElementById('edit-next').checked = false
  } else {
    document.getElementById('edit-next').checked = true
  }
  const date = current[0].created_at.toString().substring(0, 10)
  $('#editCreated').text(date)
  const terms = titleArray.join('+')
  const amazonUrl = ('https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Dstripbooks&field-keywords=' + terms)
  const grUrl = ('https://www.goodreads.com/search?q=' + terms)
  $('#amazon-link').attr('href', amazonUrl)
  $('#goodreads-link').attr('href', grUrl)
}

const onEditBook = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const boo = document.getElementById('edit-next').checked
  if (boo !== false) {
    document.getElementById('edit-hidden').value = 1
  } else {
    document.getElementById('edit-hidden').value = 0
  }
  data.book.next = boo
  // console.log(data.book)
  const bookTitle = currentPanel.firstChild
  const bookAuthor = bookTitle.nextSibling
  bookTitle.textContent = data.book.title
  bookAuthor.textContent = data.book.author
  const index = store.books.map(function (book) {
    return book.id
  }).indexOf(parseInt(bookId))
  store.books[index].notes = data.book.notes
  store.books[index].next = data.book.next
  api.update(data, bookId)
    .then(ui.editBookSuccess)
  //   .then(document.getElementById('add-album').reset())
  //   .catch(ui.addBookFail)
}

const search = function (data) {
  const results = []
  for (let i = 0; i < store.books.length; i++) {
    if (store.books[i].title.toUpperCase().indexOf(data.terms.toUpperCase()) >= 0 ||
        store.books[i].author.toUpperCase().indexOf(data.terms.toUpperCase()) >= 0) {
      results.push(store.books[i])
    }
  }
  // console.log(results)
  const booksHtml = booksTemplate({ books: results })
  $('.content').text('')
  $('.content').append(booksHtml)
  if (results.length === 1) {
    $('#message').text('One result matching \'' + data.terms + '\' in your collection.')
  } else {
    $('#message').text(results.length + ' results matching \'' + data.terms + '\' in your collection.')
  }
  const form = document.getElementById('searchField')
  form.value = ''
  ui.searchSuccess()
}

const onSearch = function (event) {
  event.preventDefault()
  const terms = document.getElementById('searchField').value
  const data = {
    terms: terms
  }
  // console.log(data)
  search(data)
}

const onClearSearch = function () {
  const booksHtml = booksTemplate({ books: store.books })
  $('.content').text('')
  $('.content').append(booksHtml)
  ui.clearSearch()
}

const onReadNext = function () {
  const onDeck = []
  for (let i = 0; i < store.books.length; i++) {
    if (store.books[i].next) {
      onDeck.push(store.books[i])
    }
  }
  const booksHtml = booksTemplate({ books: onDeck })
  $('.content').text('')
  $('#message').text('Here\'s whats on deck to read next.')
  $('.content').append(booksHtml)
  ui.searchSuccess()
}

const addHandlers = () => {
  $('#add-book').on('submit', onAddBook)
  $('#content').on('click', '#delete-book', onDeleteBook)
  $('#content').on('click', '#edit-book', openEdit)
  $('#edit-book').on('submit', onEditBook)
  $('#searchButton').on('click', onSearch)
  // $('#search').on('submit', onSearch)
  $('#clearSearch').on('click', onClearSearch)
  $('#showReadNext').on('click', onReadNext)
}

module.exports = {
  addHandlers
}
