##For setup

create .env file on root then copy env.example

create db name "exam" or any name just change the DB_DATABASE on .env

then yarn install to install all package

after installation

run migration and seeder

yarn db:migration
yarn db:seedall

## documentation

I created 3 endpoint

###### http://localhost:8000/transaction

- post request
  for creating transaction here is the sample payload you can change the amount you want.
  > {
  > "amount": 500
  > }

###### http://localhost:8000/ruleset

- post request
  for creating ruleset here is the sample payload

> {
> "title": "tiered rate",
> "cash_back": 2,
> "redemption_limit": 15,
> "min_transaction": 10,
> "start_date": "2022-01-09",
> "end_date": "2022-06-09"
> }

note that the cash_back is percentage.means that the 2 is 2 percent cashback on every transaction amount.

###### http://localhost:8000/cashback

- get request
  on getting cashback it returns the cashback of all transaction.

also the creation of transaction I assume the user is logged in with the Id of 1 which is my account I created on seeder. thats why all transaction created is linked on to the user and all cashback return is transaction by the user.
