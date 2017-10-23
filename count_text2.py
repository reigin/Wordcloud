from collections import Counter

import numpy as np 
import pandas as pd

from nltk import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction import text 
from nltk.corpus import stopwords

#df = pd.read_csv('raw_bdg.csv')
df = pd.read_csv('/media/reigin/data1/bljr-kul/s2/Tesis/dataset/test/projek3/Scrapy-tripadvisor-reviews-master/tourism.csv')

stop_words = set(stopwords.words('english'))
stop_words.update(['.', ',', '"', "'", '?', '!', ':', ';', '(', ')', '[', ']', '{', '}', '{{', '}}', '?)', '-', '?).', 'f', 'w', '#', "'s", 'also', '...', "n't",'&',"``","''"]) 

ngram_vectorizer = CountVectorizer(analyzer='word', tokenizer=word_tokenize, ngram_range=(1, 1), min_df=1,lowercase=True,stop_words=stop_words)
# X matrix where the row represents sentences and column is our one-hot vector for each token in our vocabulary
X = ngram_vectorizer.fit_transform(df['review'])

# Vocabulary
vocab = list(ngram_vectorizer.get_feature_names())

# Column-wise sum of the X matrix.
# It's some crazy numpy syntax that looks horribly unpythonic
# For details, see http://stackoverflow.com/questions/3337301/numpy-matrix-to-array
# and http://stackoverflow.com/questions/13567345/how-to-calculate-the-sum-of-all-columns-of-a-2d-numpy-array-efficiently
counts = X.sum(axis=0).A1

freq_distribution = Counter(dict(zip(vocab, counts)))
overall= (freq_distribution.most_common(75))
print "var words = ["
for index in overall:
    print "{text: '"+index[0]+"', size: ";
    print index[1];
    print "}"
    if index != overall[-1]:
        print ","
        
print "];"


