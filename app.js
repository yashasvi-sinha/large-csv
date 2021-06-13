const fs = require('fs')
const csv = require('csv-parser')

const MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://expressApp:HLfeDmyqBzV1y2lE@cluster0.69m9q.mongodb.net/large-csv?retryWrites=true&w=majority";

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {


    const csvStream = fs.createReadStream('titanic.csv')

    let rows = []
    csvStream.pipe(csv())
        .on('data', (row) => {

            // if (rows.length === 500) {
                
            //     csvStream.pause()

            //     // console.log(row)
            //     const collection = client.db().collection('csv-collection')
        
            //     collection.insertMany(rows, (err, insertResult) => {

            //         console.log(insertResult.insertedIds)

            //         // client.close()

            //         rows = []

            //         csvStream.resume()
            //     })
            // }else{
            //     rows.push(row)
            // }

            rows.push(row)


        })
        .on('end', () => {
            console.log('Finished')

            // console.log(row)
            const collection = client.db().collection('csv-collection')
    
            collection.insertMany(rows, (err, insertResult) => {

                console.log(insertResult.insertedIds)

                // client.close()
            })
        })
    
})