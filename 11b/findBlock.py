#!/usr/bin/env python3
import random
from Crypto.Hash import MD5, SHA256
from naughty_nice import Block, Chain

def full_hash_SHA256(block):
    hash_obj = SHA256.new()
    hash_obj.update(block.block_data_signed())
    return hash_obj.hexdigest()

if __name__ == '__main__':
    c = Chain(load=True, filename='blockchain.dat')
    for b in c.blocks:
        if (full_hash_SHA256(b)) == "58a3b9335a6ceb0234c12d35a0564c4ef0e90152d0eb2ce2082383b38028a90f":
            n_n = "Naughty"
            if b.sign != 0:
                n_n = "Nice"
            
            print ("Block found @ Index {} ({})".format(b.index, hex(b.index)))
            print ("MD5 {} | SHA256 {}".format(b.full_hash(), full_hash_SHA256(b)))
            print ("Sign {} ({}) | Value {}".format(hex(b.sign), n_n, hex(b.score)))
            i = 0
            while i < len(b.data):
                b.dump_doc(i)
                i += 1