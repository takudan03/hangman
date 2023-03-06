import json
import string
from random import randrange

from flask import Flask, render_template, request, redirect, url_for, flash, make_response

app = Flask("HANGMAN")

alphabet_list = list(string.ascii_uppercase)

@app.route('/', methods=['POST', 'GET'])
def play():
    return render_template('game.html', alph=alphabet_list)

@app.route('/new-word')
def getNewWord():
    with open('wordlist.txt', 'r') as wordlistFile:
        wordlist = []
        for line in wordlistFile:
            wordlist.append(line)
    word = wordlist[randrange(0, len(wordlist))].strip()
    print(json.dumps(word))
    return {"new-word":word}
    # return word

app.run(port=5069, debug=True)
