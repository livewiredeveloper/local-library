function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  return books.find((book) => book.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let checkedOutBooks = [];
  const checkedOut = (element) => element.returned == false;
  returnedBooks = books.filter((book) => !book.borrows.some(checkedOut));
  checkedOutBooks = books.filter((book) => book.borrows.some(checkedOut));
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let returnedAccounts = [];
  let borrows = book.borrows;
  for (let i = 0; i < borrows.length; i++) {
    borrowedAccount = accounts.find((account) => account.id == borrows[i].id);
    if (
      borrowedAccount &&
      !returnedAccounts.find((account) => account.id == borrowedAccount.id)
    ) {
      borrowedAccount.returned = borrows[i].returned;
      returnedAccounts.push(borrowedAccount);
    }
  }
  return returnedAccounts;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
