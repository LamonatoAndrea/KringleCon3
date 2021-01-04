// LEVEL 7
function f(q) {
  a = 0;
  for (i = 0; i < q.length; i++)
    for (j = 0; j < q[i].length; j++)
      if (!isNaN(q[i][j])) a += q[i][j]
  return a;
}
for (i = 0; i < 8; i++) {
  if (i % 4 == 0) elf.moveDown(i + 1);
  if (i % 4 == 1) elf.moveLeft(i + 1);
  if (i % 4 == 2) elf.moveUp(i + 1);
  if (i % 4 == 3) elf.moveRight(i + 1);
  elf.pull_lever(i);

}
elf.moveUp(2);
elf.moveLeft(4);
elf.tell_munch(f);
elf.moveUp(100);