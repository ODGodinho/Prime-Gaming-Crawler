<h1 align="center">
  <br>
  <a href="https://github.com/ODGodinho"><img src="images/Stanley.jpg" alt="Stanley Imagem" width="300"/></a><br>
  <a href="https://github.com/ODGodinho"><img src="images/PrimeGaming.png" alt="Stanley Imagem" width="150"/></a>
  <br>
  Prime Gaming Crawler By Dragons Gamers
  <br>
</h1>

<h4 align="center">Using the Stanley typescript for crawler/web-scraping playwright or puppeteer 🤖🚀!</h4>

<p align="center">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/ODGodinho/Prime-Gaming-Crawler">

  <a href="https://www.linkedin.com/in/victor-alves-odgodinho/">
    <img alt="Made by ODGodinho" src="https://img.shields.io/badge/made%20by-ODGodinho-%2304D361">
  </a>

  <a href="https://github.com/ODGodinho/Prime-Gaming-Crawler/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ODGodinho/Prime-Gaming-Crawler">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

   <a href="https://github.com/ODGodinho/Prime-Gaming-Crawler/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/ODGodinho/Prime-Gaming-Crawler?style=social">
  </a>

</p>

## Table of Contents

-   [Presentation](#-presentation)
    -   [Diagram Page](#diagram-page)
-   [Libraries](#-libraries)
-   [Dependencies](#-dependencies)
-   [Installing and Updating](#installing-or-updating)
    -   [Install](#install)
-   [Start Project](#start-project)
-   [Variables Info](#variables-info)
-   [Project Diagram](#project-diagram)
    -   [Diagram Page](#diagram-page)

<br />

---


## 💿 Presentation

This is an example, the project is responsible for recovering the free games on amazon gaming and saving the keys in `game-codes.csv` or automatically rescuing the games

![Amazon Get Game](./images/AmazonGaming.gif)

## 🖥 Libraries

#### `Crawler`

-   [Node.js](https://nodejs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Colors](https://github.com/Marak/colors.js)
-   [Puppeteer](https://github.com/puppeteer/puppeteer)
-   [Playwright](https://playwright.dev/)
-   [Eslint](https://eslint.org/)

## 📁 Dependencies

#### `Crawler`

-   [Node.js](https://nodejs.org) 16 or later
-   [Yarn](https://yarnpkg.com/) Optional/Recommended

<br>

## Installing Or Updating

---

### Install

1. First you need to install the [Dependencies](#-dependencies)
2. Copy `.env.example` file and create `.env` file
3. Configure `.env` file
    - `PERSISTENT_BROWSER` if configured, your browser will be used, otherwise use the browser on the robot and login and password will be required
    - `USER_LOGIN` AND `USER_PASSWORD` required only if `PERSISTENT BROWSER` is empty, or if you want to renew your login automatically



## Start Project

First install dependencies with the following command

```bash
yarn install
```

now run the following command to start

```bash
yarn prod
# or
yarn debug
```

## Variables Info

---

| $i                     | $$s                     | $s                    |
| ---------------------- | ----------------------- | --------------------- |
| Instances Pages Object | All Selectors Instances | Current Page Selector |

## Project Diagram

### Diagram Page

The following example shows how it was implemented with google search

> Diagram is not available

