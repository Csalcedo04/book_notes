select books.isbn, books.name, books.review from books join users on users.id = books.user_id where books.user_id =1;

