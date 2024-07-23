
module.exports = (mongoose) => {
    const user = mongoose.model(
      'users',
      mongoose.Schema(
        {
          _id: mongoose.Schema.Types.ObjectId,
          firstName: String,
          lastName: String,
          email: String,
          favouriteColor: String,
          birthday: String
         
        },
        { timestamps: true }
      )
    );
  
    return user;
  };
  




















