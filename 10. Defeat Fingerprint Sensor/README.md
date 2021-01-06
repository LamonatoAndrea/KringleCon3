# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 10. Defeat Fingerprint Sensor
## 10.0. Description
Bypass the Santavator fingerprint sensor. Enter Santa's office without Santa's fingerprint.
##10.1. Solution
To solve this objective I operated the santavator the same as [Objective 4](../04), just by specifying the proper floor:
```javascript
var targetFloor = 3;
$.ajax({
  type: 'POST',
  url: POST_URL,
  dataType: 'json',
  contentType: 'application/json',
  data: JSON.stringify({ 
    targetFloor,
    id: getParams.id,
  }),
  success: (res, status) => {
    if (res.hash) {
      __POST_RESULTS__({
        resourceId: getParams.id || '1111',
        hash: res.hash,
        action: 'goToFloor-' + targetFloor,
      });
    }
  }
});
```
![floor3](imgs/00_goToFloor-3.png)
## 10.3. ...actually…
Actually I’ve spent some time thinking why this objective looked so straightforward to me… I mean, could it simply be the same, identical, solution of another objective? So I did my homework and landed on your [github](https://github.com/CounterHack/HolidayHack2020/issues/36). Now I know… how many “wrong” solutions did I collect so far? 3 out of 11? I’m proud of them and I’ll never correct them anyway 😁

## 10.2. Because sometimes root is not the way
![meme](imgs/01_meme.jpeg)

---
# 11a. [Naughty/Nice List with Blockchain Investigation Part 1](../11a.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%201/README.md)
# 11b. [Naughty/Nice List with Blockchain Investigation Part 2](../11b.%20Naughty-Nice%20List%20with%20Blockchain%20Investigation%20Part%202/README.md)

---
# 0. [thedead@asian:~$ whoami](../README.md)
# ?. 33.6 Kbps
# 1. Uncover Santa's Gift List
# 2. Investigate S3 Bucket
# 3. Point-of-Sale Password Recovery
# 4. Operate the Santavator
# 5. Open HID Lock
# 6. Splunk Challenge
# 7. Solve the Sleigh's CAN-D-BUS Problem
# 8. Broken Tag Generator
# 9. ARP Shenanigans