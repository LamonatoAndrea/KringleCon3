// LEVEL 6
for (i = 0; i < 4; i++)
  elf.moveTo(lollipop[i]);
elf.moveLeft(8);
elf.moveUp(2);
q = elf.ask_munch(0);
for (key in q)
  if (q[key] == "lollipop")
    elf.tell_munch(key);
elf.moveUp(10);