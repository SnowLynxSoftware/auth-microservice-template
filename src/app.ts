import "reflect-metadata";
import { AppServer } from "./server";

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
