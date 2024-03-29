const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground_sub', {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors : [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
 }); 
  
  const result = await course.save();
  console.log(result);
}


async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

createCourse('Node Course', [
    new Author({ name: 'sai' }),
    new Author({ name: 'krishna' }),
]);
