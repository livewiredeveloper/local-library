function getTotalBooksCount(books) {
  return (books.length);
}

function getTotalAccountsCount(accounts) {
  return (accounts.length);
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (!borrow.returned)
        count = count + 1;
    });
  });
  return count;
}

function getMostCommonGenres(books) {
  let genresCount = {};
  books.forEach(book => {
    const { genre } = book;
    genresCount[genre] = (genresCount[genre] || 0) + 1;
  })
  const genres = Object.entries(genresCount).map(([name, count]) => ({ name, count }));
  genres.sort((a, b) => b.count - a.count);

  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = [];

  const sortedBooks = books.sort((a, b) => b.borrows.length - a.borrows.length);

  for (let i = 0; i < Math.min(sortedBooks.length, 5); i++) {
    const book = sortedBooks[i];
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }

  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = {};

  for (const book of books) {
    const author = authors.find((author) => author.id === book.authorId);
    if (author) {
      const { name: { first, last } } = author;
      const authorName = `${first} ${last}`;
      authorCounts[authorName] = (authorCounts[authorName] || 0) + book.borrows.length;
    }
  }

  const popularAuthors = Object.entries(authorCounts).map(([name, count]) => ({ name, count }));

  popularAuthors.sort((a, b) => b.count - a.count);

  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
