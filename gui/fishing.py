from tkinter import Tk


class FishingWindow:
    def __init__(self, master):
        self.master = master
        self.master.title("Fishing Tracker")


def client():
    root = Tk()
    FishingWindow(root)
    root.mainloop()


if __name__ == "__main__":
    client()
