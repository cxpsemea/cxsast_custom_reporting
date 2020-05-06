# CxSAST Custom Reporting

A tool to allow CxSAST admins to send custom reports to a given audience and/or store pdf reports. The way CxSAST Custom Reporting is implemented allows admins to provide an ad-hoc report for a given scan, or even automate the generation by executing the application on a post-scan action.

## Links

- [Documentation](https://cxpsemea.github.io/cxsast_custom_reporting)
- [Installation](https://cxpsemea.github.io/cxsast_custom_reporting/#/pages/INSTALLATION)
- [Configuration](https://cxpsemea.github.io/cxsast_custom_reporting/#/pages/CONFIGURATION)
- [Utilization](https://cxpsemea.github.io/cxsast_custom_reporting/#/pages/UTILIZATION)
- [Contributing](https://cxpsemea.github.io/cxsast_custom_reporting/#/pages/CONTRIBUTING)

## Features

- Generates a **summary report** giving a overview of a selected project
- Generates a **consolidated** report with the a aggregation of data of the last scan of multiple projects
- Send report emails to a given mailing list
- Generates reports as a pdf file
- Can be executed as a post-scan action

## Development

1. Clone the git repo and run

   ```shell
   npm install
   ```

2. Go to the releases page and dowload the latest version

3. Extract the config folder a place it on your project root

4. Rename the `config.example.ini` file to `config.ini` and edit it with your settings

5. You are ready to run the folowing commands:

```shell
npm run dev:summary
```

If you want to test a `Scan Summary` scan type.

Note: you will have to have to a valid (SAST) xml file on the root named `report.xml`. This file wil be used to select the project and the scan id.

or

```shell
npm run dev:consolidated
```

In case you want to generate and develop `Consolidated` report type.

Note: in this case the script will look for all the projects which their names starts with `ReportTesting`. You can change this of course, see the `scripts` section on the `package.json` file.

See the [Contributing](https://cxpsemea.github.io/cxsast_custom_reporting/#/pages/CONTRIBUTING) page for more development/code submission details
