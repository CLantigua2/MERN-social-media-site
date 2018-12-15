const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		res: 'users'
	},
	text: {
		type: String,
		required: true
	},
	// name and avatar populated so that if a user deletes an account,
	// their posts will still be there
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	// link users to likes by thier user id
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				refs: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			data: {
				type: Date,
				default: Date.now
			}
		}
	],
	data: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);
