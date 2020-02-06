# Instalation

## Pre-conditions

The CxSAST Custom Reporting uses a database connection and a mail server to extract and send information respectively. Base on this, ensure that:

1. proper credentials of read-only database user with access to the CxSAST databases;
2. proper credentials of a user on the desired mail server
3. latest release of the CxSAST Custom Reporting that can be downloaded from the [**project's releases page**](https://github.com/cxpsemea/cxsast_custom_reporting/releases)

## Installation steps

The installation itself can be done in any folder, but, the recommendation is to use the CxSAST executables folder. In general, the executables folder is located at: `<cxsast_install>/Executables`. 

Follow the instructions below to perform the installation:

1. Download latest release from [**project's releases page**](https://github.com/cxpsemea/cxsast_custom_reporting/releases);
2. Copy downloaded file to `<cxsast_install>/Executables`.;
3. Extract the downloaded zip file;
4. Rename the the file`<cxsast_install>/Executables/cxsast_custom_reporting/config/config.example.ini` to `config.ini`
5. Adjust your configuration as required to your environment. More information about configuring the application can be found on the [**configuration**](/pages/CONFIGURATION.md) section of this documentation

Below you can find the output of the `tree` command executed against a temporary environment after following the steps listed above. For the purpose of this example, we are assuming that CxSAST is installed on `D:\Checkmarx`.

```dos
C:\>tree /f D:\Checkmarx\Executables
...
D:\CHECKMARX\EXECUTABLES
│
└───cxsast_custom_reporting
    │   CHANGELOG.txt
    │   cxsast_custom_reporting_v1.0.0-next.3_win_x64.exe
    │   LICENSE.txt
    │   README.txt
    │
    └───config
        │   config.ini
        │
        └───templates
                ScanSummary.html
...
C:\>
```
