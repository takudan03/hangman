from random import randrange

# pick random word from dictionary file
wordlist = []
with open('wordlist.txt', 'r') as wordlistFile:
    for line in wordlistFile:
        wordlist.append(line)

word = wordlist[randrange(0, len(wordlist))].strip()
print(word)

wordlen = len(word)
word_split=list(word) #SPlit into char array

###############################################

#Type in word to gues instead of using dictionary file
# word_in=input()
# word_split=list(word_in) #SPlit into char array

#################################################
print (word_split)

allowed_guesses=5
correct_guess=False
guessed_list=[]
new_list=[]

for i in range(len(word_split)):
    new_list.append("_")

print (new_list)
i=0

def print_list():
    print (''.join(new_list))
    print (guessed_list)


def draw_graphic(wrong_guesses):
    if wrong_guesses == 1:
        print("   _____ \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "__|__\n")
        print("Wrong guess. " + str(allowed_guesses - wrong_guesses) + " guesses remaining\n")
    elif wrong_guesses == 2:
        print("   _____ \n"
              "  |     | \n"
              "  |     |\n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "__|__\n")
        print("Wrong guess. " + str(allowed_guesses - wrong_guesses) + " guesses remaining\n")
    elif wrong_guesses == 3:
        print("   _____ \n"
              "  |     | \n"
              "  |     |\n"
              "  |     | \n"
              "  |      \n"
              "  |      \n"
              "  |      \n"
              "__|__\n")
        print("Wrong guess. " + str(allowed_guesses - wrong_guesses) + " guesses remaining\n")
    elif wrong_guesses == 4:
        print("   _____ \n"
              "  |     | \n"
              "  |     |\n"
              "  |     | \n"
              "  |     O \n"
              "  |      \n"
              "  |      \n"
              "__|__\n")
        print("Wrong guess. " + str(allowed_guesses - wrong_guesses) + " guesses remaining\n")
    elif wrong_guesses == 5:
        print("   _____ \n"
              "  |     | \n"
              "  |     |\n"
              "  |     | \n"
              "  |     O \n"
              "  |    /|\ \n"
              "  |    / \ \n"
              "__|__\n")
        print("Wrong guess. You are hanged!!!\n")
        print("The word was:", word)


while i <= allowed_guesses or len(new_list) == len(word_split):
    user_guess = input("Guess a letter : ")
    for y in range(len(guessed_list)):
        while user_guess == guessed_list[y]:
            print("You already tried that!")
            user_guess = input("Guess a letter")

    guessed_list.append(user_guess)
    found = False
    for x in range(len(word_split)):
        if user_guess == word_split[x]:
            new_list[x] = word_split[x]
            found = True
    if found == True:
        print("Bingo!")
    else:
        i += 1
        draw_graphic(i)


    if new_list == word_split:
        print("Congratulations. You win!!!")
        print(''.join(word_split))
        break
    print_list()
else:
    print("You have failed. DOLOLO")

