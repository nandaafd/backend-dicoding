const { nanoid } = require('nanoid');
const books = require('./books');

const tambahBuku = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,

  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt,
    updatedAt,

  };
  if (name === '' || !name) {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (typeof pageCount !== 'number' || typeof readPage !== 'number') {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal menambahkan buku. pageCount atau readPage harus Berupa Number',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  books.push(newBook);

  const issukses = books.filter((book) => book.id === id).length > 0;

  if (issukses) {
    const response = h.response({
      status: 'sukses',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'gagal',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const ambilSemuaBuku = (request, h) => {
  const {
    name: queryOfName,
    reading: queryOfReading,
    finished: queryOfFinished,
  } = request.query;

  if (queryOfName) {
    const AllBooks = books
      .filter((book) => book.name.toLowerCase().includes(queryOfName.toLowerCase()))
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));

    const response = h.response({
      status: 'sukses',
      data: {
        books: AllBooks,
      },
    });
    response.code(200);
    return response;
  }
  if (queryOfReading) {
    let AllBooks;

    if (queryOfReading === '1') {
      AllBooks = books
        .filter((book) => book.reading === true)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    } else {
      AllBooks = books
        .filter((book) => book.reading === false)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    }

    const response = h.response({
      status: 'sukses',
      data: {
        books: AllBooks,
      },
    });
    response.code(200);
    return response;
  }

  if (queryOfFinished) {
    let AllBooks;

    if (queryOfFinished === '0') {
      AllBooks = books
        .filter((book) => book.finished === false)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    } else {
      AllBooks = books
        .filter((book) => book.finished === true)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    }

    const response = h.response({
      status: 'sukses',
      data: {
        books: AllBooks,
      },
    });
    response.code(200);
    return response;
  }

  const AllBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = {
    status: 'sukses',
    data: {
      books: AllBooks,
    },
  };
  return response;
};

const ambilIdBuku = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'sukses',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'gagal',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBuku = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,

  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (!name || name === '') {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (typeof pageCount !== 'number' || typeof readPage !== 'number') {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal memperbarui buku. pageCount atau readPage harus Berupa Number',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'gagal',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'sukses',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'gagal',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const hapusBuku = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'sukses',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }



  const response = h.response({
    status: 'gagal',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = {
  tambahBuku,
  ambilSemuaBuku,
  ambilIdBuku,
  editBuku,
  hapusBuku,
};
