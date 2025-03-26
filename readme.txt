<<<<<<< HEAD


=======
npx tsc --init    to create tsconfig file


if you are facing problem to run, steps to run: at 10:40

install tsx gloablly insted of ts-node: npm i tsx --save-dev
then use nodemon -> npm run dev -> 

 "type": "module",
  "main": "./src/index.ts",
  "scripts": {
    "dev": "nodemon"


"scripts": {
    "dev": "nodemon --exec tsx src/index.ts"
  },

End to End Tests -> automating tests like a user will use this application

first we will setup a test database server to recieve test data 

npm init playwright@latest
Need to install the following packages:
create-playwright@1.17.135
Ok to proceed? (y) y

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test


import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

git remote add origin https://github.com/AbhinavKrr/Hotel_Booking_APP_MERN-STACK.git
>>>>>>> 94a51d3 (Updates)

servers for hosting images - we will get links to store in mongodb ||  name of service: cloudinary
