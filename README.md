# A simple example how to use typeorm (SQL) with domain

## How to run this application

Clone this repo

`$ git clone <url>`

Install dependencies

`$ yarn install`

Up database docker service 

`$ docker-compose up -d`

Run application

`$ yarn start:dev`

Open playground

`$ http://localhost:3000/graphql`

Queries and Mutations 

```gql

mutation CreateService {
  createService(CreateServiceInput:{
    name: "hello name"
  })
}

query GetServices {
  getService{
    id
    name
    createdAt
    updatedAt
  }
}

mutation CreateAccount {
  createAccount(CreateAccountInput:{
    name:"new account",
    servicesId: [
      "6f0f8924-ae4c-4549-ad83-745c37ce6211", 
      "94817251-b65f-4d97-8f17-6594a0c27324"
    ]
  })
}

query GetAccounts {
  getAccount{
    id
    name
    createdAt
    updatedAt
    services{
      id
      name
    }
  }
}

mutation UpdateAccount {
  updateAccount(UpdateAccountInput:{
    id:"518bfe8a-c85b-4f37-88e2-8453dde09437"
    name:"one neew value name"
    servicesId:[
      "d2123de9-0394-4525-ba47-1ae38d6b65f8"
    ]
  })
}

```