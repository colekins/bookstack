'use strict'
const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

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

const addHandlers = () => {
  $('#add-book').on('submit', onAddBook)
  $('#content').on('click', '#delete-book', onDeleteBook)
  // $('#content').on('click', '#edit-book', openEdit)
  // $('#edit-book').on('submit', onEditBook)
}

module.exports = {
  addHandlers
}
