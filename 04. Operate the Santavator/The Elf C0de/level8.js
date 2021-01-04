// LEVEL 8 - The lazy solution
function f(q) {
  a = 0;
  for (i = 0; i < q.length; i++)
    for (key in q[i])
      if (q[i][key] == "lollipop")
        return key;
}

moves = ['1_>', '1_L', '2_^', '3_<', '1_L', '2_^', '5_>', '1_L', '2_^', '7_<', '1_L', '2_^', '9_>', '1_L', '2_^', '11_<', '1_L', '2_^', '1_M', '12_>'];
sum = 0;
lever_count = 0;
for (i=0; i<moves.length; i++) {
	var times = moves[i].split('_')[0];
	var move = moves[i].split('_')[1];
    for (j=0; j<times; j++) {
    	if (move == '>') elf.moveRight(1);
		if (move == '<') elf.moveLeft(1);
		if (move == '^') elf.moveUp(1);
		if (move == 'L') {
		  sum += elf.get_lever(lever_count);
		  elf.pull_lever(sum);
		  lever_count++;
		}
		if (move == 'M') elf.tell_munch(f);
    }
}