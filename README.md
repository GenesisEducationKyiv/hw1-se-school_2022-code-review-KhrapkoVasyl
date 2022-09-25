<p align="center">
    <a href="https://github.com/KhrapkoVasyl/btc-uah-rate-api/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/KhrapkoVasyl/btc-uah-rate-api?style=for-the-badge"></a>
    <a href="https://github.com/KhrapkoVasyl/btc-uah-rate-api/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/KhrapkoVasyl/btc-uah-rate-api?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/btc-uah-rate-api/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/KhrapkoVasyl/btc-uah-rate-api?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/btc-uah-rate-api/blob/main/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/KhrapkoVasyl/btc-uah-rate-api?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/btc-uah-rate-api">
        <img alt="GitHub license" src="https://img.shields.io/github/contributors/KhrapkoVasyl/btc-uah-rate-api.svg?style=for-the-badge">
    </a>

</p>

<div align="center">
  <h1 align="center">GSES2 BTC-UAH rate API</h1>
</div>

## About the project

Genesis Software Engineering School test task. API to track the exchange rate of BTC (bitcoin) to the UAH (hryvnia)

View [Application Architecture Diagram](https://genesiseducationkyiv.github.io/hw1-se-school_2022-code-review-KhrapkoVasyl/app-architecture)

### Built with

- Runtime environment: [Node.js](https://nodejs.org/)
- Web framework: [Express](https://expressjs.com/)
- Email sending service: [Nodemailer](https://nodemailer.com/)
- Validation: [express-validator](https://express-validator.github.io/docs/)
- Swagger documentation: [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) & [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)

## Installation

Make sure you have [Node.js](http://nodejs.org/) installed.

1. Clone the repo:
   ```sh
   git clone https://github.com/KhrapkoVasyl/btc-uah-rate-api.git
   ```
2. Open project directory and install NPM packages:

   ```sh
   cd btc-uah-rate-api
   npm install
   ```

3. Create `.env` file and fill it with your own configuration data following [the example](https://github.com/KhrapkoVasyl/btc-uah-rate-api/blob/main/.env.example):

   ```sh
   PORT=8080
   HOST=127.0.0.1
   OAUTH_CLIENT_ID='oauth_client_id'
   OAUTH_CLIENT_SECRET='oauth_client_secret'
   OAUTH_REDIRECT_URI='https://developers.google.com/oauthplayground'
   OAUTH_REFRESH_TOKEN='oauth_refresh_token'
   USER_MAIL_ADDRESS='user@gmail.com'
   ```

   ***

   **NOTE**

   To send emails, this project in addition to Nodmailer also uses the Gmail service with OAuth2 (for security purposes).
   So to get configuration data: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_REDIRECT_URI`, `OAUTH_REFRESH_TOKEN`, you need to set up a project in **the Google Cloud Platform**.

   Link with setup information:

   - [Setting up Gmail OAuth2](https://docs.emailengine.app/setting-up-gmail-oauth2-for-imap-api/)
   - [Nodemailer with Gmail](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/)

   ***

4. Start the application:

   ```sh
   npm start
   ```

5. Open http://127.0.0.1:8080/api/api-docs to view the API documentation in your browser.

## Tests

To run the tests use the command:

```sh
npm test
```

## Docker setup

The application files contain a Docker file with a description of the commands for building Docker images.

---

**NOTE**

To successfully build the Docker image, you need to create a .env file.

In order to access the application from your browser outside the container, if you use _host=127.0.0.1_ or _localhost_, you need to replace the host value with _0.0.0.0_

For a detailed description of the problem follow [the link](https://stackoverflow.com/questions/46184173/err-empty-response-from-docker-container).

---

Use the following command to build the image:

```sh
docker build -t btc-uah-rate-api .
```

To start the container, use the following command:

```sh
docker run -d -p 8080:8080 --name app_container btc-uah-rate-api
```

## Contributors

- Vasyl Khrapko - [@vazzz7zzzok](https://t.me/vazzz7zzzok) - khrapko2002@gmail.com
