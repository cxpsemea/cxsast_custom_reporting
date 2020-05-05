# ScanSummary

The ScanSummary report type provides users a simple report with basic scan information.

## Supported arguments

The following arguments are supported by the ScanSummary report type during execution:

| Name               | Type   | M/O | Description                                                              |
| ------------------ | ------ | --- | ------------------------------------------------------------------------ |
| `reportType`       | string | `M` | The report type to be generated. Should be `ScanSummary`                 |
| `reportTemplate`   | string | `M` | The report template to be used. Default is `ScanSummary`                 |
| `reportAudience`   | list   | `M` | A comma delimited list of emails that should receive the report          |
| `projectXmlReport` | string | `M` | The path of the XMLReport that should be used for determining the scanId |

## Data structures

The ScanSummary exposes the following data structure to the HtmlRenderingService:

<table>
    <thead>
        <tr>
            <th colspan="5">IScanSummaryData</th>
        </tr>
        <tr>
            <td colspan="2">Element name</th>
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
            <td>The Checkmarx version used to</td>
        </tr>
        <tr>
            <td colspan="2"><code>projectId</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The scan project id</td>
        </tr>
        <tr>
            <td colspan="2"><code>projectName</code></td>
            <td><code>string</code></td>
            <td><code>M</code></td>
            <td>The scan project name</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanId</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The scan id</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanType</code></td>
            <td><code>enum</code></td>
            <td><code>M</code></td>
            <td>either <code>FullScan</code> or <code>Incremental</code></td>
        </tr>
        <tr>
            <td colspan="2"><code>scanRisk</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The calculated scan risk</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanLoc</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The number of scanned lines of code</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanLocFailed</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The number of scanned lines of code that failed</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanFiles</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The number of scanned files</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanPreset</code></td>
            <td><code>string</code></td>
            <td><code>M</code></td>
            <td>The preset used for scanning</td>
        </tr>
        <tr>
            <td colspan="2"><code>generatedAt</code></td>
            <td><code>string</code></td>
            <td><code>M</code></td>
            <td>The date and time of report generation</td>
        </tr>
        <tr>
            <td colspan="2"><code>year</code></td>
            <td><code>string</code></td>
            <td><code>M</code></td>
            <td>The current year (just to be displayed on the footer)</td>
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
            <td>A <code>IScanResultsBySeverity</code> object representing the total amount of results grouped by severity.</td>
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
            <td><code>total</code></td>
            <td><code>number</code></td>
            <td><code>M</code></td>
            <td>The total amount of results found during scan.</td>
        </tr>
        <tr>
            <td colspan="2"><code>scanResultStatus</code></td>
            <td><code>object</code></td>
            <td><code>M</code></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td><code>new</code></td>
            <td><code>object</code></td>
            <td><code>M</code></td>
            <td>A <code>IScanResultsBySeverity</code> object representing the total of new results found during scan grouped by severity.</td>
        </tr>
        <tr>
            <td></td>
            <td><code>fixed</code></td>
            <td><code>object</code></td>
            <td><code>M</code></td>
            <td>A <code>IScanResultsBySeverity</code> object representing the total of fixed results, since last scan, grouped by severity.</td>
        </tr>
        <tr>
            <td></td>
            <td><code>recurrent</code></td>
            <td><code>object</code></td>
            <td><code>M</code></td>
            <td>A <code>IScanResultsBySeverity</code> object representing the total of recurrent results, since last scan, grouped by severity.</td>
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

## Data structure example

Bellow you can find an example of a ScanSummary data structure object as an example:

```json
{
  "productVersion": "8.8.0.72 HF18",
  "projectId": 44,
  "projectName": "ReportTesting_PhpGoat_Original(Don't touch)",
  "scanId": 1000167,
  "scanType": "Full Scan",
  "scanRisk": 28,
  "scanLoc": 95376,
  "scanLocFailed": 252,
  "scanFiles": 127,
  "scanPreset": "Checkmarx Default",
  "scanTotals": {
    "bySeverity": { "high": 2, "medium": 8, "low": 39, "info": 0 },
    "byStatus": { "new": 0, "fixed": 0, "recurrent": 49 },
    "total": 49
  },
  "scanResultStatus": {
    "new": { "high": 0, "medium": 0, "low": 0, "info": 0 },
    "fixed": { "high": 0, "medium": 0, "low": 0, "info": 0 },
    "recurrent": { "high": 2, "medium": 8, "low": 39, "info": 0 },
    "total": { "high": 2, "medium": 8, "low": 39, "info": 0 }
  },
  "generatedAt": "Monday, May 4th, 2020, 6:29:10 PM",
  "year": "2020"
}
```
