import sys
import data

from data import insert_data
import sqlite3

from PySide6.QtCore import Qt
from PySide6.QtGui import QPixmap
from PySide6.QtWidgets import (
    QApplication,
    QWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QHBoxLayout,
    QFileDialog
)

class TaskInputGUI(QWidget):
    def __init__(self, db):
        super().__init__()
        self.db = db
        # Set window title and size
        self.setWindowTitle("Task Input Form")
        self.setFixedSize(400, 800)

        # Create labels and input fields
        self.question_label = QLabel("Question:")
        self.question_entry = QLineEdit()
        self.answer_label = QLabel("Answer")
        self.answer_entry1 = QLineEdit()
        self.answer_entry2 = QLineEdit()
        self.answer_entry3 = QLineEdit()
        self.answer_entry4 = QLineEdit()
        self.difficulty_label = QLabel("Difficulty:")
        self.difficulty_entry = QLineEdit()
        self.topic_label = QLabel("Topic:")
        self.topic_entry = QLineEdit()
        self.tags_label = QLabel("Tags:")
        self.tags_entry = QLineEdit()
        self.source_label = QLabel("Source:")
        self.source_entry = QLineEdit()
        self.image_label = QLabel("Image:")
        self.image_path = None
        self.image_file_label = QLabel("No image selected")
        self.image_file_button = QPushButton("Select Image")
        self.image_file_button.clicked.connect(self.select_image)

        # Create submit button
        self.submit_button = QPushButton("Submit")
        self.submit_button.clicked.connect(self.submit)

        # Create layout and add widgets
        layout = QVBoxLayout()
        layout.addWidget(self.question_label)
        layout.addWidget(self.question_entry)
        layout.addWidget(self.answer_label)
        layout.addWidget(self.answer_entry1)
        layout.addWidget(self.answer_entry2)
        layout.addWidget(self.answer_entry3)
        layout.addWidget(self.answer_entry4)
        layout.addWidget(self.difficulty_label)
        layout.addWidget(self.difficulty_entry)
        layout.addWidget(self.topic_label)
        layout.addWidget(self.topic_entry)
        layout.addWidget(self.tags_label)
        layout.addWidget(self.tags_entry)
        layout.addWidget(self.source_label)
        layout.addWidget(self.source_entry)
        layout.addWidget(self.image_label)
        layout.addWidget(self.image_file_label)
        layout.addWidget(self.image_file_button)

        button_layout = QHBoxLayout()
        button_layout.addStretch()
        button_layout.addWidget(self.submit_button)
        button_layout.addStretch()

        layout.addLayout(button_layout)

        self.setLayout(layout)

    def select_image(self):
        # Open file dialog to select image file
        file_dialog = QFileDialog()
        file_dialog.setNameFilter("Images (*.png *.jpg)")
        file_dialog.setFileMode(QFileDialog.ExistingFile)
        if file_dialog.exec_():
            self.image_path = file_dialog.selectedFiles()[0]
            self.image_file_label.setText(self.image_path)
            pixmap = QPixmap(self.image_path)
            self.image_file_label.setPixmap(pixmap.scaled(200, 200, Qt.KeepAspectRatio))

    def submit(self):
        # Get values from input fields
        question = self.question_entry.text()
        answer1= self. answer_entry1.text()
        answer2= self. answer_entry2.text()
        answer3= self. answer_entry3.text()
        answer4= self. answer_entry4.text()
        difficulty = self.difficulty_entry.text()
        topic = self.topic_entry.text()
        tags = self.tags_entry.text()
        source = self.source_entry.text()


        # Create task object with values
        task = {
            "question": question,
            "answers": [answer1,answer2,answer3,answer4],
            "difficulty": difficulty,
            "topic": topic,
            "tags": tags,
            "source": source,
            "image_path": self.image_path
        }

        # Print task object for debugging
        print(task)

        insert_data("questions",task, self.db)

        # Reset input fields
        self.question_entry.setText("")
        self.answer_entry1.setText('')
        self.answer_entry2.setText('')
        self.answer_entry3.setText('')
        self.answer_entry4.setText('')
        self.difficulty_entry.setText("")
        self.topic_entry.setText("")
        self.tags_entry.setText("")
        self.source_entry.setText("")
        self.image_path = None
        self.image_file_label.setText("No image selected")
        self.image_file_label.setPixmap(QPixmap())

if __name__ == "__main__":
    app = QApplication(sys.argv)
    db = sqlite3.connect("quiz.db")
    
    task_input = TaskInputGUI(db)
    task_input.show()
    sys.exit(app.exec())
    