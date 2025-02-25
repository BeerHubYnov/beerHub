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
npx playwright test --reporter=json
