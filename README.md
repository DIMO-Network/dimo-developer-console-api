# Developer Console API

This repository hosts the codebase for the DIMO Developer Console API, powering the platform at `https://console.dimo.xyz`. The API facilitates seamless interactions and management of developer tools and resources within the DIMO ecosystem.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Set Up Google and GitHub OAuth Applications](#set-up-google-and-github-oauth-applications)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [Contributing](#contributing)

## Getting Started

These instructions will guide you on setting up the project locally.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/package-manager) (v20.x or later)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)
- A Google Developer Account and GitHub Account for OAuth integration.

### Set Up Google and GitHub OAuth Applications
Follow the steps outlined [here](https://github.com/DIMO-Network/dimo-developer-console?tab=readme-ov-file#set-up-google-and-github-oauth-applications) to set up your Google and Github OAuth applications. The credentials that you created for those applications should be reused here.

### Installation

1. Clone the repository:

```bash
git clone git@github.com:DIMO-Network/dimo-developer-console-api.git
cd dimo-developer-console-api
```

2. Set up environment variables:

- Create a .env.local file in the root directory of the project:

```bash
PGHOST=localhost
PGUSER=admin
PGDATABASE=dimo-dev-console
PGPASSWORD=12345
PGPORT=5432

# TODO - try to remove these if not needed
NEXTAUTH_SECRET=<YOUR_SECRET>
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>

# Your ZAPIER lead generation path, leave empty for dev environments
ZAPIER_LEAD_WEBHOOK_PATH=
STRIPE_API_KEY=<YOUR_SECRET>
COINMARKET_API=<YOUR_SECRET>
COINMARKET_API_KEY=<YOUR_SECRET>
```

3. Database Setup:

- Start the PostgreSQL instance using Docker:

```bash
docker-compose up -d
```
- This command will start a PostgreSQL instance on your local machine as defined in the docker-compose.yml file.

4. Install the dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

A brief description of the main folders and files in the project:

- `./src/app/api`: Contains all the application API routes using the new App Router in Next.js.
- `./src/config`: Configuration files
  - `default` is mainly used for the development environment and default values in `staging` and `prod`
  - `preview` is mainly used for changing variable values in the staging environment.
  - `production` is mainly used for changing variable values in the production environment.
- `./src/controllers`: Handles the logic for processing requests and returning responses in the application.
- `./src/services`: Contains the business logic of the application, interacting with the database, APIs, and other services.
- `./src/models`: Sequelize models that define the schema and relationships of the PostgreSQL database.
- `./src/scripts`: Scripts used for initializing PostgreSQL with Docker.
- `./src/types`: TypeScript type definitions and interfaces used throughout the application.
- `./src/utils`: Utility functions and helper methods that are used across different parts of the application.


## Technologies Used

- **Next.js**: A React framework for server-side rendering, static site generation, and more.
- **PostgreSQL**: A powerful, open-source relational database system.
- **JavaScript/ES6+**: Modern JavaScript syntax and features.


## Database Setup

1. Ensure Docker is installed and running on your machine.

2. Set up environment variables:

- Make sure the `PG` related variables in your .env.local file is configured to connect to the PostgreSQL instance that will be created by Docker. Your .env.local file should look something like this:

```bash
PGHOST=<YOUR_PG_HOST>
PGUSER=<YOUR_PG_USER>
PGDATABASE=<YOUR_PG_DATABASE>
PGPASSWORD=<YOUR_PG_PASSWORD>
PGPORT=<YOUR_PG_PORT>
```

- Replace username, password, localhost, 5432, and the database name with your specific PostgreSQL credentials, host, port, and database name as defined in the `docker-compose.yml` file.

3. Start the PostgreSQL instance using Docker:

- Run the following command to start the Docker containers defined in your docker-compose.yml file:

```bash
docker-compose up -d
```

- This command will start a PostgreSQL instance on your local machine, accessible via the credentials and settings specified in the `PG` environment variables.

4. You can connect to the PostgreSQL instance using a database management tool like pgAdmin or via the command line to verify the setup.

## Contributing

We welcome contributions to this project! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub by clicking the "Fork" button at the top right of the repository page.

2. Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/your-forked-repository.git
cd your-forked-repository
```

3. Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes in the codebase.

5. Commit your changes with a clear and concise commit message:

```bash
git commit -m "Add feature/fix: Describe your changes"
```

6. Push your changes to your forked repository on GitHub:

```bash
git push origin feature/your-feature-name
```

7. Open a Pull Request:

- Go to the original repository on GitHub.
- Click on the "Pull Requests" tab.
- Click the "New Pull Request" button.
- Select the branch you made your changes on and submit the Pull Request.

8. Describe your changes in the Pull Request. Provide as much detail as possible about what you’ve done and why.

9. Wait for a review from the maintainers. They may ask for changes or provide feedback.

10. Once your Pull Request is approved, it will be merged into the main branch.

Thank you for contributing to the project!
