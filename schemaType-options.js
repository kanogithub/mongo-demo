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
	},
	category: {
		type: String,
		required: true,
		enum: ['web', 'mobile', 'network'],
		/** SchemaType Options String */
		lowercase: true,
		// uppsercase: true,
		trim: true,
	},
	author: String,
	tags: [String],
	data: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isPublished
		},
		min: 10,
		max: 200,
		/** SchemaType Options Number */
		// get: (v) => Math.round(v),
		// set: (v) => Math.round(v),
	},
})

/** SchemaType Options Array & Primitive Type */
// primitive
courseSchema.path('price').get((v) => Math.round(v + 1))
// array
courseSchema.path('tags.0').set((v) => `t: ${v}`)

// Compile to Model
const Course = mongoose.model('Course', courseSchema)

// instance and init then save
async function creatCourse() {
	const course = new Course({
		name: 'Angular Course',
		author: 'Mosh',
		category: 'Web',
		tags: ['Angular', 'frontend'],
		isPublished: true,
		price: 60.5,
	})

	try {
		const test = await course.validate()
		console.log(course._doc)
	} catch (err) {
		for (field in err.errors) console.log(err.errors[field].message)
	}
}

async function getCourseBy(id) {
	const course = await Course.findById(id)
		.limit(10)
		.sort({ name: 1 })
		.select({ price: 1, tags: 1 })
	console.log(course._doc)
}

creatCourse()
// getCourseBy('5a68ff090c553064a218a547')
