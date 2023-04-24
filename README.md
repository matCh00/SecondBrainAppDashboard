# SecondBrainAppDashboard
React + TypeScript + PrimeReact

### [matCh00.github.io/SecondBrainAppDashboard](https://match00.github.io/SecondBrainAppDashboard/)

--------------------------

## App

React
  + `npx create-react-app appName`
  + `cd appName`
  + `npm start`

PrimeReact
  + `npm install primereact`
  + _index.css_
    + @import "primereact/resources/themes/saga-blue/theme.css";
    + @import "primereact/resources/primereact.min.css";
    + @import "primeicons/primeicons.css";
    + @import "primeflex/primeflex";

## Docs

+ [primereact](https://primereact.org/)


--------------------------

## Github Pages

config
  + _package.json_
    + "homepage": "https://match00.github.io/SecondBrainAppDashboard/",
  + `npm install --save gh-pages`
  + _package.json_ ➜ scripts 
    + "predeploy": "npm run build",
    + "deploy": "gh-pages -d build",
  + `npm run predeploy`
  + `npm run deploy`

GitHub
  + Pages
    + _branch_  gh-pages