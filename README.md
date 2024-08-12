# BackendServer

## Overview

This repository contains the backend server for the Slidely AI Internship Application task. The backend is built with Express and TypeScript and uses a JSON file (`db.json`) as a database to store form submissions. 

## Features

- **Endpoints:**
  - `GET /ping`: Returns `True` to indicate the server is running.
  - `POST /submit`: Accepts form submissions with the following parameters:
    - `name` (string)
    - `email` (string)
    - `phone` (string)
    - `github_link` (string)
    - `stopwatch_time` (number)
  - `GET /read`: Retrieves a form submission by index. Requires a query parameter `index` (0-indexed).

## File Structure

```plaintext
node_modules/
src/
  ├── server.ts       # Main server file
  ├── routes.ts       # Route definitions
  ├── controllers.ts  # Request handlers
  ├── utils.ts        # Utility functions
db.json                # JSON file to store submissions
package-lock.json
package.json
tsconfig.json
README.md              # This file


```

## Installation

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (v6 or higher recommended)

git clone https://github.com/AaryanPalve5/SlidelyTask2-BackendServer

Install Node and dependencies and run this command in the terminal

```npm install ```

```npm run start```

