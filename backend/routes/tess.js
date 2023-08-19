const schema = new mongoose.Schema({ name: 'string', size: 'string' });

const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
small.save(function(err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tank.create({ size: 'small' }, function(err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

});
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);

Tank.deleteOne({ size: 'large' }, function(err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });

  Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
    // Updated at most one doc, `res.nModified` contains the number
    // of docs that MongoDB updated
  });

  async function run() {
    // Create a new mongoose model
    const personSchema = new mongoose.Schema({
      name: String
    });
    const Person = mongoose.model('Person', personSchema);
  
    // Create a change stream. The 'change' event gets emitted when there's a
    // change in the database
    Person.watch().
      on('change', data => console.log(new Date(), data));
  
    // Insert a doc, will trigger the change stream handler above
    console.log(new Date(), 'Inserting doc');
    await Person.create({ name: 'Axl Rose' });
  }

  // because you want to create the collection manually.
const userSchema = new Schema({
    name: String,
    email: String,
    roles: [String]
  }, { autoCreate: false, autoIndex: false });
  const User = mongoose.model('User', userSchema);
  
  const RedactedUser = mongoose.model('RedactedUser', userSchema);
  
  // First, create the User model's underlying collection...
  await User.createCollection();
  // Then create the `RedactedUser` model's underlying collection
  // as a View.
  await RedactedUser.createCollection({
    viewOn: 'users', // Set `viewOn` to the collection name, **not** model name.
    pipeline: [
      {
        $set: {
          name: { $concat: [{ $substr: ['$name', 0, 3] }, '...'] },
          email: { $concat: [{ $substr: ['$email', 0, 3] }, '...'] }
        }
      }
    ]
  });
  
  await User.create([
    { name: 'John Smith', email: 'john.smith@gmail.com', roles: ['user'] },
    { name: 'Bill James', email: 'bill@acme.co', roles: ['user', 'admin'] }
  ]);
  
  // [{ _id: ..., name: 'Bil...', email: 'bil...', roles: ['user', 'admin'] }]
  console.log(await RedactedUser.find({ roles: 'admin' }));