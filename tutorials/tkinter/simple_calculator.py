from tkinter import Tk, Label, Button, Entry, StringVar, END, W, E, S, N

class SimpleCalculator:
	def __init__(self, application):
		self.application = application
		self.application.title("Simple Calculator")

		self.total = 0
		self.entered_number = 0
		
		# Total label
		self.total_label_text = StringVar()
		self.total_label_text.set(f"Total: {self.total}")
		self.total_label = Label(self.application, textvariable=self.total_label_text)

		# Input
		vcmd = self.application.register(self.validate)
		self.entry = Entry(self.application, validate="key", validatecommand=(vcmd, '%P'))

		# Button
		self.add_button = Button(self.application, text="+", command=lambda: self.update("add"))
		self.subtract_button = Button(self.application, text="-", command=lambda: self.update("subtract"))
		self.reset_button = Button(self.application, text="Reset", command=lambda: self.update("reset"))

		# Layout
		self.entry.grid(columnspan=2, row=0, sticky='nesw')
		self.total_label.grid(row=0, column=2, sticky='nesw')
		self.add_button.grid(row=1, column=0, sticky='nesw')
		self.subtract_button.grid(row=1, column=1, sticky='nesw')
		self.reset_button.grid(row=1, column=2, sticky='nesw')

	def validate(self, new_text):
		if not new_text:
			self.entered_number = 0
			return True

		try:
			self.entered_number = int(new_text)
			return True
		except ValueError:
			self.enterted_number = 0
			return False

	def update(self, method):
		if method == "add":
			self.total += self.entered_number
		elif method == "subtract":
			self.total -= self.entered_number
		else:
			self.total = 0

		self.total_label_text.set(f"Total: {self.total}")
		self.entry.delete(0, END)

def client():
	application = Tk()
	simple_calculator = SimpleCalculator(application)
	application.mainloop()


if __name__ == "__main__":
	client()