# Configuration

The `cxsast_custom_reporting` application relies on two types of configurations: `global configuration` and `run-time configuration`.

While `global configuration` defines how appllication will communicate with other software (e.g CxSAST, SMTP, etc.) `run-time configuration` defines the behavior and actions that will be executed.

This document describes in details both configurations over the next topics.

## Global configuration

Global configuration is defined on the `<APP-ROOT>\config\config.ini`.
The file is divided in sections where each section is have definitions of key-value pairs as the example bellow:

```ini
[sast]
url=http://localenv.net
username=cxsastuser@enterprise.net
password=cxsastuser_password

[smtp]
host=smtp.enterprise.net
port=465
username=smtpuser@enterprise.net
password=smtpuser_password
```

Currently global configuration file supports the following information:

| Key        | type       | M/O | Description                                                            |
| ---------- | ---------- | --- | ---------------------------------------------------------------------- |
| `[sast]`   |            | _M_ | defines the section relatd with CxSAST configuration                   |
| `url`      | _`string`_ | _M_ | the url that application will use to communicate with CxSAST Manager   |
| `username` | _`string`_ | _M_ | the user that will be used to communicate with CxSAST Manager          |
| `password` | _`string`_ | _M_ | the user password that will be used to communicate with CxSAST Manager |
| `[smtp]`   |            | _M_ | defines the section related with SMTP configuration                    |
| `host`     | _`string`_ | _M_ | the smtp host that will be used by application                         |
| `port`     | _`number`_ | _M_ | the smtp port that will be used by application                         |
| `username` | _`string`_ | _M_ | the smtp user that will be used by application                         |
| `password` | _`string`_ | _M_ | the smtp user password that will be used by application                |

## Run-Time configuration

Run-time configuration items are defined as parametes during execution and allows end users the required flexibility to execute the application in different scnearios.

Currently run-time configuration support the following parameters:

| Key              | type       | M/O | Description                                 |
| ---------------- | ---------- | --- | ------------------------------------------- |
| `reportType`     | _`string`_ | _M_ | The type of report that should be generated |
| `reportTemplate` | _`string`_ | _M_ | The HTML template that should be generated  |
| `reportAudience` | _`string`_ | _M_ | a comma separated list of email receivers   |
