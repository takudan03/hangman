from random import randrange

# pick random word from dictionary file
wordlistFile = open('wordlist.txt', 'r')
wordlist = []
for line in wordlistFile:
    wordlist.append(line)
# print(wordlistFile)

word = wordlist[randrange(0, len(wordlist))]
print(word)

wordlen = len(word)

###############################################

#Type in word to gues instead of using dictionary file
word_in=input()

word_split=list(word_in) #SPlit into char array
print (word_split)

allowed_guesses=10
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


while i <= allowed_guesses or len(new_list) == len(word_split):
    user_guess = input("Guess a letter : ")
    for y in range(len(guessed_list)):
        while user_guess == guessed_list[y]:
            print("You already tried that!")
            user_guess = input("Guess a letter")
    i += 1

    guessed_list.append(user_guess)
    found = False
    for x in range(len(word_split)):
        if user_guess == word_split[x]:
            new_list[x] = word_split[x]
            found = True
    if found == True:
        print("Bingo!")
    else:
        print("Nope! Try again!")

    if new_list == word_split:
        print("Congratulations. You win!!!")
        print(''.join(word_split))
        break

    print_list()
else:
    print("You have failed. DOLOLO")




# Make GUI for hangman game
# import tkinter as tk
# from PIL import Image, ImageTk
#
# root = tk.Tk()
#
# canvas = tk.Canvas(root, width=400, height=420, relief='raised')
# canvas.pack()
# img = Image.open(r'C:\\Users\\User\\Jupyter Projects\\hangman\\car2.png')
# img = img.resize((50, 50), Image.ANTIALIAS)
# img = ImageTk.PhotoImage(img, master=root)
# canvas.create_image(200, 200, image=img)
#
# for i in range(wordlen):
#     entry
#
# label = tk.Label(root, text='HANGMAN', font=("Helvetica", 16))
# canvas.create_window(200, 100, window=label)
#
# # labelimg=tk.Label(root, image=img)
# # labelimg.place(x=200,y=200)
#
# root.wm_title("Tkinter window")
# root.geometry("200x120")
# root.mainloop()

# Maybe make multiplayer logic