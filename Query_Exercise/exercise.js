const mongoose = require('mongoose')
mongoose
	.connect('mongodb://localhost/mongo-exercises')
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('Could not connect to MongoDB'))

const courseSchema = new mongoose.Schema({
	author: String,
	name: String,
	price: Number,
	tags: Array,
	date: String,
	isPublished: Boolean,
})

const Course = mongoose.model('Course', courseSchema)

const mPrint = (results) => {
	const _results = results.map((result, index) => ({ index: index + 1, ...result._doc }))
	console.log(_results)
}

async function exersice1() {
	return await Course.find({ isPublished: true, tags: 'backend' })
		.sort({ name: 1 })
		.select({ name: 1, author: 1 })
}

async function exersice2_1() {
	return await Course.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
		.sort({ price: -1 })
		.select({ name: 1, author: 1 })
}

async function exersice2_2() {
	return await Course.find({ isPublished: true })
		.or([{ tags: 'backend' }, { tags: 'frontend' }])
		.sort({ price: -1 })
		.select({ name: 1, author: 1 })
}

async function exersice3() {
	return await Course.find({ isPublished: true })
		.or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
		.select('name author price isPublished')
}

exersice3().then((result) => mPrint(result))
