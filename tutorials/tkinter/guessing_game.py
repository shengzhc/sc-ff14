from tkinter import Tk, Label, Button, Entry, StringVar, DISABLED, NORMAL, END
import random


class GuessingGame:
    def __init__(self, master):
        self.master = master
        self.master.title("Guessing Game")

        self.secret_number = random.randint(1, 100)
        self.num_guesses = 0
        self.guess = None

        self.message = StringVar()
        self.message.set("Guess a number from 1 to 100")
        self.message_label = Label(self.master, textvariable=self.message)

        vcmd = self.master.register(self.validate)
        self.entry = Entry(self.master, validate="key", validatecommand=(vcmd, "%P"))

        self.guess_button = Button(self.master, text="Guess", command=self.guess_number)
        self.reset_button = Button(self.master, text="Reset", command=self.reset, state=DISABLED)

        # Layout
        self.message_label.grid(row=0, column=0, columnspan=2, sticky="we")
        self.entry.grid(row=1, column=0, columnspan=2, sticky="we")
        self.guess_button.grid(row=2, column=0, sticky="nswe")
        self.reset_button.grid(row=2, column=1, sticky="nswe")

    def validate(self, new_text):
        if not new_text:
            self.guess = None
            return True

        try:
            guess = int(new_text)
            if 1 <= guess <= 100:
                self.guess = guess
                return True
            else:
                return False
        except ValueError:
            return False

    def guess_number(self):
        self.num_guesses += 1

        if self.guess is None:
            msg = "Guess a number from 1 to 100"
        elif self.guess == self.secret_number:
            msg = "Congrats!"
            self.guess_button.configure(state=DISABLED)
            self.reset_button.configure(state=NORMAL)
        elif self.guess < self.secret_number:
            msg = "Too low! Guess again!"
        else:
            msg = "Too high! Guess again!"

        self.message.set(msg)

    def reset(self):
        self.entry.delete(0, END)
        self.secret_number = random.randint(1, 100)
        self.guess = None
        self.guess_number = 0
        self.message.set("Guess a number from 1 to 100")
        self.guess_button.configure(state=NORMAL)
        self.reset_button.configure(state=DISABLED)


def client():
    root = Tk()
    GuessingGame(root)
    root.mainloop()


if __name__ == "__main__":
    client()
