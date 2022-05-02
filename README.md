# Hospitalangular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### Cose da fare 
1. passare al componente tabella un array di action dove le action che devono essere presenti sono :
- edit/visualizza, 
- delete


2. Creare una schermata che visualizza il dettaglio di una riga della tabella, ad esempio per la tabella utenti mi deve visualizzare il dettaglio dell'utente con eventuale possibilità di effettuare una modifica ai dati.
-- Dunque le schermate da creare per visualizzare il dettaglio sono: 
  - Dettaglio utente  // endpoint /api/users/:id
  - Dettaglio paziente // endpoint /api/patients/:id
  - Dettaglio Triage // endpoint /api/triages/:id

