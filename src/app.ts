import "reflect-metadata";
import { AppServer } from "./server";

console.log("STARTED");

/**
 * Bootstrap the application.
 */
AppServer.start()
  .then((port) => {
    console.log(`Application is listening on port [${port}]`);
  })
  .catch((error) => {
    console.error(error.message);
  });
