# Consolidated

The Consolidated report type provides users a report consolidating multiple project's last scan data.

## Supported arguments

The following arguments are supported by the Consolidated report type during execution:

| Name                 | Type   | M/O | Description                                                                                                                                 |
| -------------------- | ------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `reportType`         | string | `M` | The report type to be generated. Should be `Consolidated`                                                                                   |
| `reportTemplate`     | string | `M` | The report template to be used. Default is `ScanSummary`                                                                                    |
| `reportAudience`     | list   | `M` | A comma delimited list of emails that should receive the report                                                                             |
| `projectNamePattern` | string | `M` | A sql 'like' wildcard the will be used to select projects based on their names. Please see the [wildcard table](#projectNamePattern) bellow |

#### projectNamePattern

| Wildcard | Description                                                                  |
| :------- | :--------------------------------------------------------------------------- |
| `'%a'`   | Finds any values that end with "a"                                           |
| `'a%'`   | Finds any values that start with "a"                                         |
| `'%or%'` | Finds any values that have "or" in any position                              |
| `'_r%'`  | Finds any values that have "r" in the second position                        |
| `'a_%'`  | Finds any values that start with "a" and are at least 2 characters in length |
| `'a__%'` | Finds any values that start with "a" and are at least 3 characters in length |
| `'a%o'`  | Finds any values that start with "a" and ends with "o"                       |

## Data structures

The ScanSummary exposes the following data structure to the HtmlRenderingService:

<table>
  <thead>
    <tr>
      <th colspan="5">IScanSummaryData</th>
    </tr>
    <tr>
      <th colspan="2">Element name</th>
      <th>Type</th>
      <th>M/O</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2"><code>productVersion</code></td>
      <td><code>string</code></td>
      <td><code>M</code></td>
      <td>The Checkmarx version used</td>
    </tr>
    <tr>
      <td colspan="2"><code>appName</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The name of the app that will be displayed on the report</td>
    </tr>
    <tr>
      <td colspan="2"><code>generatedAt</code></td>
      <td><code>string</code></td>
      <td><code>M</code></td>
      <td>The date and time when the report was generated</td>
    </tr>
    <tr>
      <td colspan="2"><code>year</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The current year (is being displayed on the footer)</td>
    </tr>
    <tr>
      <td colspan="2"><code>combinedResults</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td><code>bySeverity</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>
        A <code>IScanResultsBySeverity</code> object representing the total amount of results grouped by severity.
      </td>
    </tr>
    <tr>
      <td></td>
      <td><code>byState</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>A <code>IScanResultsByState</code> object representing the total amount of results grouped by state.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>byStatus</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>A <code>IScanResultsByStatus</code> object representing the total amount of results grouped by status.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>scanRisk</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The calculated scan risk</td>
    </tr>
    <tr>
      <td></td>
      <td><code>scanLoc</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The number of scanned lines of code</td>
    </tr>
    <tr>
      <td></td>
      <td><code>scanFiles</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The number of scanned files</td>
    </tr>
    <tr>
      <td></td>
      <td><code>scanProjects</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The number of scanned projects</td>
    </tr>
    <tr>
      <td></td>
      <td><code>vulnerabilities</code></td>
      <td><code>array</code></td>
      <td><code>M</code></td>
      <td>
        An array of <code>IVulnerability</code> objects representing all the vulnerability types sorted by severity and
        occurrences number.
      </td>
    </tr>
    <tr>
      <td></td>
      <td><code>total</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The total number of vulnerabilities found</td>
    </tr>
    <tr>
      <td colspan="2"><code>scans</code></td>
      <td><code>array</code></td>
      <td><code>M</code></td>
      <td>An array of <code>IScan</code> objects representing all the scans that were fetched.</td>
    </tr>
  </tbody>
</table>

### IScanResultsBySeverity

<table>
    <thead>
        <tr>
            <th colspan="6">IScanResultsBySeverity</th>
        </tr>
        <tr>
            <th>Element name</th>
            <th>Type</th>
            <th>M/O</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>high</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of vulnerabilities classified as high risk</td>
        </tr>
        <tr>
            <td><code>medium</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of vulnerabilities classified as medium risk</td>
        </tr>
        <tr>
            <td><code>low</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of vulnerabilities classified as low risk</td>
        </tr>
        <tr>
            <td><code>info</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of findings classified as Information</td>
        </tr>
    </tbody>
</table>

### IScanResultsByStatus

The following interface represents scan results aggregated by status.

<table>
    <thead>
        <tr>
            <th colspan="6">IScanResultsByStatus</th>
        </tr>
        <tr>
            <th>Element name</th>
            <th>Type</th>
            <th>M/O</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>new</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount new results</td>
        </tr>
        <tr>
            <td><code>fixed</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount fixed results</td>
        </tr>
        <tr>
            <td><code>recurrent</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount recurrent results</td>
        </tr>
    </tbody>
</table>

### IScanResultsByState

The following interface represents scan results aggregated by state.

<table>
    <thead>
        <tr>
            <th colspan="6">IScanResultsByState</th>
        </tr>
        <tr>
            <th>Element name</th>
            <th>Type</th>
            <th>M/O</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>toVerify</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of toVerify marked results</td>
        </tr>
        <tr>
            <td><code>urgent</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of urgent marked results</td>
        </tr>
        <tr>
            <td><code>confirmed</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of confirmed marked results</td>
        </tr>
        <tr>
            <td><code>notExploitable</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of notExploitable marked results</td>
        </tr>
        <tr>
            <td><code>proposedNotExploitable</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The amount of proposedNotExploitable marked results</td>
        </tr>
    </tbody>
</table>

### IScan

The following interface represents a scan.

<table>
  <thead>
    <tr>
      <th colspan="5">IScan</th>
    </tr>
    <tr>
      <th colspan="2">Element name</th>
      <th>Type</th>
      <th>M/O</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2"><code>id</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The scan id</td>
    </tr>
    <tr>
      <td colspan="2"><code>openedAt</code></td>
      <td><code>string</code></td>
      <td><code>M</code></td>
      <td>The date and time of the scan</td>
    </tr>
      <tr>
      <td colspan="2"><code>projectName</code></td>
      <td><code>string</code></td>
      <td><code>M</code></td>
      <td>The name of the project</td>
    </tr>
    <tr>
      <td colspan="2"><code>scanTotals</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td><code>bySeverity</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>
        A <code>IScanResultsBySeverity</code> object representing the total amount of results grouped by severity.
      </td>
    </tr>
    <tr>
      <td></td>
      <td><code>byState</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>A <code>IScanResultsByState</code> object representing the total amount of results grouped by state.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>byStatus</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>A <code>IScanResultsByStatus</code> object representing the total amount of results grouped by status.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>stateBySeverity</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>A <code>IScanResultsBySeverity</code> object representing the vulnerabilities state organized by severity.</td>
    </tr>
    <tr>
      <td></td>
      <td><code>total</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The total number of vulnerabilities.</td>
    </tr>
     <tr>
      <td></td>
      <td><code>totalWithNotExploitable</code></td>
      <td><code>number</code></td>
      <td><code>M</code></td>
      <td>The total number of vulnerabilities excluding the notExploitable ones.</td>
    </tr>
     <tr>
      <td></td>
      <td><code>severityTotalsWithNotExploitable</code></td>
      <td><code>object</code></td>
      <td><code>M</code></td>
      <td>
        A <code>IScanResultsBySeverity</code> object representing the vulnerabilities total by severity including the notExploitable ones.
      </td>
    </tr>
  </tbody>
</table>

## Data structure example

Bellow you can find an example of a Consolidated data structure object:

```json
{
  "appName": "Test App",
  "generatedAt": "Monday, May 4th, 2020, 7:08:11 PM",
  "year": "2020",
  "combinedResults": {
    "bySeverity": {
      "high": 22,
      "medium": 25,
      "low": 50,
      "info": 0
    },
    "byStatus": {
      "new": 97,
      "fixed": 0,
      "recurrent": 0
    },
    "byState": {
      "toVerify": 96,
      "urgent": 0,
      "confirmed": 0,
      "notExploitable": 28,
      "proposedNotExploitable": 1
    },
    "scanRisk": 90,
    "scanLoc": 123274,
    "scanFiles": 210,
    "scanProjects": 3,
    "vulnerabilities": [
      {
        "occurrences": 10,
        "severity": 3,
        "severityLabel": "high",
        "name": "Reflected XSS"
      },
      {
        "occurrences": 5,
        "severity": 3,
        "severityLabel": "high",
        "name": "Security Misconfiguration"
      },
      {
        "occurrences": 3,
        "severity": 3,
        "severityLabel": "high",
        "name": "Code Injection"
      },
      {
        "occurrences": 2,
        "severity": 3,
        "severityLabel": "high",
        "name": "Client DOM Code Injection"
      }
    ],
    "total": 97
  },
  "scans": [
    {
      "id": 1000168,
      "openedAt": "17/04/20, 10:47:55 PM",
      "scanTotals": {
        "bySeverity": {
          "high": 0,
          "medium": 0,
          "low": 0,
          "info": 0
        },
        "byStatus": {
          "new": 0,
          "fixed": 0,
          "recurrent": 0
        },
        "byState": {
          "toVerify": 0,
          "urgent": 0,
          "confirmed": 0,
          "notExploitable": 0,
          "proposedNotExploitable": 0
        },
        "stateBySeverity": {
          "high": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "medium": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "low": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "info": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          }
        },
        "total": 0,
        "totalWithNotExploitable": 0,
        "severityTotalsWithNotExploitable": {
          "high": 0,
          "medium": 0,
          "low": 0,
          "info": 0
        }
      },
      "projectName": "ReportTesting_EmptyResults"
    },
    {
      "id": 1000167,
      "openedAt": "17/04/20, 2:36:38 PM",
      "scanTotals": {
        "bySeverity": {
          "high": 2,
          "medium": 8,
          "low": 39,
          "info": 0
        },
        "byStatus": {
          "new": 49,
          "fixed": 0,
          "recurrent": 0
        },
        "byState": {
          "toVerify": 49,
          "urgent": 0,
          "confirmed": 0,
          "notExploitable": 0,
          "proposedNotExploitable": 0
        },
        "stateBySeverity": {
          "high": {
            "toVerify": 2,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "medium": {
            "toVerify": 8,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "low": {
            "toVerify": 39,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "info": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          }
        },
        "total": 49,
        "totalWithNotExploitable": 49,
        "severityTotalsWithNotExploitable": {
          "high": 2,
          "medium": 8,
          "low": 39,
          "info": 0
        }
      },
      "projectName": "ReportTesting_PhpGoat_Original"
    },
    {
      "id": 1000164,
      "openedAt": "17/04/20, 11:36:42 AM",
      "scanTotals": {
        "bySeverity": {
          "high": 20,
          "medium": 17,
          "low": 11,
          "info": 0
        },
        "byStatus": {
          "new": 48,
          "fixed": 0,
          "recurrent": 0
        },
        "byState": {
          "toVerify": 47,
          "urgent": 0,
          "confirmed": 0,
          "notExploitable": 28,
          "proposedNotExploitable": 1
        },
        "stateBySeverity": {
          "high": {
            "toVerify": 20,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "medium": {
            "toVerify": 17,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          },
          "low": {
            "toVerify": 10,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 28,
            "proposedNotExploitable": 1
          },
          "info": {
            "toVerify": 0,
            "urgent": 0,
            "confirmed": 0,
            "notExploitable": 0,
            "proposedNotExploitable": 0
          }
        },
        "total": 48,
        "totalWithNotExploitable": 76,
        "severityTotalsWithNotExploitable": {
          "high": 20,
          "medium": 17,
          "low": 39,
          "info": 0
        }
      },
      "projectName": "ReportTesting_NodeGoat_Original"
    }
  ]
}
```
