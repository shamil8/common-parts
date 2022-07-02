import MongooseCon from './mongo';

const mongoLink = 'mongodb://localhost:27017/infam_dev';

async function mongoInit() {
  try {
    const mongo = new MongooseCon(mongoLink);
    await mongo.init();
  }
  catch (e) {
    console.error('Error, Mongo connection init', e);
  }
}

mongoInit();
