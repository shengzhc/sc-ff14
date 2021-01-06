from tkinter import Tk, Label, Button, W


class MyFirstGUI:
	def __init__(self, master):
		self.master = master
		self.master.title('A simple GUI')

		self.label = Label(master, text='This is our first GUI!  - A long long long long text')
		self.label.grid(columnspan=2, sticky=W)

		self.greet_btn = Button(master, text='Greet', command=self.greet)
		self.greet_btn.grid(row=1)

		self.close_btn = Button(master, text='Close', command=master.quit)
		self.close_btn.grid(row=1, column=1)

	def greet(self):
		print('Greetings!')

root = Tk()
my_gui = MyFirstGUI(root)
root.mainloop()