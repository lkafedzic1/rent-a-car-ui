export const TOKEN = 'TOKEN';

export const CARS = [
  {
    id: 1,
    name: 'Toyota Corolla',
    passengerCount: 4,
    fuelType: 'Petrol',
    price: 150.0,
    transmissionType: 'Automatic',
    imageUrl: 'https://i.imgur.com/ftN1n8C.jpeg',
  },
  {
    id: 2,
    name: 'Toyota Urban Cruiser',
    passengerCount: 5,
    fuelType: 'Desiel',
    price: 100.0,
    transmissionType: 'Manual',
    imageUrl: 'https://i.imgur.com/Ln697Gw.jpg',
  },
  {
    id: 3,
    name: 'Toyota Land Cruiser',
    passengerCount: 6,
    fuelType: 'Petrol',
    price: 170.0,
    transmissionType: 'Automatic',
    imageUrl: 'https://i.imgur.com/mdYTEqi.jpg',
  },
  {
    id: 4,
    name: 'Toyota Quantum',
    passengerCount: 4,
    fuelType: 'Petrol',
    price: 250.0,
    transmissionType: 'Automatic',
    imageUrl: 'https://i.imgur.com/Hrk1v4u.jpg',
  },
  {
    id: 5,
    name: 'Lexus NX',
    passengerCount: 5,
    fuelType: 'Petrol',
    price: 300.0,
    transmissionType: 'Automatic',
    imageUrl: 'https://i.imgur.com/huBXAIR.jpg',
  },
  {
    id: 6,
    name: 'Lexus LN',
    passengerCount: 4,
    fuelType: 'Petrol',
    price: 180.0,
    transmissionType: 'Automatic',
    imageUrl: 'https://i.imgur.com/qFGCxg6.jpg',
  }
];
export const RESERVATIONS = [
  {
    id: 1,
    userId: 1,
    carId: 4,
    price: 150.0,
    address: {
      street: 'Freedom street',
      country: 'USA',
      city: 'New York'
    },
    toDate: '2022-05-28',
    fromDate: '2022-05-28'
  },
  {
    id: 2,
    userId: 3,
    carId: 3,
    price: 150.0,
    address: {
      street: 'Freedom street',
      country: 'USA',
      city: 'New York'
    },
    toDate: '2022-06-28',
    fromDate: '2022-06-28'
  },
  {
    id: 3,
    userId: 4,
    carId: 2,
    price: 150.0,
    address: {
      street: 'Freedom street',
      country: 'USA',
      city: 'New York'
    },
    toDate: '2022-07-28',
    fromDate: '2022-07-28'
  },
  {
    id: 4,
    userId: 3,
    carId: 1,
    price: 150.0,
    address: {
      street: 'Freedom street',
      country: 'USA',
      city: 'New York'
    },
    toDate: '2022-08-28',
    fromDate: '2022-08-28'
  }
];
export const USERS = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'testmaildev10@gmail.com@gmail.com',
    phone: '07165977456',
    role: {
      name: 'USER'
    },
    address: {
      street: 'Freedom street',
      country: 'USA',
      city: 'New York'
    }
  },
  {
    id: 2,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@gmail.com@gmail.com',
    phone: '07165977456',
    role: {
      name: 'ADMIN'
    },
    address: {
      street: 'West street',
      country: 'South Africa',
      city: 'Durban'
    }
  },
  {
    id: 3,
    firstName: 'Junior',
    lastName: 'Kanye',
    email: 'admin@gmail.com@gmail.com',
    phone: '07165977456',
    role: {
      name: 'USER'
    },
    address: {
      street: 'West street',
      country: 'South Africa',
      city: 'Durban'
    }
  },
  {
    id: 4,
    firstName: 'Allen',
    lastName: 'Grey',
    email: 'admin@gmail.com@gmail.com',
    phone: '07165977456',
    role: {
      name: 'USER'
    },
    address: {
      street: 'West street',
      country: 'South Africa',
      city: 'Durban'
    }
  }
];
