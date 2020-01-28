# Configuration

The `cxsast_custom_reporting` application relies on two types of configurations: `global configuration` and `run-time configuration`.

While `global configuration` defines how appllication will communicate with other rquired software (e.g DB, SMTP, etc.) `run-time configuration` defines the behavior and actions that will be executed by application.

This document describes in details both configurations over the next sections.

## Global configuration

Global configuration is defined on the `<APP-ROOT>\config\config.ini`.
The file is divided in sections, were each section have key-value pairs representing the required information in order to communicate with a specific external application. Bellow is a example of a global configuration file:

```ini
[database]
host=smtp.enterprise.net
port=465
username=smtpuser@enterprise.net
password=smtpuser_password

[smtp]
host=smtp.enterprise.net
port=465
username=smtpuser@enterprise.net
password=smtpuser_password
```

The global configuration file supports the sections described bellow:

| Section      | M/O | Description                                                            |
| ------------ | --- | ---------------------------------------------------------------------- |
| `[database]` | _M_ | defines the configuration required to communicate with CxSAST database |
| `[smtp]`     | _M_ | defines the configuration required to communicate with email services  |

### database section

The database section is responsible for handling CxSAST database communication parameters. The following keys are supported:

| Key          | type       | M/O | Description               |
| ------------ | ---------- | --- | ------------------------- |
| `[database]` |            | _M_ | the section name          |
| `host`       | _`string`_ | _M_ | the database host         |
| `port`       | _`number`_ | _M_ | the database port         |
| `username`   | _`string`_ | _M_ | the database user name    |
| `password`   | _`string`_ | _M_ | the dataase user password |

### smtp section

The smtp section is responsible for handling email service communication parameters. The following keys are supported:

| Key        | type       | M/O | Description                   |
| ---------- | ---------- | --- | ----------------------------- |
| `[smtp]`   |            | _M_ | the section name              |
| `host`     | _`string`_ | _M_ | the smtp server host          |
| `port`     | _`number`_ | _M_ | the smtp server port          |
| `username` | _`string`_ | _M_ | the smtp server user name     |
| `password` | _`string`_ | _M_ | the smtp server user password |

## Run-Time configuration

Run-time configuration items are defined as parametes during execution and allows end users the required flexibility to execute the application in different scnearios.

Currently run-time configuration support the following parameters:

| Key              | type       | M/O | Description                                 |
| ---------------- | ---------- | --- | ------------------------------------------- |
| `reportType`     | _`string`_ | _M_ | The type of report that should be generated |
| `reportTemplate` | _`string`_ | _M_ | The HTML template that should be generated  |
| `reportAudience` | _`string`_ | _M_ | a comma separated list of email receivers   |
