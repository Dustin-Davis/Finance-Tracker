insert into users
 ("email", "password")
 values
  ('test@mail.com', 'asdf'),
  ('user@mail.com', 'asdf');

insert into categories
  ("category")
  values
   ('Business'),
   ('Investments'),
   ('Extra income'),
   ('Deposits'),
   ('Lottery'),
   ('Gifts'),
   ('Salary'),
   ('Savings'),
   ('Rental income'),
   ('Bills'),
   ('Car'),
   ('Clothes'),
   ('Travel'),
   ('Food'),
   ('Shopping'),
   ('House'),
   ('Entertainment'),
   ('Phone'),
   ('Pets'),
   ('Other');

insert into transactions
  ("amount", "type", "categoryId", "userId", "date")
  values
    (2000, 'Income', 1, 1, '2022-02-21'),
    (25, 'Expense', 2, 1, '2022-02-21'),
    (67, 'Expense', 2, 1, '2022-02-21'),
    (135, 'Expense', 3, 1, '2022-02-21'),
    (1200, 'Income', 1, 1, '2022-02-21');
