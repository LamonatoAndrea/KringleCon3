#!/usr/bin/env python3
import random
from mt19937predictor import MT19937Predictor
from naughty_nice import Block, Chain

if __name__ == '__main__':
    predictor = MT19937Predictor()
    index = None
    c2 = Chain(load=True, filename='blockchain.dat')
    for b in c2.blocks:
        index = b.index
        predictor.setrandbits(int(b.nonce), 64)
        print ("Index {} | Nonce {} (Hex {})".format(index, b.nonce, hex(b.nonce)))
    while index < 130000:
        index += 1
        new_index = predictor.getrandbits(64)
        print ("Index {} | Predicted Nonce {} (Hex {})".format(index, new_index, hex(new_index)))