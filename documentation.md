DOCUMENTATION

1/ Init Project
2/ Install React Dom Router
npm i react-router-dom
react-router
3/ Create Header, HomePage, NotFound page
4/ Init router

npm install @mui/material @emotion/react @emotion/styled
npm i @mui/icons-material
npm i react-awesome-reveal

## PLAYWRIGHT / TESTING

npx playwright test
npx playwright test --headed

### Debug

npx playwright test --debug

### Run specific test

npx playwright test landing-page.spec.ts
npx playwright test tests/todo-page/ tests/landing-page/

### Reporting


npx playwright show-report --> localhost:9323
npx playwright show-report

#### Modifier le format du rapport de test

npx playwright test --reporter=json
npx playwright test --reporter=lcov
npx playwright test --reporter=junit
npx playwright test --reporter=junit --output=playwright-report



await page.pause();


## DOCKER 

docker build -t react-app .
docker images


## ESLINT PRETTIER

npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint . --ext .js,.jsx,.ts,.tsx
npx prettier --write .