import numpy as np 
import pandas as pd

df = pd.read_csv('/media/reigin/data1/bljr-kul/s2/Semester3/Visdat/tugas/tgs bsr/data_review.csv', sep=';')

print df

#~ s = "some\x00string. with\x15 funny characters"
#~ import string
#~ printable = set(string.printable)
#~ filter(lambda x: x in printable, s)
#~ 'somestring. with funny characters'
