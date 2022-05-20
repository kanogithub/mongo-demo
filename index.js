const mongoose = require('mongoose')
// const MONGODB = 'mongodb://localhost/playground'
const MONGODB = 'mongodb://localhost:27017/mongo-exercises'

// Mongoose Connection
mongoose
	.connect(MONGODB)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('Could not connect to MongoDB'))

// Mongoose Schema
const courseSchema = new mongoose.Schema({
	_id: String,
	name: String,
	author: String,
	tags: [String],
	data: { type: Date, default: Date.now },
	isPublished: Boolean,
})

// Compile to Model
const Course = mongoose.model('Course', courseSchema)

// instance and init then save
async function creatCourse() {
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		tags: ['Angular', 'frontend'],
		isPublished: true,
	})
	const result = await course.save()
	// console.log(result)
}

// Query
async function getCourse() {
	const courses = await Course.find({ author: 'Mosh', isPublished: true })
		.limit(10)
		.sort({ name: 1 })
		// select - pick column
		.select({ name: 1, tags: 1 })
}

// Query - Comparison Operators
async function getCompCourses() {
	// eq (equal)
	// ne (not equal)
	// gt (greater than)
	// gte (greater than or equal to)
	// lt (less than)
	// lte (less than or equal to)
	// in
	// nin (not in)

	const coursesBetween = await Course.find({ price: { $gte: 10, $lte: 20 } })
		.limit(10)
		.sort({ name: 1 })

	const courseInTreeValue = await Course.find({ price: { $in: [10, 15, 20] } })
}

// Query - Logical Operators
async function getLogicalCourses() {
	// or
	// and

	const courses = await Course.find()
		.and([{ author: 'Mosh' }, { isPublished: true }])
		.limit(10)
		.sort({ name: 1 })
}

// Query - with Regular Expressions
async function getRexCourses() {
	const course = await Course.find()
		// Starts with Ka
		.find({ author: /^Ka/ })

		// Ends with Mosh
		.find({ author: /Mosh$/i })

		// Contains Mosh
		.find({ author: /.*Mosh.*/i })

		.limit(10)
		.sort({ name: 1 })
}

// Query - Counting
async function getCountCourses() {
	const course = await Course.find({ author: 'Mosh' }).count()
}

// Query - Pagination
async function getPagedCourses() {
	const pageNumber = 2
	const pageSize = 2

	const course = await Course.find({ author: 'Mosh' })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)

	console.log(course)
}

// Update
async function updateCourse1(id) {
	// Approach: Query first
	// findById()
	// Modify its properties
	// save()

	const course = await Course.findById(id)
	// can not find Id, just because mongoose save _id as String
	if (!course) return

	course.isPublished = true
	course.author = 'Another Author'

	// Alternative:
	// course.set({
	// 	isPublished: true,
	// 	author: 'Another Author',
	// })

	// save() function return the changed doc
	const result = await course.save()
	console.log(result)
}

async function updateCourse2(id) {
	// Approach: Update first
	// Update directly
	// Optionally: get the updated document

	const result = await Course.update(
		{ _id: id },
		{
			$set: {
				author: 'Mosh',
				isPublished: false,
			},
		}
	)

	// return in default is the oringal doc
	console.log(result)
}

async function updateCourse3(id) {
	// Approach: Update first
	// Update directly
	// Optionally: get the updated document

	const result = await Course.findByIdAndUpdate(
		id,
		{
			$set: {
				author: 'Jack',
				isPublished: false,
			},
		},
		// change the return to be changed doc
		{
			new: true,
		}
	)

	console.log(result)
}

// updateCourse3('5a68fdf95db93f6477053ddd')

// Delete
async function removeCourse(id) {
	// Approach: Update first
	// Update directly
	// Optionally: get the updated document

	// const result = await Course.deleteOne({ _id: id })
	// const result = await Course.deleteMany({ _id: id })
	const result = await Course.findByIdAndRemove(id)

	console.log(result)
}

removeCourse('5a6900fff467be65019a9001')
