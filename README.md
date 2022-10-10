# ICSolutions CSN Parser

! This script does not directly communicate with the Enforcer, meaning you'll still need Enforcer credentials to use the "Search CSN" feature. !
<br><br>
link to tool: https://wbojczuk.github.io/ICSolutionsCSNParser
<br>
<h3>What it does</h3>
This tool takes input like "82931890_294836_12-22-2018_10-57-13_1-000-000-0000_3109" which is the value found in the call_search.csv table. It can output the csn, the csn + filename, or search the database for the calls/visitation records. <br>

<h3>Usage</h3>
<h5>CSN Extraction</h5>
Just paste as many filenames as desired into the input field. Once pasted, click either "Output CSN" or "Output FileName + CSN". If the script was successful at extracting the CSN(s), the result will appear in the output field.<br>

<h5>Searching a CSN</h5>
<ol>
  <li>Just paste as many filenames as desired into the input field.</li>
  <li>Ensure that the "Facility" field is filled out, if not fill it out with the facility's ID and click submit (EG: Bartow County is BARGA).</li>
  <li>If you would like the script to automatically detect and apply the correct date range, leave "Auto Detect Best Date" selected, else uncheck and select the dates manually</li>
  <li>Click "Search CSN" and the script will open the Enforcer in a new window and automatically search the call/visit records</li>
</ol>
<br>
<h3>How it works</h3>
<h5>Pattern Detection</h5>
CSNs are extracted via Regular Expressions that search for the patters that match a typical CSN. Regular Expressions are also used to extract the dates from the filename.<br>

<h5>Call VS Visitations</h5>
The script works with both call and visitation filenames. You should only search one type of record at a time. Calls and Visitation records are searched for differently in the Enforcer. To combat this, the script detects whether the first record is a call or visitation and executes accordingly.<br>

<h5>Auto Detect Best Date</h5>
The script pushes all dates that were extracted with RegEx to an array. The smallest date and the largest date are then extracted from the array, are converted to the correct format and used in the url construction.<br>

<h5>Facility ID</h5>
The Facility id is stored in the machine's local storage, the ID is used to direct your browser to the correct Enforcer when you search a CSN. When the script loads, it checks whether or not you have set a Facility ID before, if not, you are prompted by the input to do so, if you did set the Facility ID in the past, that value is displayed in the input field.<br>

<h5>But how does it work!??</h5>
This tool does not actually touch the Enforcer at all, all processing is local. The enforcer uses a GET method to send data through the url for search queries, so this tool reconstructs the url with the inputted Facility ID, and the right search parameters, then executes the url in a new tab.
