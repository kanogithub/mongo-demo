const mongoose = require('mongoose')
const MONGODB = 'mongodb://localhost:27017/mongo-exercises'

// Mongoose Connection
mongoose
	.connect(MONGODB)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('Could not connect to MongoDB'))

// Mongoose Schema with Validation
const courseSchema = new mongoose.Schema({
	_id: String,
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		// match: /pattern/
	},
	category: {
		type: String,
		required: true,
		// enum
		enum: ['web', 'mobile', 'network'],
	},
	author: String,
	tags: [String],
	data: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		// required with conditions
		type: Number,
		required: function () {
			return this.isPublished
		},
	},
})

// Compile to Model
const Course = mongoose.model('Course', courseSchema)

// instance and init then save
async function creatCourse() {
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		category: 'new',
		tags: ['Angular', 'frontend'],
		isPublished: true,
	})

	try {
		await course.validate()
	} catch (err) {
		// for (field in err.errors) console.log(err.errors[field])
		for (field in err.errors) console.log(err.errors[field].message)
	}
}

creatCourse()
