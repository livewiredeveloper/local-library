function findAccountById(accounts, id) {
  let found = false;
  let x = 0;
  let ret;
  while (found == false && x <= accounts.length) {
    if (accounts[x].id == id) {
      ret = accounts[x];
      found = true;
    }
    x++;
  }
  return ret;
}

function sortAccountsByLastName(accounts) {
  function compareLastName(accountA, accountB) {
    return accountA.name.last < accountB.name.last;
  }
  for (let i = 0; i < accounts.length - 1; i++) {
    for (let j = 0; j < accounts.length - i - 1; j++) {
      if (compareLastName(accounts[j], accounts[j + 1]) == false) {
        let temp = accounts[j];
        accounts[j] = accounts[j + 1];
        accounts[j + 1] = temp;
      }
    }
  }
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let id = account.id;
  let booksBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    borrowedArr = books[i].borrows;
    filteredArr = borrowedArr.filter((borrow) => borrow.id == id);
    booksBorrowed = booksBorrowed + filteredArr.length;
  }
  return booksBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  let id = account.id;
  let borrowedBooks = [];
  for (let i = 0; i < books.length; i++) {
    let borrowedRecord = books[i].borrows.find(
      (borrow) => borrow.returned == false && borrow.id == id
    );
    if (borrowedRecord) {
      checkedOutBook = books[i];
      checkedOutBook.author = authors.find(
        (author) => author.id == checkedOutBook.authorId
      );
      borrowedBooks.push(checkedOutBook);
    }
  }
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
