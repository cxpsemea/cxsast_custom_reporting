# Configuration

The CxSAST Custom Reporting should be configured by editing the `<install_path>\config\config.ini` file. This file contains all the required information that will allow communication with the database and mail server.

The configuration is separated in groups that contain pertinent configuration to a pecific external application.

The following sections describe in detail the configuration sections as also the inner key-value pairs required by CxSAST Custom Reporting. At the end of there is an example configuration for reference.

## [database] section

The `[database]` configuration section is responsible for configuring how the CxSAST Custom Reporting will communicate with the CxSAST database. The following key-value pairs are available within this section:

| Key        | type       | M/O | Description                       |
| ---------- | ---------- | --- | --------------------------------- |
| `host`     | _`string`_ | _M_ | the CxSAST database host          |
| `port`     | _`number`_ | _M_ | the CxSAST database port          |
| `username` | _`string`_ | _M_ | the CxSAST database user name     |
| `password` | _`string`_ | _M_ | the CxSAST database user password |

## [smtp] section

The `[smtp]` configuration section is responsible for configuring how the CxSAST Custom Reporting will communicate with the CxSAST database. The following key-value pairs are available within this section:

| Key        | type       | M/O | Description            |
| ---------- | ---------- | --- | ---------------------- |
| `host`     | _`string`_ | _M_ | the SMTP host          |
| `port`     | _`number`_ | _M_ | the SMTP port          |
| `username` | _`string`_ | _M_ | the SMTP user name     |
| `password` | _`string`_ | _M_ | the SMTP user password |
| `sender`   | _`string`_ | _M_ | the email sender       |

## Configuration example

Below you can find a complete `config.ini` file. For the purpose of this example, we are assuming that CxSAST is installed on `D:\Checkmarx` and CxSAST Custom Report installed on `D:\Checkmarx\Executables`:

```DOS
C:\>type D:\Checkmarx\Executables\cxsast_custom_reporting\config\config.ini
[database]
host=db_host
port=db_port
username=db_user
password=db_password

[smtp]
host=smtp_host
port=smtp_port
username=smtp_username
password=smtp_password
sender=smtp_sender
C:\>
```
