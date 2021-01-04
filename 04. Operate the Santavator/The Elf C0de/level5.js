// LEVEL 5
elf.moveTo(lollipop[1]);
elf.moveTo(lollipop[0]);
q = elf.ask_munch(0);
a = [];
for (i = 0; i < q.length; i++) {
  if (!isNaN(q[i]))
    a.push(q[i])
}
elf.tell_munch(a);
elf.moveUp(10);