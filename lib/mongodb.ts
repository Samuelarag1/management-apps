import { MongoClient } from "mongodb";

let client;
let clientPromise;

// URL de conexión, usa tu propia cadena de conexión de MongoDB Atlas
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Por favor, define la variable de entorno MONGODB_URI");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Para desarrollo, usa un cliente global para evitar múltiples conexiones
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Para producción, crea un cliente único
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
