# Zinnia test

### Prerequisites:

- [Node.js](https://nodejs.org/en)
- [Playwright](https://playwright.dev/docs/intro)

## Environmental Setup

1. Install Node.js (version 16.16.0 or higher)
   https://nodejs.org/en/download/
2. Install latest yarn:
   `npm install --global yarn`
3. Change to this directory
4. Install all required yarn packages
   using: `yarn install`
5. install supported browsers:
   `npx playwright install`

## Running Tests

- run the API tests:
  `npx playwright test --project=api`