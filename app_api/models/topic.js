var mongoose = require('mongoose')
var TopicSchema = require('../schemas/topic')
// var Topic = mongoose.model('Topic',TopicSchema);
var Topic;
// var Book = mongoose.model('Book',BookSchema)
if (mongoose.models.Topic) {
  Topic = mongoose.model('Topic');
} else {
  Topic = mongoose.model('Topic', TopicSchema);
}
module.exports = Topic;