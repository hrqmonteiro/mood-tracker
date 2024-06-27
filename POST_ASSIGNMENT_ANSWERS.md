# Describe the major design/build decisions and why you made them

- Decided to (re)write the frontend in proper Nextjs 14 code and with TypeScript, mostly to ensure type safety and to use the benefits of the app router on the latest versions in comparison with the pre-13 ecossystem.
- Use tailwind instead of module.css because of how quick one can build components and interfaces with it
- Use Hono to build the backend because of the modern and fast API it have which allows me to work around the Context object and quickly build routes, responses and status sending.

# How long did the assignment take (In hours)

- 8 hours total
  - 2 hour frontend rewrite
  - 3 hour backend write and documenting using Swagger
  - 2 hour integrating the backend on the frontend
  - 1 hour dockerizing, refactoring minor stuff and writing README.md

# If you could go back and give yourself advice at the beginning of the project what would it be

- Break the components differently, using Atomic Design would be a good decision in this case

# Do you feel this assignment allowed you to showcase your abilities effectively?

- Sure!

# Are there any significant web development-related skills that you possess that were not demonstrated in this exercise?

- Integrating with cloud services, mostly AWS (S3, Lambda Functions, Serverless application, EC2, Cognito)
- Working with GraphQL instead of REST API (From scratch, with Apollo Server/Client, with Pylon etc)
- Working with Event-driven architecture (Kafka, RabbitMQ)
- Microsservices architecture
- NoSql databases (MongoDB, DynamoDB etc)
- Automated testing (Unit, integration, e2e), because of time constraint i wasn't able to
- Etc
