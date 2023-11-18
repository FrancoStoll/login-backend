import mongoose from 'mongoose'



const conn = async () => {


    try {
        
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log("mongodb connect to ", url)

    } catch (error) {
        console.log(error)
    }
}

export default conn