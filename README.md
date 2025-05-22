# EDNS Secondary Zones, update Master IPs
PUT Secondary Zone Master Update By Zone List Items.

The Script uses NodeJS, you can download it at: https://nodejs.org/en/download

The script uses a .txt file as an input, the file needs to have all the list of zones you want to update and their current and any new zone master IP, listed in the following way:

myzone.com,SECONDARY,1.1.1.1|2.2.2.2|3.3.3.3

If you want to add more IPs add them separated by a pipe:

myzone.com,SECONDARY,1.1.1.1|2.2.2.2|3.3.3.3|4.4.4.4


Keep in mind that this script will overwrite the configuration, so if you need to keep the existing IPs and adding an additional IP just add the existing IPs and the new IP at the end of the line:

myzone.com,SECONDARY,1.1.1.1|2.2.2.2|3.3.3.3|4.4.4.4|5.5.5.5

The script updates and pushes the change live by activating the zone immediately. So please proceed with caution.

You will find the .js script and the .txt file in this github directory, update your edgerc location and account SW accordingly. 


Note: for Akamai customers, there is no need of adding the Account Swithch-Key in the request path, since you may have only access to your Account. So you can remove the following section of the path: "?accountSwitchKey=${accountSwitchKey}"

The path line will look like this: 

Akamai employees:
    `/config-dns/v2/zones/${zonename.trim()}?accountSwitchKey=${accountSwitchKey}`,

Akamai Customers:
    `/config-dns/v2/zones/${zonename.trim()}`,

