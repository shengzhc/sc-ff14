from tkinter import Tk, Label, Button, W, StringVar


class MyFirstGUI:
    LABEL_TEXT = [
        "This is our first GUI!",
        "Actually, this is our second GUI.",
        "We made it more interesting...",
        "...by making this label interactive.",
        "Go on, click on it again.",
    ]

    def __init__(self, master):
        self.master = master
        self.master.title('A simple GUI')

        self.label_index = 0
        self.label_text = StringVar()
        self.label_text.set(self.LABEL_TEXT[self.label_index])
        self.label = Label(master, textvariable=self.label_text)
        self.label.bind("<Button-1>", self.cycle_label_text)
        self.label.grid(columnspan=2, sticky=W)

        self.greet_btn = Button(master, text='Greet', command=self.greet)
        self.greet_btn.grid(row=1)

        self.close_btn = Button(master, text='Close', command=master.quit)
        self.close_btn.grid(row=1, column=1)

    def greet(self):
        print('Greetings!')

    def cycle_label_text(self, event):
        self.label_index += 1
        self.label_index %= len(self.LABEL_TEXT)
        self.label_text.set(self.LABEL_TEXT[self.label_index])


root = Tk()
my_gui = MyFirstGUI(root)
root.mainloop()
