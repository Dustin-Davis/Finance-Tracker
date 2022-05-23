insert into users
 ("email", "hashedPassword")
 values
  ('Guest@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$DH28hcWlZmaaNWM9SVnCzA$RpyTyBaq0Qz2Z4SZJWQVfS+WMMoANmedW0h4yiLKq8Y');

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
    (2000, 'Income', 7, 1, '2022-02-21'),
    (25, 'Income', 2, 1, '2022-02-21'),
    (67, 'Income', 1, 1, '2022-02-21'),
    (135, 'Expense', 10, 1, '2022-02-21'),
    (1200, 'Expense', 11, 1, '2022-02-21');
