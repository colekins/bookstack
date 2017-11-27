'use strict'
const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onAddBook = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.create(data)
    .then(ui.addBookSuccess)
    .then(document.getElementById('add-book').reset())
    .catch(ui.addBookFail)
}

const onDeleteBook = function (event) {
  event.preventDefault()
  const button = event.target
  const panel = button.parentElement.parentElement.parentElement
  const data = $(button).attr('data-id')
  console.log(data)
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
  // const panel = button.parentElement.parentElement.parentElement
  const panelTitle = button.parentElement.previousSibling.previousSibling
  const bookTitle = panelTitle.firstChild
  const bookAuthor = bookTitle.nextSibling
  currentPanel = panelTitle
  bookId = $(button).attr('data-id')
  $('#edit-message').text(bookTitle.textContent + ' by ' + bookAuthor.textContent)
  document.getElementById('edit-title').value = bookTitle.textContent
  document.getElementById('edit-author').value = bookAuthor.textContent
  const current = store.books.filter(function (book) { return book.id == bookId })
  console.log(current[0])
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
  console.log(data.book)
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

const addHandlers = () => {
  $('#add-book').on('submit', onAddBook)
  $('#content').on('click', '#delete-book', onDeleteBook)
  $('#content').on('click', '#edit-book', openEdit)
  $('#edit-book').on('submit', onEditBook)
}

module.exports = {
  addHandlers
}
