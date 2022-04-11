const {
  tambahBuku,
  ambilSemuaBuku,
  ambilIdBuku,
  editBuku,
  hapusBuku,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: tambahBuku,
  },
  {
    method: 'GET',
    path: '/books',
    handler: ambilSemuaBuku,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: ambilIdBuku,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBuku,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusBuku,
  },
];

module.exports = routes;
