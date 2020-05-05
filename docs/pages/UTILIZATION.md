# Utilization

In order to use the CxSAST Custom Report you just need to run the executable `cxsast_custom_reporting_v{latestVersion}_win_x64.exe` (after setting your configurations `config.ini` file).

Please notice that there are some arguments that need to be passed at this phase and most of them are required. (see bellow table)

## Arguments

The list of all arguments that are available be passed when executing the the `.exe` file.

| Key                  | M/O | Default                         | Description                                                                                                                                                                             |
| -------------------- | --- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reportType`         | _O_ | `scanSummary`                   | the type of report (`scanSummary` or `consolidated`)                                                                                                                                    |
| `reportTemplate`     | _O_ | `ScanSummary` or `Consolidated` | the name of the html file inside the `config/templates` folder that will be used to send email or generate the pdf report `ex. otherConsolidated`                                       |
| `reportAudience`     | _O_ |                                 | a comma delimited list of emails that should receive the report                                                                                                                         |
| `projectXmlReport`   | _M_ |                                 | the path (relative to the script root) where the xml file generated on CxSAST is located. Only required if `reportType` is `scanSummary`                                                |
| `projectNamePattern` | _M_ |                                 | a sql 'like' wildcard the will be used to select projects when `reportType` is `consolidated` . See the [Consolidated report type page](./REPORT_TYPES_CONSOLIDATED.md) to more details |
| `projectName`        | _M_ |                                 | the name that will be displayed on the report title                                                                                                                                     |

So the full command will look like this:

```powershell
.\cxsast_custom_reporting_v{latestVersion}_win_x64.exe --reportType consolidated --projectName "Consolidated Test" --projectNamePattern ReportTesting% --reportAudience "user01@test.com,user02@test.com"
```

See [Report Types](./REPORT_TYPES) page for more details
