Firefly Personal Finance
======
**Firefly Personal Finance** is a mobile app for the Firefly-iii personal finance web application. It's currently under heavy development, striving for feature parity with the current FireFly-iii API.

It's built using the Ionic3 Framework and is published on both Google Play.

#### Screenshot
![Overview Page](https://github.com/mconway/firefly-app/ "Android overview")
![Create Transaction Page](https://github.com/mconway/firefly-app/ "Android transaction")
![Bills Page](https://github.com/mconway/firefly-app/ "Android bills")


#### App Stores
<!-- edit this image location -->
[![Get it on Google Play](https://raw.github.com/repat/README-template/master/googleplay.png)](https://play.google.com/apps/testing/com.zerobyte.firefly)

## Tests
#### Works on
* Windows 10
* Nexus 6P (Android 8.1)

## Features
#### Current Features/Known Issues
* You can use the app offline to view account balances and transactions. Can't add a transaction offline yet.
* Bills don't have a currency code set, so they all show as USD. 
* Account Summaries are also showing the $ symbol. This should be fixed when the next release of Firefly is out, as James added some new endpoints for me.
* You can add transactions for Withdrawal, Transfer or Deposit.
* You can tap on any list item for more information. (basically just more of a data page at this point)
* OAuth is enabled.
* It seems that Firefly has some sort of caching mechnaism, so some transactions added through the API may not show up in the web/mobile app immediately.

#### Planned Features - Not an exhaustive list
* Add a transaction even without a network connection
* Better/more error and status messages
* See transactions by account
* Fix the odd currency issues.
* Add/Edit/Delete Accounts
* Add/Edit/Delete Bills
* Update/Delete Transactions
* Set Category/Budget when creating a transaction
* Set Revenue/Expense account when creating a transaction
* View bill status (Past-due, paid, etc)
* Use average bill amount instead of Max.
* Split account summary totals up by currency type.


## Contributors
### Artwork
* Piggybank Images credit of [@blankerwahnsinn](https://unsplash.com/@blankerwahnsinn)

### Contributors on GitHub
* [Contributors](https://github.com/username/appname/graphs/contributors)

### Third party libraries
* see [LIBRARIES](https://github.com/username/appname/blob/master/LIBRARIES.md) files

## Permissions
* Network Access
* Local Storage Access

## License 
* see [LICENSE](https://github.com/username/appname/blob/master/LICENSE.md) file

## Version 
* Version X.Y

## How-to use this code
* coming soon

## Contact
#### Developer/Company
* Homepage: https://www.zerobytesolutions.com
* e-mail: mconway@zerobytesolutions.com

[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=username&url=https://github.com/username/appname&title=appname&language=&tags=github&category=software) 