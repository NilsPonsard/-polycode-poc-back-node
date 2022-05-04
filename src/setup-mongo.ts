import { MongooseModule } from '@nestjs/mongoose';

export function GetMongoModule() {
  const uri = process.env.MONGO_URI;

  return MongooseModule.forRoot(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}
