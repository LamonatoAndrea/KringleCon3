# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 1. Uncover Santa's Gift List
## 1.0. Description
There is a photo of Santa's Desk on that billboard with his personal gift list. What gift is Santa planning on getting Josh Wright for the holidays? Talk to Jingle Ringford at the bottom of the mountain for advice.
## 1.1. Hints
> **Twirl Area** - Jingle Ringford: *"Make sure you Lasso the correct twirly area."*
> **Image Edit Tool** - Jingle Ringford: *"There are tools out there that could help Filter the Distortion that is this Twirl."*
## 1.2. Solution
I spent a huge amount of time on the wrong picture:
![santa_portrait](imgs/santa_portrait.jpg)
Once I switched to a bigger monitor and got back at the beginning of the challenge I found the right one 😁  
So basically I just downloaded the image from the billboard at the entry:
![billboard](imgs/billboard.png)
Edited it with Photopea and found that Josh Wright wanted a Proxmark:
![solved](imgs/00_solved.png)
## 1.3. Ransom letter
While uselessly scratching my head against Santa Portrait I uncovered a potential message by highlighting borders.  
Below the position of the letters found and their reconstruction:
![high](imgs/01_highlighted_letters.png)  
![now_1](imgs/02_now_is_hall_be_out_of_sight_reconstructed.png)	  
![now_2](imgs/03_now_is_hall_be_out_of_sight_typed.png)  
Which I suppose may make sense with [becoming Santa](TO_LINK) afterward, but who knows 😁

---
# 2. [Investigate S3 Bucket](../02.%20Investigate%20S3%20Bucket/README.md)
# 3. [Point-of-Sale Password Recovery](../03.%20Point-of-Sale%20Password%20Recovery/README.md)
# 4. [Operate the Santavator](../04.%20Operate%20the%20Santavator/README.md)
# 5. [Open HID Lock](../05.%20Open%20HID%20Lock/README.md)
# 6. [Splunk Challenge](../06.%20Splunk%20Challenge/README.md)
# 7. [Solve the Sleigh's CAN-D-BUS Problem](../07.%20Solve%20the%20Sleigh's%20CAN-D-BUS%20Problem/README.md)
# 8. [Broken Tag Generator](../08.%20Broken%20Tag%20Generator/README.md)
# 9. [ARP Shenanigans](../09.%20ARP%20Shenanigans/README.md)
# 10. [Defeat Fingerprint Sensor](../10.%20Defeat%20Fingerprint%20Sensor/README.md)
# 11a. [Naughty/Nice List with Blockchain Investigation Part 1](../11a.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%201/README.md)
# 11b. [Naughty/Nice List with Blockchain Investigation Part 2](../11b.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%202/README.md)
---
# 0. [thedead@asian:~$ whoami](../README.md)
# ?. [33.6 Kbps](../%20%3F.%2033.6%20Kbps/README.md)