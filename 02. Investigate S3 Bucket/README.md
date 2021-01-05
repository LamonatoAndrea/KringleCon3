# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 2. Investigate S3 Bucket
## 2.0. Description
When you unwrap the over-wrapped file, what text string is inside the package? Talk to Shinny Upatree in front of the castle for hints on this challenge.
## 2.1. Side Challenge - Kringle Kiosk
The objective was to escape a menu and launch `/bin/bash`. The 4th option of the menu suggested that special characters may lead to errors, so I tried a command injection with `;/bin/bash` and it worked. For the full output of the shell session please see the file [Kringle Kiosk.sh](Kringle%20Kiosk.sh)
```bash
Welcome to our castle, we're so glad to have you with us!
Come and browse the kiosk; though our app's a bit suspicious.
Poke around, try running bash, please try to come discover,
Need our devs who made our app pull/patch to help recover?
Escape the menu by launching /bin/bash
Press enter to continue...

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Welcome to the North Pole!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Map
2. Code of Conduct and Terms of Use
3. Directory
4. Print Name Badge
5. Exit

Enter your name (Please avoid special characters, they cause some weird errors)...;/bin/bash
 _______________________
< Santa's Little Helper >
 -----------------------
  \
   \   \_\_    _/_/
    \      \__/
           (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||

   ___                                                      _    
  / __|   _  _     __      __      ___     ___     ___     | |   
  \__ \  | +| |   / _|    / _|    / -_)   (_-<    (_-<     |_|   
  |___/   \_,_|   \__|_   \__|_   \___|   /__/_   /__/_   _(_)_  
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_| """ | 
"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' 
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

Below the output of the shell session:
```bash
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket$ cat wordlist.txt 
kringlecastle
wrapper
santa
package
wrapper3000
kringlecon
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket$ ../../bucket_finder/bucket_finder.rb wordlist.txt -d -l logs.txt
Bucket found but access denied: kringlecastle
Bucket found but access denied: wrapper
Bucket santa redirects to: santa.s3.amazonaws.com
  Bucket found but access denied: santa
Bucket found but access denied: package
Bucket Found: wrapper3000 ( http://s3.amazonaws.com/wrapper3000 )
  <Downloaded> http://s3.amazonaws.com/wrapper3000/package
Bucket does not exist: kringlecon
Bucket does not exist: santa-wrapper-3000
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket$ ls
'Kringle Kiosk.sh'   logs.txt   wordlist.txt   wrapper3000
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket$ cd wrapper3000/
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ ls
package
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ cat package 
UEsDBAoAAAAAAIAwhFEbRT8anwEAAJ8BAAAcABwAcGFja2FnZS50eHQuWi54ei54eGQudGFyLmJ6MlVUCQADoBfKX6AXyl91eAsAAQT2AQAABBQAAABCWmg5MUFZJlNZ2ktivwABHv+Q3hASgGSn//AvBxDwf/xe0gQAAAgwAVmkYRTKe1PVM9U0ekMg2poAAAGgPUPUGqehhCMSgaBoAD1NNAAAAyEmJpR5QGg0bSPU/VA0eo9IaHqBkxw2YZK2NUASOegDIzwMXMHBCFACgIEvQ2Jrg8V50tDjh61Pt3Q8CmgpFFunc1Ipui+SqsYB04M/gWKKc0Vs2DXkzeJmiktINqjo3JjKAA4dLgLtPN15oADLe80tnfLGXhIWaJMiEeSX992uxodRJ6EAzIFzqSbWtnNqCTEDML9AK7HHSzyyBYKwCFBVJh17T636a6YgyjX0eE0IsCbjcBkRPgkKz6q0okb1sWicMaky2Mgsqw2nUm5ayPHUeIktnBIvkiUWxYEiRs5nFOM8MTk8SitV7lcxOKst2QedSxZ851ceDQexsLsJ3C89Z/gQ6Xn6KBKqFsKyTkaqO+1FgmImtHKoJkMctd2B9JkcwvMr+hWIEcIQjAZGhSKYNPxHJFqJ3t32Vjgn/OGdQJiIHv4u5IpwoSG0lsV+UEsBAh4DCgAAAAAAgDCEURtFPxqfAQAAnwEAABwAGAAAAAAAAAAAAKSBAAAAAHBhY2thZ2UudHh0LloueHoueHhkLnRhci5iejJVVAUAA6AXyl91eAsAAQT2AQAABBQAAABQSwUGAAAAAAEAAQBiAAAA9QEAAAAA
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ base64 -d package > package.b64d
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ file package.b64d 
package.b64d: Zip archive data, at least v1.0 to extract
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ 7z e package.b64d

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz (406E3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 621 bytes (1 KiB)

Extracting archive: package.b64d
--
Path = package.b64d
Type = zip
Physical Size = 621

Everything is Ok

Size:       415
Compressed: 621
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ file package.b64d 
package.b64d: Zip archive data, at least v1.0 to extract
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ ls
package  package.b64d  package.txt.Z.xz.xxd.tar.bz2
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ 7z e package.txt.Z.xz.xxd.tar.bz2 

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz (406E3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 415 bytes (1 KiB)

Extracting archive: package.txt.Z.xz.xxd.tar.bz2
--
Path = package.txt.Z.xz.xxd.tar.bz2
Type = bzip2

Everything is Ok               

Size:       2048
Compressed: 415
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ 7z e package.txt.Z.xz.xxd.tar

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz (406E3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 2048 bytes (2 KiB)

Extracting archive: package.txt.Z.xz.xxd.tar
--
Path = package.txt.Z.xz.xxd.tar
Type = tar
Physical Size = 2048
Headers Size = 1536
Code Page = UTF-8

Everything is Ok

Size:       468
Compressed: 2048
```
The content of `package.txt.Z.xz.xxd` is:
```
00000000: fd37 7a58 5a00 0004 e6d6 b446 0200 2101  .7zXZ......F..!.
00000010: 1600 0000 742f e5a3 0100 2c1f 9d90 4ede  ....t/....,...N.
00000020: c8a1 8306 0494 376c cae8 0041 054d 1910  ......7l...A.M..
00000030: 46e4 bc99 4327 4d19 8a06 d984 19f3 f08d  F...C'M.........
00000040: 1b10 45c2 0c44 a300 0000 0000 c929 dad6  ..E..D.......)..
00000050: 64ef da24 0001 452d 1e52 57e8 1fb6 f37d  d..$..E-.RW....}
00000060: 0100 0000 0004 595a                      ......YZ
```
So to proceed:
```bash
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ cat package.txt.Z.xz.xxd | cut -d " " -f2,3,4,5,6,7,8,9,10 --output-delimiter="" | tr -d '\n' > package.txt.Z.xz_hex
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ xxd -r -p package.txt.Z.xz_hex > package.txt.Z.xz
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ file package.txt.Z.xz
package.txt.Z.xz: XZ compressed data
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ 7z e package.txt.Z.xz

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz (406E3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 104 bytes (1 KiB)

Extracting archive: package.txt.Z.xz
--
Path = package.txt.Z.xz
Type = xz
Physical Size = 104
Method = LZMA2:23 CRC64
Streams = 1
Blocks = 1

Everything is Ok

Size:       45
Compressed: 104
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ 7z e package.txt.Z

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,4 CPUs Intel(R) Core(TM) i5-6300U CPU @ 2.40GHz (406E3),ASM,AES-NI)

Scanning the drive for archives:
1 file, 45 bytes (1 KiB)

Extracting archive: package.txt.Z
--
Path = package.txt.Z
Type = Z

Everything is Ok

Size:       41
Compressed: 45
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ cat package.txt
North Pole: The Frostiest Place on Earth
```
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
# 0. [thedead@asian:~$ whoami](../README.md)
# ?. 33.6 Kbps
# 1. Uncover Santa's Gift List