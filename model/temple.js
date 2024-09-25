
module.exports = (mongoose) => {
    const TempleSchema = new mongoose.Schema({
      _id: {
        type: mongoose.Schema.Types.ObjectId
      },
      temple_id: {
        type: Number,
        required: false
      },
      additionalInfo: {
        type: Boolean,
        required: false
      },
      name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      dedicated: {
        type: String,
        required: true
      }
    });
  
    return mongoose.model('Temple', TempleSchema);
  };
  
