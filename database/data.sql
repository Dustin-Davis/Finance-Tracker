insert into users
 ("email", "password")
 values
  ('test@mail.com', 'asdf'), -- this will be userId 1
  ('user@mail.com', 'asdf'); -- userId 2

insert into categories
  ("category")
  values
   ('salary'), -- This will be categoryId 1
   ('food'), -- categoryId 2
   ('entertainment'); -- categoryId 3

insert into transactions
  ("amount", "type", "categoryId", "userId", "date")
  values
    (2000, 'income', 1, 1, '2022-02-21'),
    (25, 'expense', 2, 1, '2022-02-21'),
    (67, 'expense', 2, 1, '2022-02-21'),
    (135, 'expense', 3, 1, '2022-02-21'),
    (1200, 'income', 1, 1, '2022-02-21');
