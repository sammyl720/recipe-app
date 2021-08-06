import mongoose from 'mongoose';

export const connection = mongoose.connection;
console.log('db connection:', connection.models);
export default mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});