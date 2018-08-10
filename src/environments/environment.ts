// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBooks: 'https://www.googleapis.com/books/v1/',
  firebase: {
    apiKey: "AIzaSyClKkX4nlm6AwFAHAhxFmWUoVasFdhXqkA",
    authDomain: "books-app-5f5da.firebaseapp.com",
    databaseURL: "https://books-app-5f5da.firebaseio.com",
    projectId: "books-app-5f5da",
    storageBucket: "books-app-5f5da.appspot.com",
    messagingSenderId: "979473602888"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
