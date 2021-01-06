╔════════════════════════════════════════════════════════════════╗
║  ___ ___ ___ ___ ___ _  _ _____   ___  _   ___ _  _____ _____  ║
║ | _ \ _ \ __/ __| __| \| |_   _| | _ \/_\ / __| |/ / __|_   _| ║
║ |  _/   / _|\__ \ _|| .` | | |   |  _/ _ \ (__| ' <| _|  | |   ║
║ |_| |_|_\___|___/___|_|\_| |_|   |_|/_/ \_\___|_|\_\___| |_|   ║
║                ___                                             ║
║               | _ \_ _ ___ _ __ _ __  ___ _ _                  ║
║               |  _/ '_/ -_) '_ \ '_ \/ -_) '_|                 ║
║               |_| |_| \___| .__/ .__/\___|_|                   ║
║                           |_|  |_|                             ║
║                (Packets prepared with scapy)                   ║
╚════════════════════════════════════════════════════════════════╝
Type "yes" to begin. yes
╔════════════════════════════════════════════════════════════════╗
║ HELP MENU:                                                     ║
╠════════════════════════════════════════════════════════════════╣
║ 'help()' prints the present packet scapy help.                 ║
║ 'help_menu()' prints the present packet scapy help.            ║
║ 'task.get()' prints the current task to be solved.             ║
║ 'task.task()' prints the current task to be solved.            ║
║ 'task.help()' prints help on how to complete your task         ║
║ 'task.submit(answer)' submit an answer to the current task     ║
║ 'task.answered()' print through all successfully answered.     ║
╚════════════════════════════════════════════════════════════════╝
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
Correct! Here is some really nice list comprehension that will grab all the raw payloads f
rom tcp packets:
[pkt[Raw].load for pkt in TCP_PACKETS if Raw in pkt]
The ICMP_PACKETS variable contains a packet list of several icmp echo-request and icmp ech
o-reply packets. Submit only the ICMP chksum value from the second packet in the ICMP_PACK
ETS list.

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
>>> task.submit(IP (dst='127.2.3.4') / UDP(dport=53) / DNS(qd=DNSQR(qname='elveslove.santa
... ')))
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

