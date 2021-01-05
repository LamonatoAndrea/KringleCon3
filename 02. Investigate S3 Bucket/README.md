# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 2. Investigate S3 Bucket
## 2.0. Description
When you unwrap the over-wrapped file, what text string is inside the package? Talk to Shinny Upatree in front of the castle for hints on this challenge.
## 2.1. Side Challenge - Kringle Kiosk
The objective was to escape a menu and launch /bin/bash. The 4th option of the menu suggested that special characters may lead to errors, so I tried a command injection with ;/bin/bash and it worked.  
```bash
```
## 2.2. Hints
> **Leaky AWS S3 Buckets** - Shinny Upatree: *“It seems like there's a new story every week about data exposed through unprotected Amazon S3 buckets.”*  
> **Finding S3 Buckets** - Shinny Upatree: *“Robin Wood wrote up a guide about finding these open S3 buckets.”*  
> **Santa's Wrapper3000** - Shinny Upatree: *“Santa's Wrapper3000 is pretty buggy. It uses several compression tools, binary to ASCII conversion, and other tools to wrap packages.”*  
> **Find Santa's Package** - Shinny Upatree: *“Find Santa's package file from the cloud storage provider. Check Josh Wright's talk for more tips!”*  
> **Bucket_finder.rb** - Shinny Upatree: *“He even wrote a tool to search for unprotected buckets!”*  

## 2.3. Solution
Reminding also the name of the tool itself (Wrapper3000), out of some thoughts and luckiness I added some words to the wordlist:
```
  package
  wrapper3000
  kringlecon
  santa-wrapper-3000
```
I ran `bucket_finder.rb` with the updated and the `-d` option, ending up retrieving a base 64 encoded file which was actually a zip file. Multiple extractions, some string operations, an `xxd` and other extractions leaded to the `package.txt` file with content:
`North Pole: The Frostiest Place on Earth`
The full output of what I ran in the terminal is available at this link.
## 2.4. Interesting facts
There is an entire challenge dedicated to AWS vulnerabilities, which includes S3 buckets issues. Kudos to http://flaws.cloud/!
# 3. Point-of-Sale Password Recovery
# 4. Operate the Santavator
# 5. Open HID Lock
# 6. Splunk Challenge
# 7. Solve the Sleigh's CAN-D-BUS Problem
# 8. Broken Tag Generator
# 9. ARP Shenanigans
# 10. Defeat Fingerprint Sensor
# 11a. Naughty/Nice List with Blockchain Investigation Part 1
# 11b. Naughty/Nice List with Blockchain Investigation Part 2
---
# [0. thedead@asian:~$ whoami](../README.md)
# ?. 33.6 Kbps
# 1. Uncover Santa's Gift List