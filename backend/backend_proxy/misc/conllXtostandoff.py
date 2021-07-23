"""
Original file:
https://github.com/nlplab/brat/blob/master/tools/conllXtostandoff.py

Licence:
https://github.com/nlplab/brat/blob/master/LICENSE.md

"""


# Script to convert a CoNLL X (2006) tabbed dependency tree format
# file into BioNLP ST-flavored standoff and a reconstruction of the
# original text.


import codecs
import os
import io
import re
import sys

# maximum number of sentences to include in single output document
# (if None, doesn't split into documents)
MAX_DOC_SENTENCES = 10

# whether to output an explicit root note
OUTPUT_ROOT = True
# the string to use to represent the root node
ROOT_STR = 'ROOT'

INPUT_ENCODING = "UTF-8"
OUTPUT_ENCODING = "UTF-8"

output_directory = None

# rewrites for characters appearing in CoNLL-X types that cannot be
# directly used in identifiers in brat-flavored standoff
charmap = {
    '<': '_lt_',
    '>': '_gt_',
    '+': '_plus_',
    '?': '_question_',
    '&': '_amp_',
    ':': '_colon_',
    '.': '_period_',
    '!': '_exclamation_',
}


def maptype(s):
    return "".join([charmap.get(c, c) for c in s])


def tokstr(start, end, ttype, idnum, text):
    # sanity checks
    assert '\n' not in text, "ERROR: newline in entity '%s'" % (text)
    assert text == text.strip(), "ERROR: tagged span contains extra whitespace: '%s'" % (text)
    return "T%d\t%s %d %d\t%s" % (idnum, maptype(ttype), start, end, text)


def depstr(depid, headid, rel, idnum):
    return "R%d\t%s Arg1:T%d Arg2:T%d" % (idnum, maptype(rel), headid, depid)


def output(docnum, sentences):
    global output_directory
    offset, idnum, ridnum = 0, 1, 1
    doctext = ""
    final_entities = []
    final_deps = []
    for si, sentence in enumerate(sentences):
        tokens, deps = sentence

        # store mapping from per-sentence token sequence IDs to
        # document-unique token IDs
        idmap = {}

        # output tokens
        prev_form = None

        if OUTPUT_ROOT:
            # add an explicit root node with seq ID 0 (zero)
            tokens = [('0', ROOT_STR, ROOT_STR)] + tokens

        for ID, form, POS in tokens:
            if "-" in ID:
                continue
            if prev_form is not None:
                doctext = doctext + ' '
                offset += 1

            # output a token annotation
            ent = ['T{}'.format(idnum), maptype(
                POS), offset, offset + len(form), form]
            final_entities.append(ent)
            # print(tokstr(
            #    offset, offset + len(form), POS, idnum, form))
            assert ID not in idmap, "Error in data: dup ID"
            idmap[ID] = idnum
            idnum += 1

            doctext = doctext + form
            offset += len(form)

            prev_form = form

        # output dependencies
        for dep, head, rel in deps:

            # if root is not added, skip deps to the root (idx 0)
            if not OUTPUT_ROOT and head == '0':
                continue
            dep_list = ['R{}'.format(ridnum), maptype(
                rel), [['Arg1', 'T{}'.format(idmap[head])], ['Arg2', 'T{}'.format(idmap[dep])]]]
            final_deps.append(dep_list)
            #print(depstr(idmap[dep], idmap[head], rel, ridnum))
            ridnum += 1

        if si + 1 != len(sentences):
            doctext = doctext + '\n'
            offset += 1

    return [final_entities, final_deps]


def process(text):
    docnum = 1
    sentences = []
    tokens, deps = [], []

    lines = io.StringIO(text).readlines()
    for ln, l in enumerate(lines):
        l = l.strip()

        # igore lines starting with "#" as comments
        if len(l) > 0 and l[0] == "#":
            continue

        if re.match(r'^\s*$', l):
            # blank lines separate sentences
            if len(tokens) > 0:
                sentences.append((tokens, deps))
            tokens, deps = [], []

            # limit sentences per output "document"
            if MAX_DOC_SENTENCES and len(sentences) >= MAX_DOC_SENTENCES:
                output(docnum, sentences)
                sentences = []
                docnum += 1
            continue

        # Assume it's a normal line. The format is tab-separated,
        # with ten fields, of which the following are used here
        # (from http://ilk.uvt.nl/conll/):
        # 1 ID     Token counter, starting at 1 for each new sentence.
        # 2 FORM   Word form or punctuation symbol.
        # 5 POSTAG Fine-grained part-of-speech tag
        # 7 HEAD   Head of the current token
        # 8 DEPREL Dependency relation to the HEAD.
        fields = l.split('\t')

        assert len(fields) == 10

        ID, form, POS = fields[0], fields[1], fields[4]
        head, rel = fields[6], fields[7]

        tokens.append((ID, form, POS))
        # allow value "_" for HEAD to indicate no dependency
        if head != "_":
            deps.append((ID, head, rel))

    # process leftovers, if any
    if len(tokens) > 0:
        sentences.append((tokens, deps))
    if len(sentences) > 0:
        return output(docnum, sentences)
    else:
        return [[], []]


# dbg:
if __name__ == '__main__':
    import sys
    fname = sys.argv[1]
    with open(fname, "r") as f:
        text = f.read()
    print(process(text))
