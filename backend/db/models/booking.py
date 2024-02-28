class Booking:
    def __init__(self, tutorId, studentId, subject, grade, startTime, endTime, status):
        self.tutorId = tutorId
        self.studentId = studentId
        self.subject = subject
        self.grade = grade
        self.startTime = startTime
        self.endTime = endTime
        self.status = status
    
    def __repr__(self):
        return f'Booking({self.tutorId}, {self.studentId}, {self.subject}, {self.grade}, {self.startTime}, {self.endTime}, {self.status})'

    def __eq__(self, other):
        return self.__dict__ == other.__dict__
