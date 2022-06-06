const mongoose = require('mongoose')
const MONGODB = 'mongodb://localhost:27017/mongo-exercises'

// Mongoose Connection
mongoose
	.connect(MONGODB)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('Could not connect to MongoDB'))

// Mongoose Schema with Custom Validation
const courseSchema = new mongoose.Schema({
	_id: String,
	name: String,
	author: String,
	tags: {
		type: Array,
		// custom validator
		validate: {
			validator: function (v) {
				return v && v.length > 0
			},
			message: 'A course should have at least one tag.',
		},
	},
	data: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: Number,
})

// Compile to Model
const Course = mongoose.model('Course', courseSchema)

// instance and init then save
async function creatCourse() {
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		tags: null,
		isPublished: true,
	})

	try {
		await course.validate()
		// const result = await course.save()
		// console.log(result)
	} catch (err) {
		console.log(err.message)
	}
}

creatCourse()
