import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { BrandMongo } from '/imports/api/brand';
import { ProductMongo } from '../imports/api/product';
import { SalesMongo } from '../imports/api/sales';

const insertBrand = (brandText) =>
  BrandMongo.insert({
    name: brandText,
    createdAt : new Date()
  });

const insertProduct = (product) => ProductMongo.insert(product);

const insertSales = (sale) => SalesMongo.insert(sale);

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }


  if (BrandMongo.find({}).count() === 0) {
    [
      'Coca Cola',
      'NewsPaper',
      'Snacks',
      'Pepsi'
    ].forEach(brandText => insertBrand(brandText));
  }

  if (ProductMongo.find({}).count() === 0) {
    [
      {
        brand: 'Coca Cola',
        name:'Coca Cola 1.5L',
        stock: 30,
        price: 5
      },
      {
        brand: 'Pepsi',
        name:'Pepsi 1L',
        stock: 50,
        price: 4
      },
      {
        name: '13/04/2022',
        brand:'NewsPaper',
        stock: 15,
        price: 2
      },
      {
        brand: 'Snacks',
        name:'Snacks L',
        stock: 16,
        price: 3
      }
    ].forEach(product => insertProduct(product));
  }

  if (SalesMongo.find({}).count() === 0) {
    insertSales({
      products:'[{"name":"Pepsi","count":"3","price":6}]',
      total:6,
      createdAt: new Date()
    });
  }

});