
class Subject:
    def __init__(self, name, gcse, alevel):
        self.name = name   
        self.gcse = gcse
        self.alevel = alevel
    
    def __repr__(self):
        return f'Subject({self.name}, {self.gcse}, {self.alevel})'

    def __eq__(self, other):
        return self.__dict__ == other.__dict__