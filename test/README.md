# Your Linktree Link

These files form the basis of a new custom Linktree link with React.

## Getting started

Install dependencies using your package manager of choice:

`npm install` or `yarn`

Once dependencies are installed, you can run a hot-reloaded local development server on [http://localhost:3000](http://localhost:3000) via:

`npm run dev` or `yarn dev`

Optionally, pass the `--ssl` argument to start the development server as https on [https://localhost:3000](http://localhost:3000).

## File Structure

Several files were created during generation of this code:

- `src/index.jsx` which contains the React component for the presentation of you link type on a linktree profile
- `src/manifest.json` which contains information about your link type, and helps users to discover your link type via the Link Marketplace
- `src/settings.json` which contains a definition of the settings available to Linktree users when configuring the link type
- `fixtures/props-data.json` which contains test data during development and testing of your link type which is provided to your `index.jsx` component during development

## Create Link CLI login

Before you can deploy you link type, you will need to log in to the Create Link CLI first.

### Prerequisites

- A [Linktree](https://linktr.ee/) account
- Developer role assigned to your Linktree account ([contact](#contact) us if you need this)

### Login

To initiate the login flow, either install `@linktr.ee/create-link` globally, e.g. with npm:

```sh
npm install -g @linktr.ee/create-link
create-link login
```

Or use npx:

```sh
npx @linktr.ee/create-link login
```

The CLI will open a login page in your default browser. Follow the prompts and sign in with your Linktree account credentials.

If the web browser fails to open automatically, open the link presented in the CLI manually.

Once login is successful, an access token will be stored locally on your machine in `~/.netrc`. Link type deployments will now include this token to authenticate the requests.

## Publishing a link type

Before your link type can be made available to linktree users, it must be packaged, then published and reviewed by Linktree.

Before submitting code for review, ensure that the properties in your `manifest.json` and `settings.json` data are accurate and complete.

### Package your code

From the root of this directory, run  `npm run build` or `yarn build` to bundle the UI code.

### Publish your link type

Publishing a link type involves pushing your code to Linktree to make it available for testing on your linktree profile.

Publish your link via:

`npm run upload` or `yarn upload`

Your link type will be published in a `DRAFT` state - the link type will not be available for use by Linktree users, but you will be able to add this link type to your Linktree profile in order to test and validate that it functions as expected.

## Submit your link type for review

Once you are satisfied that your link type functions as expected, you can request a review from Linktree to have your link type submitted to the Link Types Marketplace:

Submit your link type via:

`npm run submit` or `yarn submit`

Linktree will test and review your link type, requesting changes if required, and following approval, will make your link available in the Link Types Marketplace for use by users.

## Granting access to additional developer users

Once a link type has been uploaded for the first time, the user who uploaded it will be set as the `Owner` of the link type by default. The `Owner` role merely represents a set of elevated Admin-like access privileges granted to the user for actions that can be performed on the link type. Excluding Linktree, initially only the original link type `Owner` publisher will have access to retrieve and modify the link type.

Access to a link type can be granted to additional users who may need to retrieve data or make changes in regards to the link type. You can grant a `Maintainer` role to a user for your link type (the user must already have a developer account set up) by providing the `Link Type ID` and the new user's `Username` via the `grant-access` command:

- If you installed `@linktr.ee/create-link` globally during the [Login](#Login) step (e.g. with npm), use the following:
  ```sh
  create-link grant-access <link_type_id> <username>
  ```
- Alternatively using npx:
  ```sh
  npx @linktr.ee/create-link grant-access <link_type_id> <username>
  ```

Maintainer access can be granted to as many developer accounts as required.

***Note: Only the link type `Owner` can grant Maintainer access to additional users. You must be already logged in with an Owner account in order to use the command (as described in the [Login](#Login) step).***

### Maintainer and Owner permitted actions

The following table compares which actions are permitted for Maintainers and Owners

|Action                      |Owner  |Maintainer|Notes                                      |
|----------------------------|-------|----------|-------------------------------------------|
|Create link type            |&check;|N/A       |Owner is defined when link is first created|
|Get link type               |&check;|&check;   |                                           |
|Update link type            |&check;|&check;   |                                           |
|Request link type review    |&check;|&check;   |                                           |
|Get link type maintainers   |&check;|&check;   |                                           |
|Add new link type maintainer|&check;|&cross;   |                                           |
|Remove link type maintainer |&check;|&cross;   |                                           |

## Contact

TODO: Organise contact details specific to link-kit team
