# Security Excercise

To demonstrate how a typical Cross Site Scripting attack works, we decided to build a very simple CRUD based NodeJS api with an Angular front-end. By disabling Angular's build-in sanitization system, we where able to run code that was put in via a text field to steal log-in tokens from users
