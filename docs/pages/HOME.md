# CxSAST Custom Reporting

A tool to allow CxSAST admins to send custom reports to a given audience and/or store pdf reports.

## Motivation

Development team leaders as also management, require more often, to receive concise feedback over project security health. In general, this information is analyzed after a scan is finished on CxSAST by looking at indicators such as the number of total results, the project risk level, etc.

Out-of-the-box CxSAST reports all this information, but, the provided report is lengthy and may disperse the reader's attention.

Also, currently there is no way to get a report with consolidated data of more than one project, that can be very useful when a project is composed by multiple sub-projects for instance a project composed by multiple microservices that are being scanned independently.

## The proposed solution

The CxSAST Custom Reporting comes to help admins in providing a concise and clear status of a given project on a regular basis.

The way CxSAST Custom Reporting is implemented allows admins to provide an ad-hoc report for a given scan, or even automate the generation by executing the application on a post-scan action.

Over this documentation, CxSAST Custom Reporting users can find all relevant information to install, configure, use the application, nevertheless you can contact your Checkmarx Team in case you need deeper understanding or support on the implementation.

## Features

This script gives the possibility to:

- Generate a **summary report** giving a overview of a specific project
- Generate a **consolidated** report with the a aggregation of data of the last scan of multiple projects. This can be very useful when a project is composed by multiple sub-projects/microservices.
- Send report emails to a given mailing list
- Generate reports as a pdf file
- Generate reports on a post-scan action

## Using this documentation

Users can navigate through the complete documentation by navigating over the sections present on the left side.

## Releases

All releases are automated and generate a `zip` package that can be downloaded with all required artifacts. You can grab the latest releases on the [**project's releases page**](https://github.com/cxpsemea/cxsast_custom_reporting/releases)

## Reporting issues or requesting features

Users can report issues, or even request new features, by fulfilling the required information on the [**project's issues page**](https://github.com/cxpsemea/cxsast_custom_reporting/issues/new/choose)
