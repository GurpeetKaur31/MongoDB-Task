const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

// Define Schema for Academic Records
const academicRecordSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    grades: [String], 
    subjects: [String],
});

// Define Schema for Co-curricular Activities
const coCurricularSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    activityType: String,
    duration: Number, 
    achievements: [String],
});

// Define Models for Academic Records and Co-curricular Activities
const AcademicRecord = mongoose.model('AcademicRecord', academicRecordSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularSchema);

// Sample Data for Academic Records
const academicRecordsData = [
    {
        studentID: 'S001',
        name: 'John Doe',
        grades: ['A', 'B', 'C'],
        subjects: ['Math', 'Science', 'History']
    },
];

// Sample Data for Co-curricular Activities
const coCurricularData = [
    {
        studentID: 'S001',
        name: 'John Doe',
        activityType: 'Sports',
        duration: 50,
        achievements: ['Won inter-school football tournament']
    },
];

// Function to insert sample data into the database
async function insertSampleData() {
    try {
        await AcademicRecord.insertMany(academicRecordsData);
        await CoCurricularActivity.insertMany(coCurricularData);
        console.log('Sample data inserted successfully');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
}
insertSampleData();

// Creating a new academic record
const newAcademicRecord = new AcademicRecord({
    studentID: 'S002',
    name: 'Jane Smith',
    grades: ['A', 'A-', 'B+'],
    subjects: ['Math', 'Biology', 'Literature']
});

newAcademicRecord.save()
    .then(() => console.log('New academic record created successfully'))
    .catch((error) => console.error('Error creating new academic record:', error));

// Creating a new co-curricular activity
const newCoCurricularActivity = new CoCurricularActivity({
    studentID: 'S002',
    name: 'Jane Smith',
    activityType: 'Music',
    duration: 30,
    achievements: ['Performed in school orchestra']
});

newCoCurricularActivity.save()
    .then(() => console.log('New co-curricular activity created successfully'))
    .catch((error) => console.error('Error creating new co-curricular activity:', error));


// Reading academic records
AcademicRecord.find()
.then(records => console.log('Academic records:', records))
.catch(error => console.error('Error fetching academic records:', error));

// Reading co-curricular activities
CoCurricularActivity.find()
.then(activities => console.log('Co-curricular activities:', activities))
.catch(error => console.error('Error fetching co-curricular activities:', error));


// Updating an academic record
AcademicRecord.findOneAndUpdate({ studentID: 'S002' }, { $set: { name: 'Jane Doe' }}, { new: true })
    .then(updatedRecord => console.log('Updated academic record:', updatedRecord))
    .catch(error => console.error('Error updating academic record:', error));

// Updating a co-curricular activity
CoCurricularActivity.findOneAndUpdate({ studentID: 'S002' }, { $push: { achievements: 'Won music competition' }}, { new: true })
    .then(updatedActivity => console.log('Updated co-curricular activity:', updatedActivity))
    .catch(error => console.error('Error updating co-curricular activity:', error));


// Deleting an academic record
AcademicRecord.deleteOne({ studentID: 'S002' })
.then(() => console.log('Academic record deleted successfully'))
.catch(error => console.error('Error deleting academic record:', error));

// Deleting a co-curricular activity
CoCurricularActivity.deleteOne({ studentID: 'S002', activityType: 'Music' })
.then(() => console.log('Co-curricular activity deleted successfully'))
.catch(error => console.error('Error deleting co-curricular activity:', error));
