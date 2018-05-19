# blog-project

Everything is a work-in-progress.

Templating engine : [Twig](https://twig.symfony.com/)

CSS framework : [Bulma](https://bulma.io/)

Eventually, there will be a bit of [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Quick setup

Install the dependencies
```bash
$ composer install
$ yarn install
```

Setup the SQLite database with example data :
```bash
$ php bin/console doctrine:database:create
$ php bin/console doctrine:fixtures:load
```

Compile the assets with
```bash
$ yarn run build
```

Finally run the actual server with
```
$ php bin/console server:run
```

## Routes

You can visualize the application routes with 
```bash
$ php bin/console debug:router
```
