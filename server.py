import string
from random import randrange

from flask import Flask, render_template, request, redirect, url_for, flash, make_response

app = Flask("HANGMAN")

alphabet_list = list(string.ascii_uppercase)
word = ''
word_split = []
guessed_list = []


def initialize_game():
    # pick random word from dictionary file
    wordlistFile = open('wordlist.txt', 'r')
    wordlist = []
    for line in wordlistFile:
        wordlist.append(line)
    wordlistFile.close()
    word = wordlist[randrange(0, len(wordlist))].strip()
    print(word)
    return word


@app.route('/', methods=['POST', 'GET'])
def hello():
    if request.method == 'POST':
        word = initialize_game()
        res = make_response()
        res.set_cookie('current_word', word)
        return res
        # return redirect(url_for('play'))
    return render_template('cover.html')


@app.route('/play')
def play():
    word = request.cookies.get('current_word')
    word_split = list(word.upper())

    return render_template('game.html', alph=alphabet_list, wordSpl=word_split)

app.run(port=5069)
