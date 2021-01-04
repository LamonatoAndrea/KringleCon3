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
thedead@dellian:~/Desktop/repos/KringleCon3/02. Investigate S3 Bucket/wrapper3000$ cat package.txt.Z.xz.xxd
00000000: fd37 7a58 5a00 0004 e6d6 b446 0200 2101  .7zXZ......F..!.
00000010: 1600 0000 742f e5a3 0100 2c1f 9d90 4ede  ....t/....,...N.
00000020: c8a1 8306 0494 376c cae8 0041 054d 1910  ......7l...A.M..
00000030: 46e4 bc99 4327 4d19 8a06 d984 19f3 f08d  F...C'M.........
00000040: 1b10 45c2 0c44 a300 0000 0000 c929 dad6  ..E..D.......)..
00000050: 64ef da24 0001 452d 1e52 57e8 1fb6 f37d  d..$..E-.RW....}
00000060: 0100 0000 0004 595a                      ......YZ
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