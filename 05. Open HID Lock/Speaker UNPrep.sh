Help us get into the Speaker Unpreparedness Room!

The door is controlled by ./door, but it needs a password! If you can figure
out the password, it'll open the door right up!

Oh, and if you have extra time, maybe you can turn on the lights with ./lights
activate the vending machines with ./vending-machines? Those are a little
trickier, they have configuration files, but it'd help us a lot!

(You can do one now and come back to do the others later if you want)

We copied edit-able versions of everything into the ./lab/ folder, in case you
want to try EDITING or REMOVING the configuration files to see how the binaries
react.

Note: These don't require low-level reverse engineering, so you can put away IDA
and Ghidra (unless you WANT to use them!)
elf@73ec330920b2 ~ $ ls 
door  lab  lights  lights.conf  vending-machines  vending-machines.json
elf@73ec330920b2 ~ $ strings door | grep -i password
/home/elf/doorYou look at the screen. It wants a password. You roll your eyes - the 
password is probably stored right in the binary. There's gotta be a
Be sure to finish the challenge in prod: And don't forget, the password is "Op3nTheD00r"
Beep boop invalid password
elf@73ec330920b2 ~ $ ./door 
You look at the screen. It wants a password. You roll your eyes - the 
password is probably stored right in the binary. There's gotta be a
tool for this...

What do you enter? > Op3nTheD00r
Checking......

Door opened!


elf@73ec330920b2 ~ $ cat lights.conf 
password: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
name: elf-technician
elf@73ec330920b2 ~ $ cd lab
elf@e725d14b2eb0 ~/lab $ cat lights.conf 
name: E$ed633d885dcb9b2f3f0118361de4d57752712c27c5316a95d9e5e5b124
password:
elf@e725d14b2eb0 ~/lab $ ./lights 
The speaker unpreparedness room sure is dark, you're thinking (assuming
you've opened the door; otherwise, you wonder how dark it actually is)

You wonder how to turn the lights on? If only you had some kind of hin---

 >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED: /home/elf/lab/lights.conf

---t to help figure out the password... I guess you'll just have to make do!

The terminal just blinks: Welcome back, Computer-TurnLightsOn

What do you enter? > 
Checking......
That would have turned on the lights!

If you've figured out the real password, be sure you run /home/elf/lights
elf@e725d14b2eb0 ~ $ ./lights 
The speaker unpreparedness room sure is dark, you're thinking (assuming
you've opened the door; otherwise, you wonder how dark it actually is)

You wonder how to turn the lights on? If only you had some kind of hin---

 >>> CONFIGURATION FILE LOADED, SELECT FIELDS DECRYPTED: /home/elf/lights.conf

---t to help figure out the password... I guess you'll just have to make do!

The terminal just blinks: Welcome back, elf-technician

What do you enter? > Computer-TurnLightsOn
Checking......

Lights on!
elf@1fb6c9052b21 ~/lab $ ./vending-machines 
The elves are hungry!

If the door's still closed or the lights are still off, you know because
you can hear them complaining about the turned-off vending machines!
You can probably make some friends if you can get them back on...

Loading configuration from: /home/elf/lab/vending-machines.json

I wonder what would happen if it couldn't find its config file? Maybe that's
something you could figure out in the lab...

ALERT! ALERT! Configuration file is missing! New Configuration File Creator Activated!

Please enter the name > AAAAAAAAAAAAAAAA
Please enter the password > AAAAAAAAAAAAAAAA

Welcome, AAAAAAAAAAAAAAAA! It looks like you want to turn the vending machines back on?
Please enter the vending-machine-back-on code > 
Checking......
Beep boop invalid password
elf@1fb6c9052b21 ~/lab $ cat vending-machines.json 
{
  "name": "AAAAAAAAAAAAAAAA",
  "password": "XiGRehmwXiGRehmw"
 }
 elf@1fb6c9052b21 ~/lab $ ./vending-machines 
The elves are hungry!

If the door's still closed or the lights are still off, you know because
you can hear them complaining about the turned-off vending machines!
You can probably make some friends if you can get them back on...

Loading configuration from: /home/elf/lab/vending-machines.json

I wonder what would happen if it couldn't find its config file? Maybe that's
something you could figure out in the lab...

ALERT! ALERT! Configuration file is missing! New Configuration File Creator Activated!

Please enter the name > BBBBBBBBBBBBBBBB
Please enter the password > BBBBBBBBBBBBBBBB

Welcome, BBBBBBBBBBBBBBBB! It looks like you want to turn the vending machines back on?
Please enter the vending-machine-back-on code > 
Checking......
Beep boop invalid password
elf@1fb6c9052b21 ~/lab $ cat vending-machines.json 
{
  "name": "BBBBBBBBBBBBBBBB",
  "password": "DqTpKv7fDqTpKv7f"
}
elf@1fb6c9052b21 ~/lab $ ./vending-machines 
The elves are hungry!

If the door's still closed or the lights are still off, you know because
you can hear them complaining about the turned-off vending machines!
You can probably make some friends if you can get them back on...

Loading configuration from: /home/elf/lab/vending-machines.json

I wonder what would happen if it couldn't find its config file? Maybe that's
something you could figure out in the lab...

ALERT! ALERT! Configuration file is missing! New Configuration File Creator Activated!

Please enter the name > ABABABABABABABAB
Please enter the password > ABABABABABABABAB

Welcome, ABABABABABABABAB! It looks like you want to turn the vending machines back on?
Please enter the vending-machine-back-on code > 
Checking......
Beep boop invalid password
elf@1fb6c9052b21 ~/lab $ cat vending-machines.json | tail -n2 | head -n1 | cut -d '"' -f4
XqGpevmfXqGpevmf
elf@1fb6c9052b21 ~/lab $ for ((i=32;i<127;i++));
> do
> char=$(printf "\\$(printf %03o "$i")")
> char=$(printf "%0.s$char" {1..16})
> echo -e "$char\n$char\n$char\n" | ./vending-machines 1>/dev/null
> enc=$(cat vending-machines.json | tail -n2 | head -n1 | cut -d '"' -f4)
> rm vending-machines.json
> echo -e "$char\t$enc"
> done
                   ################
!!!!!!!!!!!!!!!!   !!!!!!!!!!!!!!!!
""""""""""""""""   \
################   ################
$$$$$$$$$$$$$$$$   $$$$$$$$$$$$$$$$

&&&&&&&&&&&&&&&&   &&&&&&&&&&&&&&&&
''''''''''''''''   ''''''''''''''''
((((((((((((((((   ((((((((((((((((
))))))))))))))))   ))))))))))))))))
****************   ****************
++++++++++++++++   ++++++++++++++++
,,,,,,,,,,,,,,,,   ,,,,,,,,,,,,,,,,
----------------   ----------------
................   ................
eeeeeeeeeeeeeeee   wcZQAYuewcZQAYue
////////////////   ////////////////
0000000000000000   3ehm9ZFH3ehm9ZFH
1111111111111111   2rDO5LkI2rDO5LkI
2222222222222222   pWFLz5zSpWFLz5zS
3333333333333333   WJ1YbNtlWJ1YbNtl
4444444444444444   gophDlgKgophDlgK
5555555555555555   dTzAYdIddTzAYdId
6666666666666666   jOx0OoJ6jOx0OoJ6
7777777777777777   JItvtUjtJItvtUjt
8888888888888888   VXmFSQw4VXmFSQw4
9999999999999999   lCgPE6x7lCgPE6x7
::::::::::::::::   ::::::::::::::::
;;;;;;;;;;;;;;;;   ;;;;;;;;;;;;;;;;
<<<<<<<<<<<<<<<<   <<<<<<<<<<<<<<<<
================   ================
>>>>>>>>>>>>>>>>   >>>>>>>>>>>>>>>>
????????????????   ????????????????
@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@@@@
AAAAAAAAAAAAAAAA   XiGRehmwXiGRehmw
BBBBBBBBBBBBBBBB   DqTpKv7fDqTpKv7f
CCCCCCCCCCCCCCCC   Lbn3UP9WLbn3UP9W
DDDDDDDDDDDDDDDD   yv09iu8Qyv09iu8Q
EEEEEEEEEEEEEEEE   hxkr3zCnhxkr3zCn
FFFFFFFFFFFFFFFF   HYNNLCeOHYNNLCeO
GGGGGGGGGGGGGGGG   SFJGRBvYSFJGRBvY
HHHHHHHHHHHHHHHH   PBubpHYVPBubpHYV
IIIIIIIIIIIIIIII   zka18jGrzka18jGr
JJJJJJJJJJJJJJJJ   EA24nILqEA24nILq
KKKKKKKKKKKKKKKK   F14D1GnMF14D1GnM
LLLLLLLLLLLLLLLL   QKdxFbK3QKdxFbK3
MMMMMMMMMMMMMMMM   63iZBrdj63iZBrdj
NNNNNNNNNNNNNNNN   ZE8IMJ3ZZE8IMJ3Z
OOOOOOOOOOOOOOOO   xlQsZ4UixlQsZ4Ui
PPPPPPPPPPPPPPPP   sdwjup68sdwjup68
QQQQQQQQQQQQQQQQ   mSyVX10smSyVX10s
RRRRRRRRRRRRRRRR   I2SHIMBoI2SHIMBo
SSSSSSSSSSSSSSSS   4gC7VyoG4gC7VyoG
TTTTTTTTTTTTTTTT   Np9Tg0akNp9Tg0ak
UUUUUUUUUUUUUUUU   vHBEkVH5vHBEkVH5
VVVVVVVVVVVVVVVV   t4cXy3Vpt4cXy3Vp
WWWWWWWWWWWWWWWW   BslfGtSzBslfGtSz
XXXXXXXXXXXXXXXX   0PHMxOl00PHMxOl0
YYYYYYYYYYYYYYYY   rQKqjDq2rQKqjDq2
ZZZZZZZZZZZZZZZZ   KtqoNicvKtqoNicv
[[[[[[[[[[[[[[[[   [[[[[[[[[[[[[[[[
\\\\\\\\  \\\\\\\\
]]]]]]]]]]]]]]]]   ]]]]]]]]]]]]]]]]
^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^
________________   ________________
````````````````   ````````````````
aaaaaaaaaaaaaaaa   9Vbtacpg9Vbtacpg
bbbbbbbbbbbbbbbb   GUVBfWhPGUVBfWhP
cccccccccccccccc   e9ee6EERe9ee6EER
dddddddddddddddd   ORLdlwWbORLdlwWb
eeeeeeeeeeeeeeee   wcZQAYuewcZQAYue
ffffffffffffffff   8wIUrf5x8wIUrf5x
gggggggggggggggg   kyYSPafTkyYSPafT
hhhhhhhhhhhhhhhh   nnUgokAhnnUgokAh
iiiiiiiiiiiiiiii   M0sw4eOCM0sw4eOC
jjjjjjjjjjjjjjjj   a8okTqy1a8okTqy1
kkkkkkkkkkkkkkkk   o63i07r9o63i07r9
llllllllllllllll   fm6W7siFfm6W7siF
mmmmmmmmmmmmmmmm   qMvusRQJqMvusRQJ
nnnnnnnnnnnnnnnn   bhE62XDBbhE62XDB
oooooooooooooooo   Rjf2h24cRjf2h24c
pppppppppppppppp   1zM5H8XL1zM5H8XL
qqqqqqqqqqqqqqqq   YfX8vxPyYfX8vxPy
rrrrrrrrrrrrrrrr   5NAyqmsu5NAyqmsu
ssssssssssssssss   A5PnWSbDA5PnWSbD
tttttttttttttttt   cZRCdgTNcZRCdgTN
uuuuuuuuuuuuuuuu   Cujcw9NmCujcw9Nm
vvvvvvvvvvvvvvvv   uGWzmnRAuGWzmnRA
wwwwwwwwwwwwwwww   T7OlJK2XT7OlJK2X
xxxxxxxxxxxxxxxx   7D7acF1E7D7acF1E
yyyyyyyyyyyyyyyy   iL5JQAMUiL5JQAMU
zzzzzzzzzzzzzzzz   UarKCTZaUarKCTZa
{{{{{{{{{{{{{{{{   {{{{{{{{{{{{{{{{
||||||||||||||||   ||||||||||||||||
}}}}}}}}}}}}}}}}   }}}}}}}}}}}}}}}}
~~~~~~~~~~~~~~~~   ~~~~~~~~~~~~~~~~

# Simple substitution of LVEdQPpBwr to CandyCane1
elf@8aa5134940b6 ~ $ ./vending-machines 
The elves are hungry!

If the door's still closed or the lights are still off, you know because
you can hear them complaining about the turned-off vending machines!
You can probably make some friends if you can get them back on...

Loading configuration from: /home/elf/vending-machines.json

I wonder what would happen if it couldn't find its config file? Maybe that's
something you could figure out in the lab...

Welcome, elf-maintenance! It looks like you want to turn the vending machines back on?
Please enter the vending-machine-back-on code > CandyCane1
Checking......

Vending machines enabled!!
