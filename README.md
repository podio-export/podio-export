# podio-export

> Export [Podio](https://podio.com/) data.

## Security considerations

In order to keep you account secure we recommend that:

-   If you generate a `client_id` and `client_secret` only to run `podio-export` please consider removing it once you are done using `podio-export`.
-   Optionally, you may want to add a user to your Podio account just to run `podio-export` and generate the `client_id` and `client_secret`. This will allow you to keep existing user accounts unchanged. If you create the test user, please remember to remove it from your account once you are done using `podio-export`.

## Using

***Note***: The process below assumes [`node`](https://nodejs.org/en/download/package-manager/) is already installed.

[Download `podio-export`](https://github.com/podio-export/podio-export/archive/master.zip) and unzip it.

Execute the following commands to download `podio-export` and install dependencies:

```shell
cd podio-export
npm install --production
```

Head over to Podio to [generate a client_id and client_secret](https://podio.com/settings/api) and add your client_id, client_secret, username and password to a new file you should create as `podio-export/secrets.json`. This file should have the following format:

```json
{
  "clientId": "YOUR_CLIENT_ID",
  "clientSecret": "YOUR_CLIENT_SECRET",
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD"
}
```

And finally run the tool:

```shell
npm run podio-export
```

Once the tool has finished, it will show the contents of the resulting `summary.json`, which should be something like:

```json
podio-export result: {
 "MY_USERNAME": {
  "My Organization": {
   "numTasks": 3,
   "Demo Workspace": {
    "Leads & Clients": {
     "numFiles": 0,
     "numItems": 76,
     "totalItems": 76
    },
    ... other apps ...
   },
   ... other workspaces ...
   "Employee Network": {}
  },
  ... other organizations ...
  "numContacts": 2
 }
}
```

## Rate limiting & performance

Please note that Podio will [rate limit](https://developers.podio.com/index/limits) requests and lower rate limits apply for the following `podio-export` actions:

-   Exporting organization tasks (each 100 tasks exported count as one request).
-   Exporting application items (each 500 items of a single app exported to JSON count as one request).
-   Downloading files (each file downloaded counts as one request).

In order to work within these rate limits, once the limit is reached the tool will halt and wait until the next rate interval (hour) to continue working. See configuration option `RATE_LIMIT` for further details.

***Note***: The tool only guarantees operation within `RATE_LIMIT` during one run. Invoking the tool multiple times may result in these limits being exceeded.

## Configuration options

The following configuration options can be changed in the `./config.json` file:

-   `RATE_LIMIT` - assign the number of requests per hour. Defaults to 250 requests per hour (the [Podio lower rate limit](https://developers.podio.com/index/limits)). Change this value only if your `client_id` is granted a higher limit by Podio.
-   `SHOULD_DOWNLOAD_FILES` - controls if files in your app items should be downloaded. Defaults to `true`. Please note that downloading files is the most common cause for exceeding `RATE_LIMIT`.
-   `EACH_LIMIT` - how many requests to perform simultaneously. These will be throttled to comply with the configured `RATE_LIMIT`. Defaults to 4.

## Data Exported

The following describes which data is exported to the `./podio-export` folder:

-   For the user account provided, will export data for each organization as follows:
    -   `./podio-export/USER_NAME/summary.json` contains a count of all data exported in the last `podio-export` session ([see sample](#sample-summary.json)).
    -   `./podio-export/USER_NAME/contacts_X-Y.json` files containing contacts X through Y for user `USER_NAME`.
    -   `./podio-export/USER_NAME/ORG_NAME` folder (one for each organization).
    -   `./podio-export/USER_NAME/ORG_NAME/ORG_NAME.json` file containing information about organization `ORG_NAME`.
    -   `./podio-export/USER_NAME/ORG_NAME/tasks_X-Y.json` files containing tasks X through Y for organization `ORG_NAME`.
-   For each organization identified, will export data for each workspace as follows:
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME`: folder (one for each workspace).
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/WORKSPACE_NAME.json` file containing information about workspace `WORKSPACE_NAME`.
-   For each workspace identified, will export data for each workspace as follows:
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/APP_NAME`: folder (one for each application).
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/APP_NAME/APP_NAME.json` file containing information about application `APP_NAME`.
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/APP_NAME/items_X-Y.json` files containing items X through Y for application `APP_NAME`.
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/APP_NAME/files_X-Y.json` files containing information on files X through Y in application `APP_NAME`.
    -   `./podio-export/USER_NAME/ORG_NAME/WORKSPACE_NAME/APP_NAME/files` folder containing the actual files in application `APP_NAME`.

## Sample summary.json

Here is a sample `summary.json` file generated by exporting a single organization containing only the default Podio *Demo Workspace*:

```json
{
 "MY_USERNAME": {
  "My Organization": {
   "numTasks": 3,
   "Demo Workspace": {
    "Leads & Clients": {
     "numFiles": 0,
     "numItems": 76,
     "totalItems": 76
    },
    "Projects": {
     "numFiles": 0,
     "numItems": 12,
     "totalItems": 12
    },
    "Inspiration": {
     "numFiles": 0,
     "numItems": 9,
     "totalItems": 9
    },
    "Meetings": {
     "numFiles": 0,
     "numItems": 0,
     "totalItems": 0
    },
    "Expenses": {
     "numFiles": 0,
     "numItems": 32,
     "totalItems": 32
    }
   },
   "Employee Network": {}
  },
  "numContacts": 0
 }
}
```

## License

MIT © [podio-export](https://github.com/podio-export)

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

Check the [software license](#license) for further details.
