from tkinter import Tk, Label, Button


class MyFirstGUI:
	def __init__(self, master):
		self.master = master
		self.master.title('A simple GUI')

		self.label = Label(master, text='This is our first GUI!')
		self.label.pack()

		self.greet_btn = Button(master, text='Greet', command=self.greet)
		self.greet_btn.pack()

		self.close_btn = Button(master, text='Close', command=master.quit)
		self.close_btn.pack()

	def greet(self):
		print('Greetings!')

root = Tk()
my_gui = MyFirstGUI(root)
root.mainloop()