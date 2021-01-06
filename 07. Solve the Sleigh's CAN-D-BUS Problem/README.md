# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 7. Solve the Sleigh's CAN-D-BUS Problem
## 7.0. Description
Jack Frost is somehow inserting malicious messages onto the sleigh's CAN-D bus. We need you to exclude the malicious messages and no others to fix the sleigh. Visit the NetWars room on the roof and talk to Wunorse Openslae for hints.
## 7.1. Side Challenge - CAN-Bus Investigation
I actually relied on using the Sleigh CAN-D-BUS to understand which were the LOCK and UNLOCK signals, the full mapping I made can be found in [Chapter 7.4](#74-signal-mapping).
```bash
elf@5247e7d263e9:~$ grep "19B#00000F000000" candump.log 
(1608926671.122520) vcan0 19B#00000F000000
elf@5247e7d263e9:~$ ./runtoanswer 
There are two LOCK codes and one UNLOCK code in the log.  What is the decimal portion of the UNLOCK timestamp?
(e.g., if the timestamp of the UNLOCK were 1608926672.391456, you would enter 391456.
> 122520
Your answer: 122520

Checking....
Your answer is correct!
```
## 7.2. Hints
> **CAN ID Codes** - Wunorse Openslae: *“Try filtering out one CAN-ID at a time and create a table of what each might pertain to. What's up with the brakes and doors?”*

## 7.3. Solution
I started excluding all codes that looked safe and mapping them to their functions whìch can be found in [Chapter 7.4](#74-signal-mapping). When I removed enough background noise to find out unsafe messages I filtered out these two:

| ID    | COMPARISON OPERATOR | MESSAGE CRITERION   | POSSIBLE MEANING                                                                                                               |
| ----- | ------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `19B` | EQUALS              | `00 00 00 0F 20 57` | The signal code looks like an LOCK signal. This altered LOCK gets repeated also while the Sleigh is in idle state. It’s probable that the last bytes are just ignored thus the potential effect is that doors may close randomly at every moment. |
| `080` | CONTAINS            | `FF FF F          ` | The signal code is a BRAKE code but it looks like a negative number in two’s complement representation. This collides with the BRAKE signal which only accepts positive numbers (0x00 to 0x64). The potential effect would be to randomly disable brakes during their usage.|

## 7.4. Signal mapping
| ID    | COMPARISON OPERATOR | MESSAGE CRITERION   | TAILING BYTES MEANING                                                                                          | OPERATION     |
| ---   | ------------------- | -----------------   | -----------------------------------------------------------------------------------------------------------    | ------------- |
| `19B` | EQUALS              | `00 00 00 00 00 00` | N/A                                                                                                            | LOCK          |
| `19B` | EQUALS              | `00 00 0F 00 00 00` | N/A                                                                                                            | UNLOCK        |
| `02A` | EQUALS              | `00 00 FF         ` | N/A                                                                                                            | STOP          |
| `02A` | EQUALS              | `00 FF 00         ` | N/A                                                                                                            | START         |
| `244` | CONTAINS            | `-- -- -- -- -- --` | Hexdecimal representation of the speed shown by the speedometer                                                | SPEEDOMETER   |
| `080` | CONTAINS            | `00 00 --         ` | Hexdecimal representation of the brake pressure (0x00 to 0x64)                                                 | BRAKE         |
| `019` | CONTAINS            | `FF FF FF --      ` | Steering with - sign, the negative number gets represented as two’s complement and ranges from (0xFF to 0xCE). | STEERING LEFT |
| `019` | CONTAINS            | `00 00 00 --      ` | Steering with + sign, the negative number gets represented as two’s complement and ranges from (0x00 to 0x32). | STEERING RIGHT|

## 7.5. All fits now
Remember my request at Chapter 5.5.1? You made me become Santa, you made me fix his sleigh, how can you not allow me to ride Rudolph next year?  
![rudoplh](imgs/00_rudolph.jpeg)

---
# 8. [Broken Tag Generator](../08.%20Broken%20Tag%20Generator/README.md)
# 9. [ARP Shenanigans](../09.%20ARP%20Shenanigans/README.md)
# 10. [Defeat Fingerprint Sensor](../10.%20Defeat%20Fingerprint%20Sensor/README.md)
# 11a. [Naughty/Nice List with Blockchain Investigation Part 1](../11a.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%201/README.md)
# 11b. [Naughty/Nice List with Blockchain Investigation Part 2](../11b.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%202/README.md)

---
# 0. [thedead@asian:~$ whoami](../README.md)
# ?. [33.6 Kbps](../%20%3F.%2033.6%20Kbps/README.md)
# 1. [Uncover Santa's Gift List](../01.%20Uncover%20Santa's%20Gift%20List/README.md)
# 2. [Investigate S3 Bucket](../02.%20Investigate%20S3%20Bucket/README.md)
# 3. [Point-of-Sale Password Recovery](../03.%20Point-of-Sale%20Password%20Recovery/README.md)
# 4. [Operate the Santavator](../04.%20Operate%20the%20Santavator/README.md)
# 5. [Open HID Lock](../05.%20Open%20HID%20Lock/README.md)
# 6. [Splunk Challenge](../06.%20Splunk%20Challenge/README.md)