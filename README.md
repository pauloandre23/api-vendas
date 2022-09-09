

##  Restful API - Node.js, Express, Typescript, etc

This api was first developed without worrying about clean architecture; I was able to create, find and delete both users and products of an ecommerce.
I have Already used both tsyringe and typeorm new DataSource method to be able to aply a DDD architecture, removing the responsability of accesing infra
layer from the domain (decoupling).

Before we did have a User entity, and it was closely attached to the typeorm repository. Also I had the issue to always have multiple instances of repository
across my services. With tsyringe I just need to pass it through constructor (DI), and be sure to rely on a repository interface, not on the repository itself (which
was coupled to the domain). Make sure to create a singleton from the instances to be injected on each controller.



Techs used: Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, etc.


## RUN
After clone from git repo:
```
cd api-vendas

yarn

# or

npm install
```
Now just run yarn dev. Make sure to create your database instance, it could be running on a docker container, like I did.

[LinkedIn](https://www.linkedin.com/in/paulo-andr%C3%A9-de-barros-a64377a8/)
