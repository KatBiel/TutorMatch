class Availability:
    def __init__(self, start_time, end_time, available):
        self.start_time = start_time
        self.end_time = end_time
        self.available = available

    def __repr__(self):
        return f'Availability({self.start_time}, {self.end_time}, {self.available})'

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

class User:
    def __init__(self, name, email, status, availability=None):
        self.name = name
        self.email = email
        self.status = status
        self.availability = availability

    def __repr__(self):
        return f'User({self.name}, {self.email}, {self.status}, {self.availability})'

    def __eq__(self, other):
        return self.__dict__ == other.__dict__