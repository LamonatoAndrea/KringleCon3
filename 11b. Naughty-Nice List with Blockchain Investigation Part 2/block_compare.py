#!/usr/bin/env python3
import random
from Crypto.Hash import MD5, SHA256
from naughty_nice import Block, Chain

def full_hash_SHA256(block):
    hash_obj = SHA256.new()
    hash_obj.update(block.block_data_signed())
    return hash_obj.hexdigest()

def brief_print(block):
    n_n = "Naughty"
    if block.sign != 0:
        n_n = "Nice"
    print ("Block found @ Index {} ({})".format(block.index, hex(block.index)))
    print ("MD5 {}".format(block.full_hash()))
    print ("SHA256 {}".format(full_hash_SHA256(block)))
    print ("Sign {} ({}) | Value {}".format(hex(block.sign), n_n, hex(block.score)))

if __name__ == '__main__':
    original_md5 = ""
    altered_md5 = ""
    original_sha256 = ""
    altered_sha256 = ""

    print ("##################")
    print ("# ORIGINAL BLOCK #")
    print ("##################")
    c = Chain(load=True, filename='blockchain.dat')
    for b in c.blocks:
        if (full_hash_SHA256(b)) == "58a3b9335a6ceb0234c12d35a0564c4ef0e90152d0eb2ce2082383b38028a90f":
            original_md5 = b.full_hash()
            original_sha256 = full_hash_SHA256(b)
            brief_print (b)

    print ("#################")
    print ("# ALTERED BLOCK #")
    print ("#################")
    c = Chain(load=True, filename='129459_altered_2.dat')
    for b in c.blocks:
        altered_md5 = b.full_hash()
        altered_sha256 = full_hash_SHA256(b)
        brief_print (b)

    print ("##################")
    print ("# HASHES COMPARE #")
    print ("##################")
    print ("   Original block MD5: {}".format(original_md5))
    print ("    Altered block MD5: {}".format(altered_md5))
    print ("           MD5s Match: {}".format(original_md5 == altered_md5))
    print ("Original block SHA256: {}".format(original_sha256))
    print (" Altered block SHA256: {}".format(altered_sha256))
    print ("        SHA256s Match: {}".format(original_sha256 == altered_sha256))